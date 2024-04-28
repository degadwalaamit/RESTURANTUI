import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridData } from '../../grid/models/grid-data.model';

@Component({
  selector: 'app-preview-uploaded-document-list',
  templateUrl: './preview-uploaded-document-list.component.html'
})
export class PreviewUploadedDocumentListComponent  {

  @Output() actionEvents = new EventEmitter();
  @Input() GridData : GridData;
  constructor() { }

  emitAction(action,row){
    this.actionEvents.emit({
      Action:action,
      Row:row
    });
  }
}
