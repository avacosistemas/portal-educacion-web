import { Injectable } from '@angular/core';
import { Profesor } from "../entities/profesor";
import { Observable, of } from 'rxjs';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Alumno } from "../entities/alumno";
import { Calificaciones } from '../entities/calificaciones';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService
{
  controller = environment.apiService + 'profesores/';
  controllerCliente = environment.apiServiceCliente + 'profesor/';

  _aFechas: any[] = [];

  constructor(
    protected http: HttpClient
  ) { }

  getCalificaciones(id: number) {
    return this.http.get<Calificaciones>(this.controllerCliente + 'calificaciones/' + id.toString());
  }

  public getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.controller);
  }

  getProfesor(id: number): Observable<Profesor>
  {
    return this.http.get<Profesor>(this.controller + id.toString());
  }

  public getPerfil(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(this.controllerCliente + 'miperfil/' + id.toString());
  }

  public setProfesor(profesor: any): Observable<any>
  {
    return this.http.put(this.controllerCliente +  'miperfil/' + profesor.id.toString(), profesor);
  }

  public setProfilePicture(fd: FormData) {
    return this.http.post(this.controller + 'uploadFotoPerfil/', fd);
  }

  addProfesor(profesor: Profesor): Observable<any>
  {
    return this.http.post(this.controller, profesor);
  }

  public getClases(idProfesor: number)
  {
    return this.http.get(this.controllerCliente + 'misclases/' + idProfesor.toString());
  }

  public getClase(idProfesor: number, idClase: number)
  {
    return this.http.get(this.controllerCliente + idProfesor.toString() + '/detalleclase/' + idClase.toString());
  }

  public getAnotaciones(idProfesor: number, idClase: number)
  {
    return this.http.get(this.controllerCliente + idProfesor.toString() + '/anotaciones/' + idClase.toString());
  }

  public getPreguntas(id: number): Observable<any> {
    return this.http.get<any>(this.controllerCliente + 'preguntas/' + id.toString());
  }

  public sendRespuesta(id: number, respuesta: string)
  {
    const body = {respuesta: respuesta, idPreguntaRespuesta: id};
    return this.http.put(this.controllerCliente + 'responder/' + id.toString(), body);
  }

  public sendAnotacion(idProfesor: number, idClase: number, mensaje: string) {
    const body = {comentario: mensaje};
    return this.http.post(this.controllerCliente + idProfesor.toString() + '/anotaciones/' + idClase.toString(), body );
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
