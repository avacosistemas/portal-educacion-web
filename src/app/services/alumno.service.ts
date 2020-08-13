import { Injectable } from '@angular/core';
import { Alumno } from "../entities/alumno";
import { Observable, of } from "rxjs";
import { Profesor } from "../entities/profesor";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  _alumnos: Alumno[] = [];

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>
  {
    if (!(this._alumnos.length > 0))
    {
      this._setAlumnos();
    }

    return of(this._alumnos);

  }

  public setAlumnoNuevo(alumno: Alumno)
  {

    const uri = environment.apiService + 'alumnos/registrar/';

    // console.log(JSON.stringify(producto));
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(uri, alumno, {headers: headers});
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
        apellido: 'Sacco',
        dni: 27844575,
        email: 'marilina@avaco.com',
        telefonoMovil: '+54911 5447-7834',
        telefonoFijo: '+5411 4672-2559',
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
        telefonoMovil: '+54911 6942-3789',
        telefonoFijo: '+5411 4533-4421',
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
        telefonoMovil: '+54911 6942-3789',
        telefonoFijo: '+5411 4533-4421',
        usuario: 'gusca',
        institucion: 'Teach',
      },
    ]
  }
}
