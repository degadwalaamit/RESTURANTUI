import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/services/webservices/shared.service';
@Component({
  selector: 'app-custommenuparent',
  templateUrl: './custommenuparent.component.html',
  styleUrls: ['./custommenuparent.component.scss']
})
export class CustomMenuParentComponent implements OnInit, AfterViewInit {
  addUserSubscription: Subscription;
  spycyOption = '';
  selectedIndex = 0;
  constructor(public sharedService: SharedService){
  }

  ngOnInit() {
    
  }

  initSubscription(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

  ngAfterViewInit() {
  }

  addQty(item) {
    item.quantity = item.quantity + 1;
  }

  minusQty(item) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
    }
  }
}
