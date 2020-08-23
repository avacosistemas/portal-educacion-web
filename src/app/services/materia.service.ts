import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Materia } from "../entities/materia";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'

})
export class MateriaService
{

  constructor(
    private http: HttpClient
  )
  { }



  public getMaterias() : Observable<Materia[]> {
    return this.http.get<Materia[]>(environment.apiService + 'materias/');
  }

}


