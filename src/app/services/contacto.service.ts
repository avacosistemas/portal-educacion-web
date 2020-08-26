import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  constructor(
    private http: HttpClient
  )
  { }

  public sendContact(contact: any): Observable<any> {
    return this.http.post(environment.apiService + 'contact-us/send/', contact);
  }

}
