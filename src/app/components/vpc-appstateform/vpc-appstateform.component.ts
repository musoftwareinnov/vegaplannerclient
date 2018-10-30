import { Component, OnInit } from '@angular/core';
import { PlanningAppState } from 'src/app/models/planningappstate';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningAppStateService } from 'src/app/services/planninappstate.service';
import { AuthGuard } from 'src/app/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vpc-appstateform',
  templateUrl: './vpc-appstateform.component.html',
  styleUrls: ['./vpc-appstateform.component.css']
})
export class VpcAppstateformComponent implements OnInit {
  planningAppState: PlanningAppState = {
    id: 0, 
    stateName: "",
    dueByDate: "",
    dateCompleted: "",
    stateStatus: "",
    currentState: false,
    minDueByDate: "",
    dueByDateEditable: false,
    planningAppStateCustomFieldsResource: [],
    isCustomDuration: false,
    mandatoryFieldsSet: false,
    planningAppId: "",
    notes: "",
  };
planningAppId: number = 0;

updatedDueByDate: Date = new Date();
calMinDate: Date = new Date();
updateNotes: string = ""

calDueByDate = new FormControl(new Date());
 
sub: any = "";

events: any[];

 private opened: boolean = false;

 private conditionList: string[] = [ "planningAppId", "BRR Dates" ]

 private conList: { conditionName:any, conditionValue: any } [];


 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private planningAppStateService: PlanningAppStateService,
    // private adapter: DateAdapter<any>,
    private authGuard:AuthGuard) { 
        authGuard.canActivate();    
        route.params.subscribe(p => { this.planningAppState.id = +p['id'] || 0})  
        this.conList = [ {conditionName: "planningAppId", conditionValue: ""}, {conditionName: "Build Regs Date1", conditionValue: ""} ]

    }
  
  ngOnInit() {
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      this.planningAppId = +params['planningAppId'] || 0;
    });

    if (this.planningAppState.id)
        this.planningAppStateService.getPlanningAppState(this.planningAppState.id)
        .subscribe(
          planningAppState => { 
              this.planningAppState = planningAppState;
              this.calMinDate = this.getMinDate();  //Format the date for the mat calendar
              this.calDueByDate.setValue(this.getDueByDate());
              this.updatedDueByDate = this.getDueByDate();
             },
          err => {
            if (err.status == 404) {
              this.router.navigate(['/planningappstate/', this.planningAppState.id]);
              return; 
            }
  
        });
  }
  
  dateFilter() { 
     //Ignore weekends
     return (date: Date) => date.getDay() != 0 && date.getDay() != 6;
  }
  
  public endDateChange(event): void {
    console.log("Update date = " + this.updatedDueByDate)
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.planningAppState.dueByDate = moment(this.calDueByDate.value ).format('DD-MM-YYYY');
  }
  
  submit() {
    var result$ = this.planningAppStateService.updatePlanningAppState(this.planningAppState); 
    result$.subscribe(
      planningAppState => {
        this.toastrService.success('State Details Update ', 'Success');
    });
  }

  close() {
    this.router.navigate(['/planningapps/'+ this.planningAppId ]);
  }
  
  
  saveRules() {


    // var result$ = this.planningAppStateService.updatePlanningAppState(this.planningAppState); 
  
    // result$.subscribe(
    //   planningAppState => {
    //   this.toastyService.success({
    //     title: 'Success', 
    //     msg: 'Planning App State was sucessfully saved.',
    //     theme: 'bootstrap',
    //     showClose: true,
    //     timeout: 5000
    //   })
  
      //this.router.navigate(['/planningapps']);
    //});
  }
  
  getDate(): number {
    return (this.updatedDueByDate && this.updatedDueByDate.getTime()) || new Date().getTime();
  }

  genDateFromString(strDate: string): Date {
    var dateParts = strDate.split("-");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
  
  getDueByDate(): Date {
    var dateParts = this.planningAppState.dueByDate.split("-");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
  
  getMinDate(): Date {
    var dateParts = this.planningAppState.minDueByDate.split("-");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
  today(): void {
  this.updatedDueByDate = new Date();
  }


}
