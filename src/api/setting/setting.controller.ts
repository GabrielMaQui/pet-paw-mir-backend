import type { Setting } from '@prisma/client';
import type { Request, Response } from 'express';
import { getSettingById, updateSettingById } from './setting.service';

export async function getSettingByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { user_id } = req.params;

  try {
    const setting = await getSettingById(user_id);
    if (setting) {
      // Convertimos los BigInt a string antes de enviarlos en el JSON
      const settingFormatted = {
        ...setting,
        id: setting.id.toString(),
        created_at: setting.created_at.toISOString(),
        updated_at: setting.updated_at.toISOString(),
      };
      res.json({ data: settingFormatted });
    } else {
      res.status(404).json({ message: 'Setting not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
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

    const updatedSetting = await updateSettingById(settingId, settingData);

    if (!updatedSetting) {
      res.status(404).json({ message: 'Setting not found' });
      return;
    }

    // Convertimos los BigInt a string antes de enviarlos en el JSON
    const formattedSetting = {
      ...updatedSetting,
      id: updatedSetting.id.toString(),
      created_at: updatedSetting.created_at.toISOString(),
      updated_at: updatedSetting.updated_at.toISOString(),
    };

    res.json({ data: formattedSetting });
  } catch (error) {
    console.error('Error updating setting:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the setting' });
  }
}
