import type { Request, Response } from 'express';

import { getUserByEmail } from '../../api/user/user.service';
import { comparePassword } from '../utils/crypto';
import { createAuthResponse } from './local.service';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({
        message: 'User not found',
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
