import { NgModule } from '@angular/core';
import { BicycleListComponent } from './bicycle-list/bicycle-list.component';
import { locationResolver } from '../resolvers/location/location.resolver';
import { AddBicycleComponent } from './add-bicycle/add-bicycle.component';
import { EditBicycleComponent } from './edit-bicycle/edit-bicycle.component';
import { RouterModule, Routes } from '@angular/router';
import { BicycleManagerComponent } from './bicycle-manager/bicycle-manager.component';

const routes: Routes = [
  {
    path: 'bicycles',
    component: BicycleManagerComponent,
    children: [
      {
        path: 'inventory',
        component: BicycleListComponent,
        resolve: { location: locationResolver },
      },
      {
        path: 'inventory/add',
        component: AddBicycleComponent,
      },
      {
        path: 'inventory/:id',
        component: EditBicycleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicycleManagerRoutingModule {}
