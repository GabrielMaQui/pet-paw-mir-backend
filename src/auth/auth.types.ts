import type { Request } from 'express';

import type { User } from '../api/user/user.type';

export type PayloadType = {
  id: string;
  email: string;
  name?: number;
};

export interface AuthRequest extends Request {
  user?: User;
}