import { Profesor } from "./profesor";

export class Usuario
{
	id: number;
	username: string;
	password?: string;
	logged: boolean;
  bloqueado: boolean;
	tipoCliente: string;
	intentosFallidosLogin?: number;
	accountNoExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  email: string;

  // Datos Profesor y Alumno
  apellido?: string;
  nombre?: string;
  nombreApellido?: string;
  tipoIdentificacion?: string;
  numeroIdentificacion?: string;
  telefonoMovil?: string;
  telefonoFijo?: string;
  foto?: string;
  institucion?: string;
  nombreArchivo?: string;

  // Datos Profesor
  calificacion?: number;
  descripcion?: string;
}
