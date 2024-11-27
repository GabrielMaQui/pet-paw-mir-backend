import { isAfter } from 'date-fns';
import { add } from 'date-fns';
import type { Request, Response } from 'express';
import {
  getUserByEmail,
  getUserByToken,
  updateUser,
} from '../../api/user/user.service';
import {
  sendPasswordResetEmail,
  sendPasswordResetEmailNodeMailer,
} from '../../utils/email.controller';
import { generateRandomToken, hashPassword } from '../utils/crypto';
import { comparePassword } from '../utils/crypto';
import { createAuthResponse } from './local.service';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.isActive) {
      res.status(400).json({
        message: 'User not found or not active',
      });
    } else {
      // Compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          message: 'Email or password is incorrect',
        });
      } else {
        const response = createAuthResponse(user);

        res.json(response);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function activateAccountHandler(req: Request, res: Response) {
  const { token } = req.params;

  const user = await getUserByToken(token);

  if (!user) {
    res.status(400).json({ message: 'Invalid token' });
  } else {
    const currentDate = new Date();
    const tokenExpired = user.tokenExpiresAt as Date;

    if (isAfter(currentDate, tokenExpired)) {
      res.status(400).json({ message: 'Token has expired' });
    } else {
      const data = {
        ...user,
        verificationToken: null,
        tokenExpiresAt: null,
        isActive: true,
      };

      await updateUser(user.id, data);

      const response = createAuthResponse(user);

      res.json(response);
    }
  }
}

export async function recoverPasswordHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({
        message: 'User not found',
      });
      return;
    }
    const verificationToken = generateRandomToken();

    const tokenExpiresAt = add(new Date(), { days: 1 });
    await updateUser(user.id, {
      verificationToken,
      tokenExpiresAt,
    });

    await sendPasswordResetEmailNodeMailer(
      user.email,
      user.name,
      verificationToken,
    );

    res.json({
      message:
        'An email has been sent with instructions to reset your password.',
      token: verificationToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function resetPasswordHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { token } = req.body;
  const { newPassword } = req.body;

  try {
    const user = await getUserByToken(token);

    if (!user) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }

    const currentDate = new Date();
    const tokenExpired = user.tokenExpiresAt as Date;

    if (isAfter(currentDate, tokenExpired)) {
      res.status(400).json({ message: 'Token has expired' });
      return;
    }

    const newPasswordHash = hashPassword(newPassword);
    await updateUser(user.id, {
      password: await newPasswordHash,
      verificationToken: null,
      tokenExpiresAt: null,
    });

    res.json({ message: 'Password has been successfully reset.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const { token } = req.params;

  const user = await getUserByToken(token);

  if (!user) {
    res.status(400).json({ message: 'Invalid token' });
  } else {
    const currentDate = new Date();
    const tokenExpired = user.tokenExpiresAt as Date;

    if (isAfter(currentDate, tokenExpired)) {
      res.status(400).json({ message: 'Token has expired' });
    } else {
      res.json(user);
    }
  }
}
