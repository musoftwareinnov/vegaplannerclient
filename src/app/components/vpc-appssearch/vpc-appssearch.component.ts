
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { StateStatus } from './../../models/statestatus';
import { PlanningAppService } from '../../services/planningapp.service';
import { AuthGuard } from 'src/app/auth.guard';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-vpc-appssearch',
  templateUrl: './vpc-appssearch.component.html',
  styleUrls: ['./vpc-appssearch.component.css']
})
export class VpcAppssearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE,
    searchCriteria: true,
    sortBy: "customerReferenceId",
    planningReferenceId: "",
  };

  interval: any = {};

  selectedValue: string;
  loginStatus = false
  startDate = new Date();

  pageEvent: PageEvent;

  // date = new FormControl(new Date());
  // serializedDate = new FormControl((new Date()).toISOString());

  //For table
  displayedColumns = ['iconStatus', 
                      'planningReferenceId',
                      'name', 
                      'descriptionOfWork', 
                      'status', 
                      'state', 
                      'dueBy', 
                      'planningAppId', 
                      'completionDate', 
                      'edit'];

  constructor(private PlanningAppService: PlanningAppService,
      private authGuard:AuthGuard,
      private userService: UserService) {
      authGuard.canActivate();
     }

  ngOnInit() {

    //Setup default search criteria
    this.query.searchCriteria = true;
    this.query.sortBy="planningReferenceId";
    this.query.isSortAscending=false;
    this.populatePlanningAppSummary()
  }

  private populatePlanningAppSummary() {
    this.PlanningAppService.getPlanningAppSummary(this.query)
      .subscribe(result => this.queryResult = result);
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    console.log(sort.active);
    this.query.sortBy=sort.active;
    if(sort.direction === 'asc') 
      this.query.isSortAscending=true;
    else 
      this.query.isSortAscending=false;    
    
    this.populatePlanningAppSummary(); 
  }

  onPageChange(page:any) {
    this.query.page = page; 
    this.populatePlanningAppSummary();
  }

  onSearchChange(searchValue : string ) {;
    this.query.searchCriteria = true;
    this.query.planningReferenceId = searchValue;

    console.log(this.query);
    this.PlanningAppService.getPlanningAppSummary(this.query)
      .subscribe(result => this.queryResult = result);
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;
    this.populatePlanningAppSummary() ;

    return event;
  }
}


