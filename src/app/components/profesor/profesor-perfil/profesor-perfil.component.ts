import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/entities/profesor';

@Component({
  selector: 'app-profesor-perfil',
  templateUrl: './profesor-perfil.component.html',
  styleUrls: ['./profesor-perfil.component.scss']
})
export class ProfesorPerfilComponent implements OnInit {

  profesor: Profesor =
    {
      nombre: 'María Elena',
      apellido: 'Sanchez',
      materia: 'Historia del arte',
      picture: '/assets/profiles/rico_93005.jpg',
      valor_curso: 40
    };

  currentRate = 9;

  constructor() { }

  ngOnInit(): void {
  }

}
