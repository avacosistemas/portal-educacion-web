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

  public getCatalogoDocente(queryString: object): Observable<any> {
    return this.http.post(environment.apiService + 'catalogoDocente', queryString);
  }

}
