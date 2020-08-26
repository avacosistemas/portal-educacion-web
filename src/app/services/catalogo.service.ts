import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(
    private http: HttpClient
  )
  { }

  public getCatalogoDocente(queryString: FiltrosCatalogo): Observable<any> {
    return this.http.get(`${environment.apiService}catalogoDocente?orden=${queryString.orden}&idMateria=${queryString.idMateria}&idNivel=${queryString.idNivel}`);
  }

}

export class FiltrosCatalogo {
  orden: string;
  idMateria: number;
  idNivel: number;
}
