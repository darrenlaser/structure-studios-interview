import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BikeWebService {
  constructor(private _httpClient: HttpClient) {}

  loadBikes(): Observable<any> {
    const _url = '/assets/bikes.json';
    return this._httpClient.get<any>(_url);
  }
}
