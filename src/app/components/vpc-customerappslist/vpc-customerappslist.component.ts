import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthGuard } from 'src/app/auth.guard';
import { StateStatus } from 'src/app/models/statestatus';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { StateStatusService } from 'src/app/services/statestatus.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-vpc-customerappslist',
  templateUrl: './vpc-customerappslist.component.html',
  styleUrls: ['./vpc-customerappslist.component.css']
})
export class VpcCustomerappslistComponent implements OnInit {
  //Query Results
  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE,
    customerId: 0,
    planningAppType: "All"    //Get all applications for customer
  };
  interval: any = {};
  statusSelected: string = "";
  planningStatus: string[] = [];
  customer: any = {};
  
  stateStatuses: StateStatus[] = [];

  //For table
  pageEvent: PageEvent;
  displayedColumns = ['iconStatus', 
                      'id', 'name', 
                      'description', 
                      'status', 
                      'state', 
                      'dueBy', 
                      'planningAppId', 
                      'completionDate', 
                      'edit'];


  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private PlanningAppService: PlanningAppService,
  private StateStatusService: StateStatusService,
  private CustomerService: CustomerService,
  private authGuard:AuthGuard) {

    authGuard.canActivate();
   
    route.params.subscribe(p => { this.query.customerId = +p['id'] || 0})
  }

  ngOnInit() {

    //Add status list drop down (may bring from server)
    this.loadStatuses()
    this.populatePlanningAppSummary();
    this.populateCustomer();
    this.refreshData();
    // this.interval = setInterval(() => { 
    //     this.refreshData(); 
    // }, 10000);
  }

  refreshData() {
    this.populatePlanningAppSummary();
  }

  private loadStatuses() {
    this.StateStatusService.getStateStatuses("All")
      .subscribe(result => this.stateStatuses = result);
  }

  private populatePlanningAppSummary() {
    this.PlanningAppService.getPlanningAppSummary(this.query)
      .subscribe(result => this.queryResult = result);
  }

  private populateCustomer() {
    this.CustomerService.getCustomer(this.query.customerId)
      .subscribe(result => this.customer = result);
  }

  onPageChange(page:any) {
    this.query.page = page; 
    this.populatePlanningAppSummary();
  }

  onStateFilterChange() {
    console.warn("state = " + this.query.planningAppType);
    this.populatePlanningAppSummary();
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;
    this.populatePlanningAppSummary() ;

    return event;
  }
}