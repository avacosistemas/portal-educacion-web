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
    private http: HttpClient
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

  getClaseAlumnos(idProfesor: number, idClase: number)
  {
    return this.http.get(this.controllerCliente + idProfesor.toString() + '/alumnos/' + idClase.toString());
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

  public getPreguntas(idProfesor: number): Observable<any> {
    return this.http.get<any>(this.controllerCliente + 'preguntas/' + idProfesor.toString());
  }

  public sendRespuesta(idProfesor: number, idPregunta: number, respuesta: string, )
  {
    const body = {respuesta: respuesta, idPreguntaRespuesta: idPregunta};
    return this.http.put(this.controllerCliente + 'responder/' + idProfesor.toString(), body);
  }

  public sendAnotacion(idProfesor: number, idClase: number, mensaje: string) {
    const body = {comentario: mensaje};
    return this.http.post(this.controllerCliente + idProfesor.toString() + '/anotaciones/' + idClase.toString(), body );
  }

  randomInt(min, max)
  {
    return Math.floor(min + (max - min) * Math.random());
  }

  public getMaterias(idProfesor: number)
  {
    return this.http.get(environment.apiService + 'materiasprofesor/' +idProfesor.toString())
  }
  public getHorarios(idProfesor: number, fecha: string)
  {
    return this.http.get(environment.apiService + 'catalogoHorario/profesor/' +idProfesor.toString() + '/fecha/' + fecha );
  }

  getHorariosMocked(fecha: NgbDate, idProfesor: number): Observable<string[]> {
    return of(this._getHorariosRandom(fecha, idProfesor));
  }

  private _getHorariosRandom(fecha: NgbDate, profesorId: number): string[]
  {
    // vamos a generar algunos rangos horarios de forma aleatoria
    const idx = Number(fecha.year.toString() + fecha.month.toString() + fecha.day.toString());
    if (this._aFechas[idx]) { return this._aFechas[idx]; }

    const maxItems = this.randomInt(2, 4);
    const horarios: string[] = [];
    const choosen: number[] = [];

    const hourMin = 8;
    const hourMax = 20;


    for (let j = 0; j <= maxItems; j++)
    {
      let notDefined = true;
      while (notDefined)
      {
        const startH = this.randomInt(hourMin, hourMax);
        if (choosen.length === 0 && startH <= hourMax && startH >= hourMin)
        {

          choosen.push(startH);
          notDefined = false;

        } else
        {

          const tokensMax = choosen.length;
          let tokensPass = true;

          for (let k = 0; k < tokensMax; k++)
          {
            if (notDefined && tokensPass && (
              (startH >= hourMin && startH <= (choosen[k] - 2)) ||
              (startH <= hourMax && startH >= (choosen[k] + 2))
            ))
            {
              if ( k === (tokensMax - 1))
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
