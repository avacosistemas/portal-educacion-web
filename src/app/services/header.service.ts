import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    private menuSelected: Subject<string> = new BehaviorSubject<string>(null);

    setMenuSelected(ms) {
        this.menuSelected.next(ms);
    }

    getMenuSelected(): Observable<string> {
        return this.menuSelected.asObservable();
    }

}
