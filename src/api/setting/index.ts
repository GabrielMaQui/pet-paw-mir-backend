import { Router } from 'express';
import {
  getSettingByIdHandler,
  updateSettingByIdHandler,
} from './setting.controller';

const router = Router();

router.get('/:user_id', getSettingByIdHandler);
router.patch('/:id', updateSettingByIdHandler);

export default router;
