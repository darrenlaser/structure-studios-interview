import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-bicycle',
  templateUrl: './edit-bicycle.component.html',
  styleUrls: ['./edit-bicycle.component.scss'],
})
export class EditBicycleComponent implements OnInit {
  editBikeForm: FormGroup;

  get displayImagePreview() {
    return this.editBikeForm.get('encoded_picture').value ?? false;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _bikeService: BikeService,
    private _formBuilder: FormBuilder,
    private _imageService: ImageService
  ) {
    this.editBikeForm = this._formBuilder.group({
      id: [0, Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      encoded_picture: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap((params) =>
          this._bikeService.filteredBikes$.pipe(
            tap((bikes) => {
              const foundBike = bikes.find(
                (x) => x.id.toString() === params['id']
              );
              if (foundBike) {
                this.setForm(foundBike);
              } else {
                this.cancel();
              }
            })
          )
        )
      )
      .subscribe();
  }

  setForm(bike: Bike) {
    this.editBikeForm.setValue({
      id: bike.id,
      type: bike.type,
      description: bike.description,
      rating: bike.rating,
      price: bike.price,
      quantity: bike.quantity,
      encoded_picture: bike.encoded_picture,
    });
  }

  cancel() {
    this._router.navigate([`/bicycles/inventory`]);
  }

  onSubmit() {
    if (this.editBikeForm.valid) {
      this._bikeService.updateBikeSubject.next(this.editBikeForm.value as Bike);
      this._router.navigate(['/bicycles/inventory']);
    }
  }

  createImagePreview(event: any) {
    this.editBikeForm.get('encoded_picture').setValue(null);
    this._imageService
      .encodeImage(event.target.files[0] as File)
      .pipe(
        tap((results) => {
          this.editBikeForm.get('encoded_picture').setValue(results);
        })
      )
      .subscribe();
  }
}
