import {Injectable} from '@angular/core';
import {NivelEducativo} from "../entities/nivelEducativo";
import {Observable, of} from 'rxjs';
import {Materia} from "../entities/materia";

@Injectable({
	providedIn: 'root'
})
export class NivelService
{

	_nivelEducativo: NivelEducativo[] = [];
	_materiasNombre: string[] = [];

	constructor()
	{
	}

	public getNiveles(): Observable<NivelEducativo[]>
	{
		if (!this._nivelEducativo || !(this._nivelEducativo.length > 0))
		{
			this._setNiveles();
		}

		return of(this._nivelEducativo);
	}

	public getMaterias(): Observable<string[]>
	{
		if (!(this._materiasNombre.length > 0))
		{
			if (!(this._nivelEducativo.length > 0))
			{
				this._setNiveles();
			}

			this._materiasNombre = [];

			this._nivelEducativo.forEach(nivel =>
			{
				nivel.materias.forEach(mat =>
				{
					if (!(this._materiasNombre.indexOf(mat.nombre) >= 0))
					{
						this._materiasNombre.push(mat.nombre)
					}
				});
			});
		}

		return of(this._materiasNombre);

	}


	private _setNiveles()
	{
		this._nivelEducativo = [
			{
				id: 1,
				image: '/assets/images/niveles/primaria-primer-ciclo.jpg',
				nombre: 'Educación Primaria',
				subtitulo: 'Primer Ciclo',
				descripcion: 'Acompañamos a tu hijo en sus primeros pasos de primaria.',
				materias: [
					{nombre: 'Castellano'},
					{nombre: 'Matemática'},
					{nombre: 'Ciencias Sociales'},
					{nombre: 'Ciencias Naturales'},
					{nombre: 'Educación Física'},
				]
			},
			{
				id: 2,
				image: '/assets/images/niveles/primaria-segundo-ciclo.jpg',
				nombre: 'Educación Primaria',
				subtitulo: 'Segundo Ciclo',
				descripcion: 'Cada vez más conocimientos iniciales con un temario extendido',
				materias: [
					{nombre: 'Castellano'},
					{nombre: 'Matemática'},
					{nombre: 'Ciencias Sociales'},
					{nombre: 'Ciencias Naturales'},
					{nombre: 'Educación Física'},
					{nombre: 'Ingles'},
					{nombre: 'Frances'},
					{nombre: 'Plastica'},
				]
			},
			{
				id: 3,
				image: '/assets/images/niveles/secundaria-inicial.jpg',
				nombre: 'Educación Secundaria',
				subtitulo: 'Ciclo Básico',
				descripcion: 'Fortalecemos las bases de la educación secundaria básica.',
				materias: [
					{nombre: 'Literatura'},
					{nombre: 'Matemática'},
					{nombre: 'Geografía'},
					{nombre: 'Biología'},
					{nombre: 'Historia'},
					{nombre: 'Ingles'},
					{nombre: 'Arte'},
				]
			},
			{
				id: 4,
				image: '/assets/images/niveles/secundaria-orientado.jpg',
				nombre: 'Educación Secundaria',
				subtitulo: 'Ciclo Orientado',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{nombre: 'Literatura'},
					{nombre: 'Matemática'},
					{nombre: 'Geografía'},
					{nombre: 'Biología'},
					{nombre: 'Historia'},
					{nombre: 'Ingles'},
					{nombre: 'Arte'},
					{nombre: 'Física'},
					{nombre: 'Química'},
				]
			},
			{
				id: 5,
				image: '/assets/images/niveles/universidad.jpg',
				nombre: 'Educación Superior',
				subtitulo: 'Terciario o universitario',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{nombre: 'Matemática'},
					{nombre: 'Sociedad y Estado'},
					{nombre: 'Ingles'},
					{nombre: 'Física'},
				]
			},
			{
				id: 6,
				image: '/assets/images/niveles/extracurricular.jpg',
				nombre: 'Extracurriculares',
				subtitulo: 'Otros intereses',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{nombre: 'Proyectual'},
					{nombre: 'Dibujo 3D'},
					{nombre: 'Diseño'},
					{nombre: 'Electrónica'},
				]
			},

		];
	}
}
