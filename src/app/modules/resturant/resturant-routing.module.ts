import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResturantComponent } from './resturant/resturant.component';
import { AddResturantComponent } from './add-resturant/add-resturant.component';
// import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: ResturantComponent
  },
  {
    path: 'add-resturant', component: AddResturantComponent
  },
  {
    path: 'edit-resturant/:resturantId', component: AddResturantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResturantRoutingModule { }
