import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from 'src/app/models/location.model';
import { LocalWebService } from 'src/app/services/local-web.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private _localWebService: LocalWebService) {}

  getLocationData(pos: GeolocationPosition): Observable<LocationModel> {
    return this._localWebService.getLocationData(
      pos.coords.latitude,
      pos.coords.longitude
    );
  }
}
