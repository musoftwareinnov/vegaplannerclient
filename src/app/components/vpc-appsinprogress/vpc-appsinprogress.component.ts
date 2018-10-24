import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';

import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { StateStatusService } from './../../services/statestatus.service';
import { StateStatus } from './../../models/statestatus';
import { PlanningAppService } from '../../services/planningapp.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-vpc-appsinprogress',
  templateUrl: './vpc-appsinprogress.component.html',
  styleUrls: ['./vpc-appsinprogress.component.css']
})
export class VpcAppsinprogressComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE,
    stateStatus: {},
    planningAppType: ""
  };
  interval: any = {};

  stateStatuses: StateStatus[] = [];

  selectedValue: string;
  loginStatus = false
  startDate = new Date();
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  //For table
  displayedColumns = ['iconStatus', 
                      'id',
                      'name', 
                      'description', 
                      'status', 
                      'state', 
                      'dueBy', 
                      'planningAppId', 
                      'completionDate', 
                      'edit'];


  applyFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private PlanningAppService: PlanningAppService,
      private StateStatusService: StateStatusService,
      private authGuard:AuthGuard,
      private userService: UserService) {
      authGuard.canActivate();
     }

  ngOnInit() {
    this.loadStatuses();
    this.refreshData();
    // this.interval = setInterval(() => { 
    //     this.refreshData(); 
    // }, 5000);

    console.log(this.userService.getUwt());
  }

  refreshData() {
    console.info("PlanningAppListComponent: Heartbeat");
    this.populatePlanningAppSummary();

    console.info(this.queryResult);
  }

  private loadStatuses() {
    this.StateStatusService.getStateStatuses("InProgress")
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
    console.info("PlanningAppListComponent: Type Change = " + this.query.planningAppType);
    this.populatePlanningAppSummary();
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;
    this.populatePlanningAppSummary() ;

    return event;
  }
}
