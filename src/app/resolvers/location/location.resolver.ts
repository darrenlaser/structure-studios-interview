import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EMPTY, Observable, map, switchMap } from 'rxjs';
import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

export const locationResolver: ResolveFn<LocationModel> = (
  route,
  state,
  locationService: LocationService = inject(LocationService)
): Observable<LocationModel> => {
  if (navigator.geolocation) {
    return new Observable<any>((obs) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        obs.next(pos);
        obs.complete();
      });
    }).pipe(
      switchMap((results) => {
        return locationService.getLocationData(results);
      }),
      map((results) => {
        const { lat, lon, name, state, country } = results[0];
        return new LocationModel(lat, lon, name, state, country);
      })
    );
  } else {
    return EMPTY;
  }
};
