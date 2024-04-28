import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
import { GridModule } from '../common/grid/grid.module';
import { ConfirmationModalModule } from '../common/confirmation-modal/confirmation-modal.module';
import { ResturantRoutingModule } from './resturant-routing.module';
import { ResturantComponent } from './resturant/resturant.component';
import { AddResturantComponent } from './add-resturant/add-resturant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ResturantComponent, AddResturantComponent],
  imports: [
    CommonModule,
    GridModule,
    ConfirmationModalModule,
    ResturantRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule
  ]
})
export class ResturantModule { }
