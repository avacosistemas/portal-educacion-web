import {Injectable} from '@angular/core';
import {NivelEducativo} from "../entities/nivelEducativo";
import {Observable, of} from 'rxjs';
import {Materia} from "../entities/materia";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class NivelService
{

	_nivelEducativo: NivelEducativo[] = [];
	_materiasNombre: string[] = [];

	constructor(
	  private http: HttpClient
  )
	{
	}

	public getNiveles() : Observable<NivelEducativo[]>
  {
	  return this.http.get<NivelEducativo[]>(environment.apiService + 'niveles/');
  }

	public getNivelesHardcode(): Observable<NivelEducativo[]>
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
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Castellano'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Matemática'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ciencias Sociales'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ciencias Naturales'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Educación Física'},
				]
			},
			{
				id: 2,
				image: '/assets/images/niveles/primaria-segundo-ciclo.jpg',
				nombre: 'Educación Primaria',
				subtitulo: 'Segundo Ciclo',
				descripcion: 'Cada vez más conocimientos iniciales con un temario extendido',
				materias: [
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Castellano'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Matemática'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ciencias Sociales'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ciencias Naturales'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Educación Física'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ingles'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Frances'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Plastica'},
				]
			},
			{
				id: 3,
				image: '/assets/images/niveles/secundaria-inicial.jpg',
				nombre: 'Educación Secundaria',
				subtitulo: 'Ciclo Básico',
				descripcion: 'Fortalecemos las bases de la educación secundaria básica.',
				materias: [
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Literatura'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Matemática'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Geografía'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Biología'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Historia'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ingles'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Arte'},
				]
			},
			{
				id: 4,
				image: '/assets/images/niveles/secundaria-orientado.jpg',
				nombre: 'Educación Secundaria',
				subtitulo: 'Ciclo Orientado',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Literatura'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Matemática'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Geografía'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Biología'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Historia'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ingles'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Arte'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Física'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Química'},
				]
			},
			{
				id: 5,
				image: '/assets/images/niveles/universidad.jpg',
				nombre: 'Educación Superior',
				subtitulo: 'Terciario o universitario',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Matemática'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Sociedad y Estado'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Ingles'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Física'},
				]
			},
			{
				id: 6,
				image: '/assets/images/niveles/extracurricular.jpg',
				nombre: 'Extracurriculares',
				subtitulo: 'Otros intereses',
				descripcion: 'Acompañamos hacia el futuro de tu educación.',
				materias: [
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Proyectual'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Dibujo 3D'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Diseño'},
					{id: 1, idNivel: 1, descripcion: '', nombre: 'Electrónica'},
				]
			},

		];
	}
}
