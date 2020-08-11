export interface Profesor
{
	id: number;
	nombre: string;
	apellido: string;
	usuario: string;
	dni: number;
  email: string;
	materia: string;
  picture?: string;
  institucion: string;
	valor_curso: number;
  calificacion: number;
  descripcion?: string;
  telefonoMovil: string;
  telefonoFijo?: string;
}
