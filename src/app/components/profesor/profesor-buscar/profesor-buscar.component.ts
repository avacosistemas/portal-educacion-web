import { Component, OnInit } from '@angular/core';
import { Profesor } from "../../../Entities/profesor";

@Component({
  selector: 'app-profesor-buscar',
  templateUrl: './profesor-buscar.component.html',
  styleUrls: ['./profesor-buscar.component.scss']
})
export class ProfesorBuscarComponent implements OnInit {

  nivel = 'Educación Primaria - Primer Ciclo';
  materiaSeleccionada: string;

  profesores: Profesor[] = [
    {
      nombre: 'María Elena',
      apellido: 'Sanchez',
      materia: 'Historia del arte',
      picture: '/assets/profiles/rico_93005.jpg',
      valor_curso: 40
    },
    {
      nombre: 'Javier',
      apellido: 'Santamaria',
      materia: 'Matemáticas',
      picture: '/assets/profiles/David-Calle.jpg',
      valor_curso: 38
    },
    {
      nombre: 'Martín',
      apellido: 'Serravalle',
      materia: 'Matemáticas',
      picture: '/assets/profiles/Price_Rich.jpg',
      valor_curso: 39
    },
    {
      nombre: 'Gastón',
      apellido: 'Guerrido',
      materia: 'Física',
      picture: '/assets/profiles/scott-wankel.jpg',
      valor_curso: 32
    }
  ];

  public get getProfesor(): Profesor[] {
    return this.profesores.filter(f => f.materia === (this.materiaSeleccionada ? this.materiaSeleccionada : f.materia));
  }

  constructor() { }

  ngOnInit(): void {
  }

  selecciono(valor: string) {
    this.materiaSeleccionada = valor;
  }

}
