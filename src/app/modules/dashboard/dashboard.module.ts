import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './GenericComponents/dashboard.component';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule
  ]
})
export class DashboardModule { }
