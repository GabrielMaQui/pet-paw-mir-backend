import { Router } from 'express';
import { hasRole } from '../../auth/auth.controller';
import {
  getSettingByIdHandler,
  updateSettingByIdHandler,
  updateSettingChangePasswordHandler,
} from './setting.controller';

const router = Router();

router.get('/:user_id', getSettingByIdHandler);
router.patch('/:id', updateSettingByIdHandler);
router.patch(
  '/change/password',
  hasRole(['USER']),
  updateSettingChangePasswordHandler,
);


export default router;
