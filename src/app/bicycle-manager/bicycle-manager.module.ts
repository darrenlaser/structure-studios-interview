import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleListComponent } from './bicycle-list/bicycle-list.component';
import { EditBicycleComponent } from './edit-bicycle/edit-bicycle.component';
import { RemoveBicycleComponent } from './remove-bicycle/remove-bicycle.component';
import { AddBicycleComponent } from './add-bicycle/add-bicycle.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from '../weather/weather.component';
import { BicycleManagerRoutingModule } from './bicycle-manager-routing.module';
import { BicycleManagerComponent } from './bicycle-manager/bicycle-manager.component';

@NgModule({
  declarations: [
    BicycleListComponent,
    EditBicycleComponent,
    RemoveBicycleComponent,
    AddBicycleComponent,
    WeatherComponent,
    BicycleManagerComponent,
  ],
  imports: [CommonModule, BicycleManagerRoutingModule, HttpClientModule],
})
export class BicycleManagerModule {}
