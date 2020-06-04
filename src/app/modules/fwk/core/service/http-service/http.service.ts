import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { FilterService, FILTER_TYPE } from '../filter-service/filter.service';
import { NotificationService } from '../notification/notification.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export class HttpService extends BaseService {

  protected baseUrl: string;
  protected http: HttpClient;
  dummyService: any;
  filterService: FilterService;
  notificationService: NotificationService;
  constructor(protected injector: Injector, baseURL: string) {
     super(injector);
     this.http = injector.get(HttpClient);
     this.filterService = injector.get(FilterService);
     this.notificationService = injector.get(NotificationService);
     this.baseUrl = baseURL;
  }

  get httpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    return  { headers: headers };
  }

  httpGet(url, options): Observable<any> {
    if (this.dummyService) {
       return this.dummyService.httpGet(url);
    }
    const observable = new Observable((observer) => {
        console.log('****** get -> ' + url);
        this.http.get<any>(url, options)
            .subscribe(response => this.subHandleResponse(observer, response),
                        e => this.subHandleError(observer, e),
                        () => observer.complete());
      });
    return observable;
  }

  httpPut(url, data, options): Observable<any> {
        const urlid = url;
        console.log('****** put -> ' + urlid);
        console.log('****** object sended ⬎');
        console.log(data);
        if (this.dummyService) {
            return this.dummyService.httpPut(url, data);
        }
        const observable = new Observable((observer) => {

          this.http.put(urlid, data, this.httpOptions)
              .subscribe(response => this.subHandleResponse(observer, response),
                        e => this.subHandleError(observer, e),
                        () => observer.complete());
          });
        return observable;
  }

  httpPost(url, data, options): Observable<any> {
    console.log('****** post -> ' + url);
    console.log('****** object sended ⬎');
    console.log(data);
    if (this.dummyService) {
        return this.dummyService.httpPost(url, data);
    }
    const observable = new Observable((observer) => {
    this.http.post(url, data, this.httpOptions)
        .subscribe(response => this.subHandleResponse(observer, response),
                e => this.subHandleError(observer, e),
                () => observer.complete());
    });
    return observable;
  }

  httpDelete(url, id, options): Observable<any> {
    if (url.substring(url.length - 1, url.length) !== '/'){
        url = url + '/';
    }
    const urlid = `${url}${id}`;
    console.log('****** delete -> ' + urlid);
    if (this.dummyService) {
        const ids = [];
        ids.push(id);
        return this.dummyService.httpDelete(url, ids);
    }
    const observable = new Observable((observer) => {
    this.http.delete(urlid, this.httpOptions)
                .subscribe(response => this.subHandleResponse(observer, response),
                            e => this.subHandleError(observer, e),
                            () => observer.complete());
    });
    return observable;
  }

  multipleDelete(entities: any[]): Observable<any> {
    if (this.dummyService) {
        const ids = [];
        entities.forEach(element => {
            ids.push (element.id);
        });
        return this.dummyService.httpDelete(this.baseUrl, ids);
    }
    const observable = new Observable<any>((observer) => {
        let ids = '' + entities[0].id;
        entities.splice(1, entities.length).forEach(element => {
            ids = ids + ',' + element.id;
        });
        const url = this.baseUrl.substring(0, this.baseUrl.length - 1) + '?ids=' + ids;
        console.log('****** multiples delete -> ' + url);
        this.http.delete(url, this.httpOptions).subscribe(
            response => this.subHandleResponse(observer, response),
            e => this.subHandleError(observer, e),
            () => observer.complete());
    });
    return observable;
  }

  subHandleResponse(observer, response) {
    console.log('****** server response ⬎');
    console.log(response);
    if (response === undefined || response === null){
        observer.next();
    }else{
        const data = response.data;
        if (response.ok === false){
          this.subHandleError(observer, response);
        } else if (data) {
            observer.next(data);
        } else {
            observer.next(response);
        }
    }
  }
  // applyMemoryFilter(entities: any, filterEntity, fieldsDef: any): any {
  //       if (filterEntity && filterEntity !== null) {
  //           console.log('***** filter by entity ⬎');
  //           console.log(filterEntity);
  //           Object.getOwnPropertyNames(filterEntity).forEach((val, index) => {
  //               entities = entities.filter(ent => {
  //                   const field = fieldsDef.find(f => f.key === val);
  //                   let entityValue = ent[val];
  //                   if (entityValue === undefined && (field.options && field.options.matchTo)) {
  //                       entityValue = ent[field.options.matchTo];
  //                   }
  //                   const filterValue = filterEntity[val];
  //                   const filterType = field.filterType ? field.filterType.toUpperCase() : FILTER_TYPE.LIKE;
  //                   const result = this.filterService.filter(entityValue, filterEntity[val], filterType, field);
  //                   console.log(`${field.filterType} for -> ${filterValue} to -> ${entityValue} -> result ${result}`);
  //                   return result;
  //           });
  //           });
  //           console.log('***** output ⬎');
  //           console.log(entities);
  //       }
  //       return entities;
  //   }

  subHandleError(observer, error) {
    console.log('****** server error ⬎');
    console.log(error);
    if (error.error.message) {
        this.notificationService.notifyError(error.error.message);
    } else {
      this.notificationService.notifyError('Se produjo un error de respuesta del servidor');
    }
    observer.error(error);
  }

  subHandleComplete(observer) {
    observer.complete();
  }

  addParam(url: string, param: string, value: string) {
      if (!url.includes('?')) {
        url = url + '?';
      }
      return url.concat(param).concat('=').concat(value);
  }
}
