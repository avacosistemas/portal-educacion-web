import { Component, OnInit } from '@angular/core';
import { NivelEducativo } from '../../Entities/nivelEducativo';

@Component({
  selector: 'app-nivel-educativo',
  templateUrl: './nivel-educativo.component.html',
  styleUrls: ['./nivel-educativo.component.scss']
})
export class NivelEducativoComponent implements OnInit {

  nivelesEducativos: NivelEducativo[] = [
    {
      image: '/assets/portfolio/01-thumbnail.jpg',
      nombre: 'Educación Primaria',
      subtitulo: 'Primer Ciclo',
      descripcion: 'Acompañamos a tu hijo en sus primeros pasos de primaria.'
    },
    {
      image: '/assets/portfolio/02-thumbnail.jpg',
      nombre: 'Educación Primaria',
      subtitulo: 'Segundo Ciclo',
      descripcion: 'Cada vez más conocimientos iniciales con un temario extendido'
    },
    {
      image: '/assets/portfolio/03-thumbnail.jpg',
      nombre: 'Educación Secundaria',
      subtitulo: 'Ciclo Básico',
      descripcion: 'Fortalecemos las bases de la educación secundaria básica.'
    },
    {
      image: '/assets/portfolio/04-thumbnail.jpg',
      nombre: 'Educación Secundaria',
      subtitulo: 'Ciclo Orientado',
      descripcion: 'Acompañamos hacia el futuro de tu educación.'
    },
    {
      image: '/assets/portfolio/05-thumbnail.jpg',
      nombre: 'Educación Superior',
      subtitulo: 'Terciario o universitario',
      descripcion: 'Acompañamos hacia el futuro de tu educación.'
    },
    {
      image: '/assets/portfolio/06-thumbnail.jpg',
      nombre: 'Extracurriculares',
      subtitulo: 'Otros intereses',
      descripcion: 'Acompañamos hacia el futuro de tu educación.'
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
