import { Injectable } from '@angular/core';
import { BikeWebService } from './bike-web.service';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Bike } from '../models/bike.model';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  filteredBikes$: Observable<Bike[]>; // Use subject
  filteredBikesSubject = new BehaviorSubject<Bike[]>([]);
  removeBikeSubject = new ReplaySubject<number>();
  loadBikesSubect = new ReplaySubject<boolean>();

  constructor(private _bikeWebService: BikeWebService) {
    this.filteredBikes$ = this.filteredBikesSubject;

    this.loadBikesSubect
      .pipe(
        switchMap(() => {
          return this.filteredBikes$.pipe(take(1));
        }),
        switchMap((results) => {
          console.log(results);
          if (results.length === 0) {
            return this._bikeWebService.loadBikes().pipe(
              tap((results) => {
                const bikes = results.map((element) => {
                  return new Bike(
                    element.id,
                    element.type,
                    element.description,
                    element.rating,
                    element.price,
                    element.quantity_in_store,
                    element.picture_base64
                  );
                });
                this.filteredBikesSubject.next(bikes);
              })
            );
          }
        })
      )
      .subscribe({
        error: (e) => {
          console.log(e);
        },
      });

    this.removeBikeSubject
      .pipe(
        switchMap((bikeId) =>
          this.filteredBikes$.pipe(
            take(1),
            map((bikes) =>
              bikes
                .map((bike) =>
                  bike.id === bikeId
                    ? { ...bike, quantity: Math.max(0, bike.quantity - 1) }
                    : bike
                )
                .filter((bike) => bike.quantity > 0)
            )
          )
        ),

        tap((results: any) => {
          this.filteredBikesSubject.next(results);
        })
      )
      .subscribe({
        error: (e) => {
          console.log(e);
        },
      });
  }

  loadBikes() {
    this.loadBikesSubect.next(true);
  }

  addNewBikes() {}
}
