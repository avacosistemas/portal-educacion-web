import { Injectable } from '@angular/core';
import { Alumno } from "../entities/alumno";
import { Observable, of } from "rxjs";
import { Profesor } from "../entities/profesor";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  _alumnos: Alumno[] = [];

  constructor() { }

  getAlumnos(): Observable<Alumno[]>
  {
    if (!(this._alumnos.length > 0))
    {
      this._setAlumnos();
    }

    return of(this._alumnos);

  }

  getAlumno(id: number): Observable<Alumno>
  {
    if (!(id > 0))
      return null;

    if (!(this._alumnos.length > 0))
      this._setAlumnos();

    // ======== mock ======
    let alumno = this._alumnos.filter(x => x.id == id)[0];


    return of(alumno);
  }

  private _setAlumnos()
  {
    this._alumnos = [
      {
        id: 1,
        nombre: 'Marilina',
        apellido: 'Smilchuk',
        dni: 27844575,
        email: 'marilina@avaco.com',
        mobile: '+54911 5447-7834',
        phone: '+5411 4672-2559',
        usuario: 'mars',
        institucion: 'Teach',
        picture: '/assets/profiles/mars.jpg',
      },
      {
        id: 2,
        nombre: 'Gustavo',
        apellido: 'Canalini',
        dni: 30984452,
        email: 'marilina@avaco.com',
        mobile: '+54911 6942-3789',
        phone: '+5411 4533-4421',
        usuario: 'gusca',
        institucion: 'Teach',
        picture: '/assets/profiles/gcan.jpg',
      },      
      {
        id: 3,
        nombre: 'Pablo',
        apellido: 'Crook',
        dni: 2545457,
        email: 'marilina@avaco.com',
        mobile: '+54911 6942-3789',
        phone: '+5411 4533-4421',
        usuario: 'gusca',
        institucion: 'Teach',
      },
    ]
  }
}
