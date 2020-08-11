import { Injectable } from '@angular/core';
import { Profesor } from "../entities/profesor";
import { Observable, of } from 'rxjs';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService
{

  _profesores: Profesor[] = [];
  _aFechas: any[] = [];

  constructor() { }

  getProfesores(): Observable<Profesor[]>
  {
    if (!(this._profesores.length > 0))
    {
      this._setProfesores();
    }

    return of(this._profesores);

  }

  getProfesor(id: number): Observable<Profesor>
  {
    if (!(id > 0))
      return null;

    if (!(this._profesores.length > 0))
      this._setProfesores();

    // ======== mock ======
    let profesor = this._profesores.filter(x => x.id == id)[0];

    return of(profesor);
  }

  randomInt(min, max)
  {
    return Math.floor(min + (max - min) * Math.random());
  }

  getHorarios(fecha: NgbDate, profesorId: number): Observable<string[]> {
    return of(this._getHorariosRandom(fecha, profesorId));
  }

  private _getHorariosRandom(fecha: NgbDate, profesorId: number): string[]
  {
    // vamos a generar algunos rangos horarios de forma aleatoria
    let idx = Number(fecha.year.toString() + fecha.month.toString() + fecha.day.toString());
    if (this._aFechas[idx]) return this._aFechas[idx];

    const maxItems = this.randomInt(2, 4);
    let horarios: string[] = [];
    let choosen: number[] = [];

    const hourMin = 8;
    const hourMax = 20;


    for (let j = 0; j <= maxItems; j++)
    {
      let notDefined = true;
      while (notDefined)
      {
        let startH = this.randomInt(hourMin, hourMax);
        if (choosen.length == 0 && startH <= hourMax && startH >= hourMin)
        {

          choosen.push(startH);
          notDefined = false;

        } else
        {

          let tokensMax = choosen.length;
          let tokensPass = true;

          for (let k = 0; k < tokensMax; k++)
          {
            if (notDefined && tokensPass && (
              (startH >= hourMin && startH <= (choosen[k] - 2)) ||
              (startH <= hourMax && startH >= (choosen[k] + 2))
            ))
            {
              if ( k == (tokensMax - 1))
              {
                choosen.push(startH);
                notDefined = false;
              }
            }
            else
            {
              tokensPass = false;
            }
          }
        }
      }
    }
    choosen.sort((a, b) => a - b);
    choosen.forEach(item =>
    {
      horarios.push(item.toString().padStart(2, '0') + ':00 - ' + (item + 1).toString().padStart(2, '0') + ':20');
    });

    this._aFechas[idx] = horarios;

    return horarios;
  }

  private _setProfesores()
  {
    // ======== mock ======
    this._profesores = [
      {
        id: 1,
        nombre: 'María Elena',
        apellido: 'Sanchez',
        materia: 'Historia',
        picture: '/assets/profiles/rico_93005.jpg',
        valor_curso: 40,
        calificacion: 9,
        descripcion: 'Más de 10 años en educación primaria y secundaria, graduada con honores en la Univerdad de Buenas Aires y con un doctorado en Stanford',
        dni: 27544993,
        email: 'melena@teach.com',
        institucion: 'Teach',
        telefonoMovil: '+54911 5517-8243',
        usuario: 'melena'
      },
      {
        id: 2,
        nombre: 'Javier',
        apellido: 'Santamaria',
        materia: 'Matemáticas',
        picture: '/assets/profiles/David-Calle.jpg',
        valor_curso: 38,
        calificacion: 8,
        descripcion: 'Graduado de la Universidad Tecnólogica Nacional. Investigador del CONICET y jefe de la carrera Licenciatura en Ciencias Matemáticas',
        dni: 23584793,
        email: 'jsanta@teach.com',
        institucion: 'Teach',
        telefonoMovil: '+54911 9321-3479',
        usuario: 'jsanta'
      },
      {
        id: 3,
        nombre: 'Martín',
        apellido: 'Serravalle',
        materia: 'Matemáticas',
        picture: '/assets/profiles/Price_Rich.jpg',
        valor_curso: 39,
        calificacion: 5,
        descripcion: 'Graduado de Universidad de Buenos Aires con más de 5 años en la educación secundaria',
        dni: 25321294,
        email: 'mserra@teach.com',
        institucion: 'Teach',
        telefonoMovil: '+54911 7831-4242',
        usuario: 'mserra'
      },
      {
        id: 4,
        nombre: 'Gastón',
        apellido: 'Guerrido',
        materia: 'Física',
        picture: '/assets/profiles/scott-wankel.jpg',
        valor_curso: 32,
        calificacion: 7,
        descripcion: 'Físico graduado de la Universidad Tecnólogica Nacional. Investigador independiente y consultor para el instituto Balseiro.',
        dni: 24317835,
        email: 'gguerrido@teach.com',
        institucion: 'Teach',
        telefonoMovil: '+54911 7233-4776',
        usuario: 'gguerrido'
      }
    ];
  }
}
