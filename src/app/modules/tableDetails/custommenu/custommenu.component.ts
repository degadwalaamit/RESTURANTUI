import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/services/webservices/shared.service';
declare var $: any;
@Component({
  selector: 'app-custommenu',
  templateUrl: './custommenu.component.html',
  styleUrls: ['./custommenu.component.scss']
})
export class CustomMenuComponent implements OnInit, AfterViewInit {
  addUserSubscription: Subscription;
  spycyOption = '';
  // @Input() currentSelectedObject: MenuItemMasterModel;
  selectedIndex = 0;
  constructor(public sharedService: SharedService) {
  }

  ngOnInit() {
  }

  initSubscription(): void {
  }


  ngAfterViewInit() {
  }

  counter(i: number) {
    return new Array(i);
  }
}
