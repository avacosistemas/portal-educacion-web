import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalHome } from '../entities/modalhome';

@Injectable({
  providedIn: 'root'
})
export class ModalhomeService {

  constructor(
    private http: HttpClient
  )
  { }

  public getTodayModal(): Observable<ModalHome> {
    return this.http.get<ModalHome>(`${environment.apiService}parameter/popup`)
  }
}
