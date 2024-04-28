import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { SharedService } from 'src/app/common-imports/webservices';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit ,OnChanges{
  @Input() loading: string;
  @Input() absoluteLoading: boolean = false;
  constructor(private broadcaster: NgBroadcasterService,public sharedService:SharedService) { }

    ngOnInit() {

      if(this.loading){
        this.broadcaster.emitEvent('showLoader',this.loading);
        }
  }

  ngOnChanges()
  {
    if(!this.loading){
      this.broadcaster.emitEvent('hideLoader',this.loading);
      }
      else{
        this.broadcaster.emitEvent('showLoader',this.loading);
      }
  }

}
