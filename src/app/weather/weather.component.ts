import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { LocationModel } from '../models/location.model';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  @Input() location$: Observable<LocationModel>;
  weatherModel: WeatherModel;
  isMetric: boolean = true;

  constructor(private _weatherService: WeatherService) {}

  ngOnInit(): void {
    this.location$
      .pipe(
        switchMap((location: LocationModel) => {
          this.weatherModel = new WeatherModel(location.name, location.country);

          return this._weatherService.getWeatherData(
            location.latitude,
            location.longitude
          );
        }),
        tap((results: any) => {
          this.weatherModel.description = this.capitalizeFirstLetter(
            results?.weather[0]?.description
          );
          this.weatherModel.icon_code = results?.weather[0]?.icon;
          this.weatherModel.temperature = this.isMetric
            ? Math.round(results?.main?.temp)
            : this.convertToFahrenheit(results?.main?.temp);
          this.weatherModel.feels_like = this.isMetric
            ? Math.round(results?.main?.feels_like)
            : this.convertToFahrenheit(results?.main?.feels_like);
          this.weatherModel.low = this.isMetric
            ? Math.round(results?.main?.temp_min)
            : this.convertToFahrenheit(results?.main?.temp_min);
          this.weatherModel.high = this.isMetric
            ? Math.round(results?.main?.temp_max)
            : this.convertToFahrenheit(results?.main?.temp_max);
          this.weatherModel.pressure = results?.main?.pressure;
          this.weatherModel.humidity = results?.main?.humidity;
          this.weatherModel.wind = this.isMetric
            ? results?.wind?.speed
            : this.convertToMph(results?.wind?.speed);
        })
      )
      .subscribe();
  }

  toggleUnit() {
    this.isMetric = !this.isMetric;
    this.weatherModel.temperature = this.isMetric
      ? this.convertToCelsius(this.weatherModel.temperature)
      : this.convertToFahrenheit(this.weatherModel.temperature);
    this.weatherModel.feels_like = this.isMetric
      ? this.convertToCelsius(this.weatherModel.feels_like)
      : this.convertToFahrenheit(this.weatherModel.feels_like);
    this.weatherModel.low = this.isMetric
      ? this.convertToCelsius(this.weatherModel.low)
      : this.convertToFahrenheit(this.weatherModel.low);
    this.weatherModel.high = this.isMetric
      ? this.convertToCelsius(this.weatherModel.high)
      : this.convertToFahrenheit(this.weatherModel.high);
    this.weatherModel.wind = this.isMetric
      ? this.convertToMps(this.weatherModel.wind)
      : this.convertToMph(this.weatherModel.wind);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  convertToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32);
  }

  convertToCelsius(fahrenheit: number): number {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  }

  convertToMph(mps: number): number {
    return this.round(mps * 2.23694, 2);
  }

  convertToMps(mps: number): number {
    return this.round(mps / 2.23694, 2);
  }

  round(value: number, precision: number) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
