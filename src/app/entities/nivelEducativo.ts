import {Materia} from "./materia";

export class NivelEducativo
{
	id: number;
	image: string;
	nombre: string;
	subtitulo: string;
	descripcion: string;
	materias?: Materia[];
	constructor()
	{
		this.materias = [];
	}
}
