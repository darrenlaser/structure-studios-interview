import { Injectable, OnDestroy } from '@angular/core';
import { BikeWebService } from './bike-web.service';
import { ReplaySubject, map, switchMap, take, tap } from 'rxjs';
import { Bike } from '../models/bike.model';

@Injectable({
  providedIn: 'root',
})
export class BikeService implements OnDestroy {
  bikes: Bike[] = [];
  filteredBikesSubject = new ReplaySubject<Bike[]>(1);
  removeBikeSubject = new ReplaySubject<number>();
  removeAllBikesSubject = new ReplaySubject<number>();
  loadBikesSubject = new ReplaySubject<boolean>();
  addBikesSubject = new ReplaySubject<Bike>();
  filterSubject = new ReplaySubject<string>();
  bikesLoadedOnStart = false;

  get filteredBikes$() {
    return this.filteredBikesSubject.asObservable();
  }

  constructor(private _bikeWebService: BikeWebService) {
    this.loadBikesSubject
      .pipe(
        switchMap(() => {
          return this._bikeWebService.loadBikes().pipe(
            tap((results) => {
              const bikes = results.map((bike: any) => {
                return new Bike(
                  bike.id,
                  bike.type,
                  bike.description,
                  bike.rating,
                  bike.price,
                  bike.quantity_in_store,
                  bike.picture_base64
                );
              });
              this.bikes = bikes;
              this.filteredBikesSubject.next(bikes);
            })
          );
        })
      )
      .subscribe({
        error: (e) => {
          console.log(`Loading error: ${e}`);
        },
      });

    this.filterSubject
      .pipe(
        switchMap((filter) =>
          this.filteredBikes$.pipe(
            take(1),
            tap((bikes) => this.getFilteredBikes(bikes, filter))
          )
        )
      )
      .subscribe({
        error: (e) => {
          console.log(`Filtering error: ${e}`);
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
          console.log(`Removing item error: ${e}`);
        },
      });

    this.removeAllBikesSubject
      .pipe(
        switchMap((bikeId) =>
          this.filteredBikes$.pipe(
            take(1),
            map((bikes) => bikes.filter((bike) => bike.id !== bikeId))
          )
        ),
        tap((results: any) => {
          this.filteredBikesSubject.next(results);
        })
      )
      .subscribe({
        error: (e) => {
          console.log(`Removing all items error: ${e}`);
        },
      });

    this.addBikesSubject
      .pipe(
        switchMap((bike: Bike) =>
          this.filteredBikes$.pipe(
            take(1),
            map((bikes) => {
              bike.id =
                bikes
                  .map((x) => x.id)
                  .reduce((acc, curr) => Math.max(acc, curr)) + 1;
              bikes.push(bike);
              this.filterSubject.next('rating');
            })
          )
        )
      )
      .subscribe({
        error: (e) => {
          console.log(`Adding item error: ${e}`);
        },
      });

    this.loadBikes();
  }

  ngOnDestroy(): void {
    this.loadBikesSubject.unsubscribe();
    this.filteredBikesSubject.unsubscribe();
    this.removeBikeSubject.unsubscribe();
    this.addBikesSubject.unsubscribe();
  }

  loadBikes() {
    if (!this.bikesLoadedOnStart) {
      this.bikesLoadedOnStart = true;
      this.loadBikesSubject.next(true);
    }
  }

  getFilteredBikes(bikes: Bike[], filter: string) {
    let sortedBikes: Bike[] = [];
    switch (filter) {
      case 'rating':
        sortedBikes = bikes.sort((a, b) => a.rating - b.rating);
        break;
      case 'price':
        sortedBikes = bikes.sort((a, b) => a.price - b.price);
        break;
      case 'quantity':
        sortedBikes = bikes.sort((a, b) => a.quantity - b.quantity);
        break;
    }
    this.filteredBikesSubject.next(sortedBikes);
  }
}
