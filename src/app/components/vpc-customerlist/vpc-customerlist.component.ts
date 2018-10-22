import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthGuard } from '../../auth.guard';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';

@Component({
  selector: 'app-vpc-customerlist',
  templateUrl: './vpc-customerlist.component.html',
  styleUrls: ['./vpc-customerlist.component.css']
})

export class VpcCustomerlistComponent implements OnInit {
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

  //For table
  displayedColumns = ['fullName', 
                      'customerAddressSummary', 
                      'emailAddress', 
                      'telephoneHome', 
                      'telephoneMobile',
                      'edit',
                      'planningAppsCount'];


  constructor(private customerService: CustomerService,
    private authGuard:AuthGuard) {
    authGuard.canActivate();
  }

  applyFilter(filterValue: string) {
    console.log("Filter:" + filterValue.trim().toLowerCase());
    this.onSearchChange(filterValue.trim()); //.toLowerCase());
  }

  ngOnInit() {
    this.populateCustomers();
  }
  
  onSearchChange(searchValue : string ) {;
    this.query.searchCriteria = searchValue;
    this.customerService.getCustomers(this.query)
    .subscribe(result => this.queryResult = result);
  }
  
  private populateCustomers() {
    this.customerService.getCustomers(this.query)
    .subscribe(result => this.queryResult = result);
  }
  
  onPageChange(page:any) {
    this.query.page = page; 
    this.populateCustomers();  
  }
  
  onFilterChange() {
    this.query.page = 1; 
    this.populateCustomers();
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;

    this.populateCustomers() ;

    return event;
  }
}
