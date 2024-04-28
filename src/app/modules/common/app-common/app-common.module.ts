import { InsertionDirective } from './insertion.directive';
import { ExternalSharedModule } from './../../../external-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DragableElementDirective } from './dragable-element.directive';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { OrderModule } from 'ngx-order-pipe';
import { HandleEuroPercentageSelection } from 'src/app/directives/HandleEuroPercentageSelection.directive';
import { HandleFloatingNumberFields } from 'src/app/directives/HandleFloatingNumberFields.directive';
import { HandleNegativeFloatingNumberFields } from 'src/app/directives/handleNegativeFloatingNumberFields.directive';
import { HandleNumberFields } from 'src/app/directives/HandleNumberFields.directive';
import { HandlePercentageField } from 'src/app/directives/HandlePercentageField.directive';
import { EqualValidator } from 'src/app/directives/PasswordvalidateEqual.directive';
import { CallbackPipe } from 'src/app/pipe/callbackpipe';
import { PoundPipe } from 'src/app/pipe/poundPipe';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { LoaderComponent } from '../app-loader/loader.component';
import { AppSidemenuComponent } from '../app-sidemenu/app-sidemenu.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { NoDataFoundComponent } from '../no-data-found/no-data-found.component';
import { ViewMessageComponent } from '../view-message/view-message.component';
import { AuthShowBlockDirective } from './auth-show-block.directive';
import { AuthShowDirective } from './auth-show.directive';
import { DisableButtonDirective } from './button-disable.directive';
import { ValidateDateDirective } from './generic-form/validate-date.directive';
import { NoAutoCompleteDirective } from './no-autocomplete.directive';
import { PreventSpaceDirective } from './prevent-space.directive';
import { PreviewFileComponent } from './preview-file/preview-file.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';
import { GridModule } from '../grid/grid.module';
import { PreviewUploadedDocumentListComponent } from './preview-uploaded-document-list/preview-uploaded-document-list.component';
import { LongTextDescriptionComponent } from './long-text-description/long-text-description.component';

@NgModule({
  declarations: [GenericFormComponent, InsertionDirective, DragableElementDirective,
    AppHeaderComponent,
    AppSidemenuComponent,
    AppFooterComponent,
    ViewMessageComponent,
    EqualValidator,
    AuthShowDirective,
    AuthShowBlockDirective,
    LoaderComponent,
    CallbackPipe,
    PoundPipe,
    NoDataFoundComponent,
    DisableButtonDirective,
    PreventSpaceDirective,
    NoAutoCompleteDirective,
    ValidateDateDirective,
    DateFilterComponent,
    HandleFloatingNumberFields,
    HandleEuroPercentageSelection,
    HandleNegativeFloatingNumberFields,
    HandlePercentageField,
    HandleNumberFields,
    PreviewFileComponent,
    PreviewUploadedDocumentListComponent,
    LongTextDescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderModule,
    ExternalSharedModule,
    TranslateModule,
    AngularEditorModule,
    GridModule, // this module is needed because in SendEmailComponent it is used, otherwise it will give build error
    ToastrModule.forRoot(),
    AgGridModule.withComponents([DateFilterComponent]),
    ReactiveFormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ConfirmationModalModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [GenericFormComponent, DragableElementDirective,
    CallbackPipe,
    PoundPipe,
    AppHeaderComponent,
    AppSidemenuComponent,
    AppFooterComponent,
    ViewMessageComponent,
    EqualValidator,
    AuthShowDirective,
    AuthShowBlockDirective,
    LoaderComponent,
    NoDataFoundComponent,
    DisableButtonDirective,
    PreventSpaceDirective,
    NoAutoCompleteDirective,
    ValidateDateDirective,
    DateFilterComponent,
    HandleFloatingNumberFields,
    HandleEuroPercentageSelection,
    HandleNegativeFloatingNumberFields,
    HandlePercentageField,
    HandleNumberFields,
    PreviewFileComponent,
    OrderModule,
    PreviewUploadedDocumentListComponent,
    LongTextDescriptionComponent
  ],
  providers: [CallbackPipe, PoundPipe, OrderModule, PreviewFileComponent],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCommonModule { }
