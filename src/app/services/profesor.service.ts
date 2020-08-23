import { Injectable } from '@angular/core';
import { Profesor } from "../entities/profesor";
import { Observable, of } from 'rxjs';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService
{

  _aFechas: any[] = [];

  constructor(
    protected http: HttpClient
  ) { }



  public getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(environment.apiService + 'profesores');
  }

  getProfesor(id: number): Observable<Profesor>
  {
    return this.http.get<Profesor>(environment.apiService + 'profesores/' + id.toString());
  }

  setProfesor(profesor: any): Observable<any>
  {
    return this.http.put(environment.apiService + 'profesores/' + profesor.id.toString(), profesor);
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
}
