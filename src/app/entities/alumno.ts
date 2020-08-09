export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  dni: number;
  password?: string;
  email: string;
  mobile: string;
  phone: string;
  picture?: string;
  institucion?: string;
}
