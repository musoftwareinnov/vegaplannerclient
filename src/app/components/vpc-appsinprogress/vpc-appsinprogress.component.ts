import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VpcAppsinprogressDataSource } from './vpc-appsinprogress-datasource';
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
  dataSource: VpcAppsinprogressDataSource;

  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE,
    stateStatus: {},
    planningAppType: ""
  };
  interval: any = {};

  stateStatuses: StateStatus[] = [];

  loginStatus = false
  startDate = new Date();
  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'status', 'state', 'dueBy'];

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
    this.dataSource = new VpcAppsinprogressDataSource(this.paginator, this.sort);
    this.loadStatuses();
    this.refreshData();


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

  ngOnDestroy() {   //Stop the planning service being called when user logs off
    console.warn("DESTROY CALLED")
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
