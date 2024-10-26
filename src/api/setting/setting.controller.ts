import type { Setting } from '@prisma/client';
import type { Request, Response } from 'express';
import * as settingService from './setting.service';

export async function getSettingByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  try {
    const settingId = BigInt(id);

    if (Number.isNaN(settingId)) {
      res.status(400).json({ message: 'Invalid setting ID' });
      return;
    }

    const setting = await settingService.getSettingById(settingId);

    if (!setting) {
      res.status(404).json({ message: 'Setting not found' });
      return;
    }

    res.json({ data: setting });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the setting' });
  }
}

export async function updateSettingByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const settingData = req.body as Partial<Setting>;

  try {
    const settingId = BigInt(id);

    if (Number.isNaN(settingId)) {
      res.status(400).json({ message: 'Invalid setting ID' });
      return;
    }

    const updatedSetting = await settingService.updateSettingById(
      settingId,
      settingData,
    );

    if (!updatedSetting) {
      res.status(404).json({ message: 'Setting not found' });
      return;
    }

    res.json({ data: updatedSetting });
  } catch (error) {
    console.error('Error updating setting:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the setting' });
  }
}
