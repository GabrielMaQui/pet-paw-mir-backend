import type { Response, NextFunction } from 'express';
import { compose } from 'compose-middleware';

import { getUserByEmail } from '../api/user/user.service';
import { verifyToken } from './auth.service';
import { AuthRequest, PayloadType } from './auth.types';
import { User } from '../api/user/user.type';


export function isAuthenticated() {
  return compose([
    async (req: AuthRequest, res: Response, next: any) => {
      const token = req.headers?.authorization?.split(' ')[1];
    
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = verifyToken(token) as PayloadType;

      if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await getUserByEmail(decoded.email);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;

      return next();
    },
  ]);
}


export function hasRole(allowRoles: string[]) {
  return compose([
    isAuthenticated(),
    (req: AuthRequest, res: Response, next: any) => {
      const { role } = req.user as User;
      const hasPermission = allowRoles.includes(role);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return next();
    },
  ]);
}
