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
    if (!(this._profesores.length > 0 )) {
      this._setProfesores();
    }

    return of(this._profesores);

  }

  getProfesor(id: number ) : Observable<Profesor>
  {
    if (!(id > 0))
      return null;

    if(!(this._profesores.length > 0))
      this._setProfesores();

    // ======== mock ======
    let profesor = this._profesores.filter(x=> x.id == id )[0];

    return of(profesor);
  }

  private _setProfesores() {
    // ======== mock ======
    this._profesores = [
      {
        id: 1,
        nombre: 'María Elena',
        apellido: 'Sanchez',
        materia: 'Historia',
        picture: '/assets/profiles/rico_93005.jpg',
        valor_curso: 40,
        valoracion: 9,
        about: 'Más de 10 años en educación primaria y secundaria, graduada con honores en la Univerdad de Buenas Aires y con un doctorado en Stanford'
      },
      {
        id: 2,
        nombre: 'Javier',
        apellido: 'Santamaria',
        materia: 'Matemáticas',
        picture: '/assets/profiles/David-Calle.jpg',
        valor_curso: 38,
        valoracion: 8,
        about: 'Graduado de la Universidad Tecnólogica Nacional. Investigador del CONICET y jefe de la carrera Licenciatura en Ciencias Matemáticas'
      },
      {
        id: 3,
        nombre: 'Martín',
        apellido: 'Serravalle',
        materia: 'Matemáticas',
        picture: '/assets/profiles/Price_Rich.jpg',
        valor_curso: 39,
        valoracion: 5,
        about: 'Graduado de Universidad de Buenos Aires con más de 5 años en la educación secundaria'
      },
      {
        id: 4,
        nombre: 'Gastón',
        apellido: 'Guerrido',
        materia: 'Física',
        picture: '/assets/profiles/scott-wankel.jpg',
        valor_curso: 32,
        valoracion: 7,
        about: 'Físico graduado de la Universidad Tecnólogica Nacional. Investigador independiente y consultor para el instituto Balseiro.'
      }
    ];
  }
}
