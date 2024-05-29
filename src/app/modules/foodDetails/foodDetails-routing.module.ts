import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodDetails } from './GenericComponents/foodDetails.component';

const routes: Routes = [
  { path: '', component: FoodDetails}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodDetailsRoutingModule { }
