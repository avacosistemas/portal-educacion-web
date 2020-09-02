export class Profesor
{
	id: number;
	nombre: string;
	apellido: string;
  nombreApellido?: string;
  username: string;
  tipoIdentificacion?: string;
  numeroIdentificacion?: string;
	dni?: number;
  email: string;
	materia?: string;
  foto?: string;
  institucion: string;
	valor_curso: number;
  calificacion: number;
  descripcion?: string;
  telefonoMovil: string;
  telefonoFijo?: string;
  titulo?: string;

  constructor() {
    this.tipoIdentificacion = 'DNI';
  }
}
