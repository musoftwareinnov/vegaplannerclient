import { Component, ViewContainerRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  })
export class AppComponent {
  title = 'Vega Planner Client';

  constructor(private toastrService: ToastrService) {
    this.showSuccess() 
  }
  
  showSuccess() {
    //this.toastrService.success('Planning App Saved', 'Success');
    // this.toastrService.info('Hello world!', 'Toastr fun!');
    // this.toastrService.error('Hello world!', 'Toastr fun!');
    // this.toastrService.warning('Hello world!', 'Toastr fun!');
  }
}
