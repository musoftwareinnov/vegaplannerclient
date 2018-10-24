import { Component, OnInit } from '@angular/core';
import { StateStatus } from 'src/app/models/statestatus';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { StateStatusService } from 'src/app/services/statestatus.service';
import { AuthGuard } from 'src/app/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-vpc-appscompleted',
  templateUrl: './vpc-appscompleted.component.html',
  styleUrls: ['./vpc-appscompleted.component.css']
})
export class VpcAppscompletedComponent implements OnInit {
  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE,
    stateStatus: {},
    planningAppType: "Not InProgress"
  };
  interval: any = {};

  stateStatuses: StateStatus[] = [];
  //For table
  displayedColumns = ['iconStatus', 
                      'id', 
                      'name', 
                      'description', 
                      'status', 
                      'completionDate', 
                      'edit'];
                      
  constructor(private PlanningAppService: PlanningAppService,
              private StateStatusService: StateStatusService,
              private toastrService: ToastrService,
              private authGuard:AuthGuard) { 
                  authGuard.canActivate();
              }

  ngOnInit() {
    // this.toastyService.wait({
    //   title: 'Initialising', 
    //   msg: 'Loading Applications.....',
    //   theme: 'bootstrap',
    //   showClose: false,
    //   timeout: 2000
    // });
    this.populatePlanningAppSummary();
    this.loadStatuses();
    // this.refreshData();
    // this.interval = setInterval(() => { 
    //     this.refreshData(); 
    // }, 5000);
  }

  refreshData() {
    this.populatePlanningAppSummary();
  }

  private loadStatuses() {
    this.StateStatusService.getStateStatuses("Not InProgress")
      .subscribe(result => this.stateStatuses = result);
  }

  private populatePlanningAppSummary() {
    this.PlanningAppService.getPlanningAppSummary(this.query)
      .subscribe(result => this.queryResult = result);
  }

  onPageChange(page:any) {
    this.query.page = page; 
    this.populatePlanningAppSummary();
  }

  onStateFilterChange() {
    console.info("PlanningAppCompletedComponent: Type Change = " + this.query.planningAppType);
    this.populatePlanningAppSummary();
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;
    this.populatePlanningAppSummary() ;

    return event;
  }
}
