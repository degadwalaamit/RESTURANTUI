import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDetailsRoutingModule } from './foodDetails-routing.module';
import { FoodDetails } from './GenericComponents/foodDetails.component';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
@NgModule({
  declarations: [FoodDetails],
  imports: [
    CommonModule,
    FoodDetailsRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule
  ]
})
export class foodDetails { }
