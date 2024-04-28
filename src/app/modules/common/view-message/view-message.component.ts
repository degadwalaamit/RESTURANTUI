import { Component,ChangeDetectorRef, DoCheck } from '@angular/core';
import { MessageType } from '../../../enums/message-type.enum';
import { Message } from '../../../models/message.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html'
})
export class ViewMessageComponent implements DoCheck {

  isShow = false;
  msgModel = {} as Message;
  isDisplay: boolean;
  msg: any = '';
  constructor(private translate: TranslateService, private ref: ChangeDetectorRef) { }

  ngDoCheck() {
    if (this.isDisplay && this.msg !== '' && this.isShow) {
      this.msgModel.Message = this.translate.instant(this.msg);
    }
  }


  displayMsg(type, msg) {
    this.isDisplay = true;
    this.msg = msg;
    if (type && msg) {
      this.isShow = true;
      this.msgModel.Message = this.translate.instant(msg);
      setTimeout(() => {
        this.removeMsg();
      }, 5000);

      this.msgModel.Class = type === MessageType.Error ? 'col-12 bg-danger errorMsgBox shadow'
        : 'col-12 bg-success errorMsgBox shadow';
    }
  }

  removeMsg() {
    if (this.msgModel && this.isShow) {
      this.msgModel.Message = '';
      this.isShow = false;
      this.msgModel.Class = 'd-none';
    }
  }

}
