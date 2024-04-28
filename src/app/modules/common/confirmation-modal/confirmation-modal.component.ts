import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styles: ['.confirmation-modal-up { z-index: 2050 !important;}']
})
export class ConfirmationModalComponent {
  @Input() title='Delete Confirmation';
  @Input() popupId='confirmationModal';
  @Input() message='Are you sure you want to delete?';
  @Input() cancelButtonTitle="Cancel";
  @Input() saveButtonTitle="Confirm";
  @Output() emitConfirmationEvent=new EventEmitter<any>();

  onConfirmButtonClick(){
    $('#'+this.popupId).modal('hide');
    this.emitConfirmationEvent.emit('Yes');
  }
  onCancelButtonClick(){
    $('#'+this.popupId).modal('hide');
    this.emitConfirmationEvent.emit('No');
  }
  ngOnDestroy(): void {
    if(this.popupId != ''){
      $('#'+this.popupId).modal('hide');
    }
  }
}
