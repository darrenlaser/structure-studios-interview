import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-add-bicycle',
  templateUrl: './add-bicycle.component.html',
  styleUrls: ['./add-bicycle.component.scss'],
})
export class AddBicycleComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  addBikeForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _bikeService: BikeService,
    private _imageService: ImageService
  ) {}

  get displayImagePreview() {
    return this.addBikeForm.get('encoded_picture').value ?? false;
  }

  ngOnInit(): void {
    this.addBikeForm = this._formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      encoded_picture: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addBikeForm.valid) {
      this._bikeService.addBikesSubject.next(this.addBikeForm.value as Bike);
      this.addBikeForm.reset();
      this.fileInput.nativeElement.value = '';
    }
  }

  cancel() {
    this._router.navigate([`/bicycles/inventory`]);
  }

  createImagePreview(event: any) {
    this.addBikeForm.get('encoded_picture').setValue(null);
    this._imageService
      .encodeImage(event.target.files[0] as File)
      .pipe(
        tap((results) => {
          this.addBikeForm.get('encoded_picture').setValue(results);
        })
      )
      .subscribe();
  }
}
