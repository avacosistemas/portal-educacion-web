import { Injectable } from '@angular/core';
import { Alumno } from "../entities/alumno";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Mensaje } from "../entities/mensaje";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  controller = environment.apiService + 'alumnos/';
  controllerCliente = environment.apiServiceCliente + 'alumno/';

  constructor(private http: HttpClient) { }


  public setAlumnoNuevo(alumno: Alumno)
  {
    const user = {
      apellido: alumno.apellido,
      numeroIdentificacion: alumno.numeroIdentificacion,
      email: alumno.email,
      // institucion: 'Teach',
      nombre: alumno.nombre,
      password: alumno.password,
      secondPassword: alumno.password,
      // picture: '',
      telefonoFijo: alumno.telefonoFijo,
      telefonoMovil: alumno.telefonoMovil,
      username: alumno.username,
    };

    return this.http.post(environment.apiService + 'alumnos/registrar/', user);
  }


  public sendMessage(msg: Mensaje)
  {
    // TODO send mensajes
  }

  public getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.controller);
  }

  public getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.controller + id.toString());
  }

  public getPerfil(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.controllerCliente + 'miperfil/' + id.toString());
  }

  public setAlumno(alumno: any): Observable<any>
  {
    return this.http.put(this.controllerCliente +  'miperfil/' + alumno.id.toString(), alumno);
  }

  public getClases(idAlumno: number)
  {
    return this.http.get(this.controllerCliente + 'misclases/' + idAlumno.toString());
  }
  public getClase(idAlumno: number, idClase: number)
  {
    return this.http.get(this.controllerCliente + idAlumno.toString() + '/detalleclase/' + idClase.toString());
  }

  public sendPregunta(idProfesor: number, idAlumno: number, mensaje: string) {
    const body = {idProfesor: idProfesor, pregunta: mensaje};
    return this.http.post(this.controllerCliente + 'preguntar/' + idAlumno.toString(), body );
  }

  public sendAnotacion(idAlumno: number, idClase: number, mensaje: string) {
    const body = {comentario: mensaje};
    return this.http.post(this.controllerCliente + idAlumno.toString() + '/anotaciones/' + idClase.toString(), body );
  }

  public sendCalificacion(idAlumno: number, idAula: number, calificacion: number, comentarios?: string) {
    const body = { puntuacion: calificacion, comentario: comentarios };
    return this.http.post(this.controllerCliente + idAlumno.toString() + '/puntuacion/' + idAula.toString(), body);
  }




}
