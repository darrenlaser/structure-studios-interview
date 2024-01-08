import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalWebService {
  limit: 1;
  constructor(private _httpClient: HttpClient) {}

  getLocationData(latitude: number, longitude: number): Observable<any> {
    return this._httpClient
      .get<any>(
        `https://${environment.api.host}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${environment.weatherKey}`
      )
      .pipe(
        catchError((err) => {
          console.log(`Error message: ${err.message}`);
          return EMPTY;
        })
      );
  }

  getWeatherData(
    latitude: number,
    longitude: number,
    isMetric = true
  ): Observable<any> {
    return this._httpClient
      .get<any>(
        `https://${
          environment.api.host
        }/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${
          isMetric ? 'metric' : 'imperial'
        }&appid=${environment.weatherKey}`
      )
      .pipe(
        catchError((err) => {
          console.log(`Error message: ${err.message}`);
          return EMPTY;
        })
      );
  }
}
