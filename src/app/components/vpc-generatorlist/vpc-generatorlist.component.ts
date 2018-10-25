import { Component, OnInit } from '@angular/core';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { AuthGuard } from 'src/app/auth.guard';
import { PageEvent } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vpc-generatorlist',
  templateUrl: './vpc-generatorlist.component.html',
  styleUrls: ['./vpc-generatorlist.component.css']
})
export class VpcGeneratorlistComponent implements OnInit {
  private readonly PAGE_SIZE = 10; 
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE
  };

    //For table
  displayedColumns = [
    'name', 
    'description', 
    'generatorstatelink'
  ];

  constructor(private formBuilder: FormBuilder,
              private stateInitialiserService: StateInitialiserService,
              private authGuard:AuthGuard) { 
                authGuard.canActivate();
    }
  ngOnInit() {
    this.populateStateInitialisers();
  }

  private populateStateInitialisers() {
    this.stateInitialiserService.getStateInitialiserList(this.query)
      .subscribe(result => this.queryResult = result);
  }

  onPageChange(page:any) {
    this.query.page = page; 
    this.populateStateInitialisers();
  }

  onFilterChange() {
    this.query.page = 1; 
    this.populateStateInitialisers();
  }

  public getServerData(event?:PageEvent){

    this.query.page=event.pageIndex+1;
    this.query.pageSize=event.pageSize;

    this.populateStateInitialisers() ;

    return event;
  }
}
