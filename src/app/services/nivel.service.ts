import { Injectable } from '@angular/core';
import {NivelEducativo} from "../entities/nivelEducativo";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  _nivelEducativo: NivelEducativo[] = [];
  constructor() { }

  public getNiveles() : Observable<NivelEducativo[]>
  {
    if (!this._nivelEducativo || !(this._nivelEducativo.length > 0 )) {

      this._nivelEducativo = [
        {
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

    return of(this._nivelEducativo);

  }

}
