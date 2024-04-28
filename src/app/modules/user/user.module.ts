import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ExternalSharedModule } from 'src/app/external-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/app-common/app-common.module';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { GridModule } from '../common/grid/grid.module';
import { ConfirmationModalModule } from '../common/confirmation-modal/confirmation-modal.module';
@NgModule({
  declarations: [UserComponent, AddUserComponent],
  imports: [
    CommonModule,
    GridModule,
    ConfirmationModalModule,
    UserRoutingModule,
    TranslateModule,
    ExternalSharedModule,
    AppCommonModule
  ]
})
export class UserModule { }
