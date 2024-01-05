import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { LocationModel } from 'src/app/models/location.model';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'app-bicycle-list',
  templateUrl: './bicycle-list.component.html',
  styleUrls: ['./bicycle-list.component.scss'],
})
export class BicycleListComponent implements OnInit {
  location$: Observable<LocationModel>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public bikeService: BikeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data
      .pipe(tap(({ location }) => (this.location$ = of(location))))
      .subscribe();

    this.bikeService.loadBikes();
  }

  purchaseBike(bikeId: number) {
    this.bikeService.removeBikeSubject.next(bikeId);
  }

  addBikes() {
    this._router.navigate(['/bicycles/inventory/add']);
  }
}
