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

}