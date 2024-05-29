import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDetailsRoutingModule } from './tableDetails-routing.module';
import { TableDetails } from './GenericComponents/tableDetails.component';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
@NgModule({
  declarations: [TableDetails],
  imports: [
    CommonModule,
    TableDetailsRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule
  ]
})
export class tableDetails { }
