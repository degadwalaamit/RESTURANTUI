import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {
  @Output() previewFileEvent:EventEmitter<any> = new EventEmitter()
  @Input() fileData;
  @Input() isViewDocument=false;
  @Input() FileviewId='FileView'
  constructor() { }

  ngOnInit() {
  }

  onCloseDocumentViewPopup() {
    $('#'+this.FileviewId).modal('hide');
    this.previewFileEvent.emit(false);
  }

}
