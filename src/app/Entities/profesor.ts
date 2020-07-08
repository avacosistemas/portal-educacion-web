export interface Profesor
{
	id: number;
	nombre: string;
	apellido: string;
	materia: string;
	picture: string;
	valor_curso: number;
	valoracion: number;
	about?: string;
}
