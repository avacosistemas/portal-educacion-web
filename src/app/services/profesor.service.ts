import { Injectable } from '@angular/core';
import {Profesor} from "../entities/profesor";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  _profesores: Profesor[] = [];
  constructor() { }

  getProfesores() : Observable<Profesor[]>
  {
    if (!this._profesores || !(this._profesores.length > 0 )) {
      this._profesores = [
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

    }

    return of(this._profesores);

  }
}
