// Definir tipos personalizados
export type UserRole = 'Usuario' | 'Administrador' | 'Moderador';
export type PreferredLanguage = 'es' | 'en' | 'fr' | 'de'; // Puedes agregar más idiomas
export type UserStatus = 'Habilitado' | 'Deshabilitado' | 'Pendiente' | 'Eliminado';

// Definir el tipo `User`
export type User = {
  id: number;
  nombre: string;
  apellido: string;
  pais: string;
  foto_perfil: string; // URL de la foto de perfil
  direccion: string;
  numero_contacto: string;
  fecha_nacimiento: Date;
  correo_electronico: string;
  contrasena: string;
  role: UserRole; // Role del usuario
  idioma_preferido: PreferredLanguage; // Idioma preferido del usuario
  modo_nocturno: boolean; // Si tiene el modo nocturno activado
  estado: UserStatus; // Estado del usuario
  created_at: Date; // Fecha de creación
  updated_at: Date; // Fecha de última actualización
};
