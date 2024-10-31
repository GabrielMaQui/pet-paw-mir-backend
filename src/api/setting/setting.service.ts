import { PrismaClient } from '@prisma/client';
import type { Setting } from './setting.type';

const prisma = new PrismaClient();

export async function getSettingById(userId: string): Promise<Setting | null> {
  if (!userId) {
    throw new Error('user_id is required');
  }

  return await prisma.setting.findUnique({
    where: { userId },
  });
}

export async function updateSettingById(
  id: number,
  settingData: Partial<Setting>,
): Promise<Setting | null> {
  return prisma.setting.update({
    where: { id },
    data: settingData,
  });
}

export async function createDefaultSettings(userId: string): Promise<Setting> {
  return prisma.setting.create({
    data: {
      userId: userId,
      accountPrivacy: 'PUBLIC',
      accountBlocked: false,
      language: 'ES',
      darkMode: false,
    },
  });
}
