import { PrismaClient } from '@prisma/client';
import type { Setting } from './setting.type';

const prisma = new PrismaClient();

export async function getSettingById(user_id: string): Promise<Setting | null> {
  if (!user_id) {
    throw new Error('user_id is required');
  }

  return await prisma.setting.findUnique({
    where: { user_id },
  });
}

export async function updateSettingById(
  id: bigint,
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
      user_id: userId,
      privacidad_cuenta: 'PUBLICO', // Valor por defecto
      cuenta_bloqueada: false, // Valor por defecto
      idioma: 'ES', // Valor por defecto
      apariencia_modo_nocturno: false, // Valor por defecto
    },
  });
}
