import { Injectable } from '@angular/core';
import { LocalWebService } from './local-web.service';
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private _localWebService: LocalWebService) {}

  getWeatherData(lat: number, lon: number): Observable<WeatherModel> {
    return this._localWebService.getWeatherData(lat, lon);
  }
}
