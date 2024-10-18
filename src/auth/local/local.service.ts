import type { User } from '../../api/user/user.type';
import { signToken } from '../auth.service';

export function createAuthResponse(input: User) {
  const payload = {
    id: input.id,
    email: input.email,
  };

  const token = signToken(payload);

  const profile = {
    fullName: `${input.name} ${input.lastName}`,
    avatar: input.avatar,
    role: input.role,
    email: input.email,
  };

  return {
    token,
    profile,
  };
}
