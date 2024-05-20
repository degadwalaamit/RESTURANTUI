import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableDetails } from './GenericComponents/tableDetails.component';

const routes: Routes = [
  { path: '', component: TableDetails}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableDetailsRoutingModule { }
