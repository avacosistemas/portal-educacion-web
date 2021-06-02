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
  titulo?: string;

  // Datos Profesor y Alumno
  apellido?: string;
  nombre?: string;
  nombreApellido?: string;
  tipoIdentificacion?: string;
  numeroIdentificacion?: string;
  telefonoMovil?: string;
  telefonoFijo?: string;
  foto?: any[];
  institucion?: string;
  nombreArchivo?: string;

  // Datos Profesor
  calificacion?: number;
  descripcion?: string;

  sistemaExterno: string;
}
