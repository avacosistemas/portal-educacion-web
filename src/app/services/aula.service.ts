import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profesor } from "../entities/profesor";

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  controller = environment.apiService + 'aula/';
  controllerCliente = environment.apiServiceCliente + 'aula/';

  constructor(protected http: HttpClient) { }

  public iniciarClaseProfesor(idAula: number, idProfesor: number) {
    const body = {idAula: idAula, idProfesor: idProfesor};
    return this.http.post(this.controllerCliente + 'profesor/crearunirse/', body);
  }

  public iniciarClaseAlumno(idAula: number, idAlumno: number) {
    const body = {idAula: idAula, idAlumno: idAlumno};
    return this.http.post(this.controllerCliente + 'alumno/unirse/', body);
  }

}
