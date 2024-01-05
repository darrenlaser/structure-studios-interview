import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bicycle',
  templateUrl: './add-bicycle.component.html',
  styleUrls: ['./add-bicycle.component.scss'],
})
export class AddBicycleComponent {
  constructor(private _router: Router) {}

  cancel() {
    this._router.navigate([`/bicycles/inventory`]);
  }
}
