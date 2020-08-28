import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../modules/fwk/core/service/generic-http-service/generic-http.service';
import { WsDef, HTTP_METHODS } from '../modules/fwk/core/model/ws-def';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(
    private genericHttpService: GenericHttpService
  )
  { }

  public getCatalogoDocente(data: FiltrosCatalogo): Observable<any> {
    const params = {orden: 'orden', idMateria: 'idMateria', idNivel: 'idNivel'};
    const ws: WsDef = new WsDef();
    ws.url = `${environment.apiService}catalogoDocente`;
    ws.method = HTTP_METHODS.get;
    ws.querystring = params;

    return this.genericHttpService.callWs(ws, data);
  }

}

export class FiltrosCatalogo {
  orden: string;
  idMateria: number;
  idNivel: number;
}
