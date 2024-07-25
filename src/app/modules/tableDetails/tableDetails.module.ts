import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDetailsRoutingModule } from './tableDetails-routing.module';
import { TableDetails } from './GenericComponents/tableDetails.component';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
import { CustomMenuComponent } from './custommenu/custommenu.component';
import { CustomMenuParentComponent } from './custommenuparent/custommenuparent.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalModule } from '../common/confirmation-modal/confirmation-modal.module';
@NgModule({
  declarations: [TableDetails, CustomMenuParentComponent, CustomMenuComponent],
  imports: [
    CommonModule,
    TableDetailsRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule,
    FormsModule,
    ConfirmationModalModule
  ]
})
export class tableDetails { }
