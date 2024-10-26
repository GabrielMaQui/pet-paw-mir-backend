import { Router } from 'express';
import {
  getSettingByIdHandler,
  updateSettingByIdHandler,
} from './setting.controller';

const router = Router();

router.get('/:id', getSettingByIdHandler);
router.put('/:id', updateSettingByIdHandler);

export default router;
