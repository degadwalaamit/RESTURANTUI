import { Component } from '@angular/core';
import { SharedService } from 'src/app/common-imports/webservices';

@Component({
  selector: 'app-long-text-description',
  templateUrl: './long-text-description.component.html'
})
export class LongTextDescriptionComponent {  
  constructor(public sharedService : SharedService) {    
  }
}