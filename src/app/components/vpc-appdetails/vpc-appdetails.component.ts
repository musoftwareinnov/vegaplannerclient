import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ChangePlanningAppState, SavePlanningNotes, PlanningApp } from 'src/app/models/planningapp';
import { StateAction } from 'src/app/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';
import { DrawingService } from 'src/app/services/drawing.service';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { AuthGuard } from 'src/app/auth.guard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vpc-appdetails',
  templateUrl: './vpc-appdetails.component.html',
  styleUrls: ['./vpc-appdetails.component.css']
})
export class VpcAppdetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  private readonly COMPLETE = 'Complete';
  vehicleId: number = 0; 
  drawings: any[] = [];
  progress: any;

  savePlanningApp: ChangePlanningAppState = {
    id: 0,
    method: StateAction.Prev  //default to next state

  };

  plannningNotes: SavePlanningNotes = {
    id:0,
    notes: ""
  };

  planningApp: PlanningApp = {
    id: 0,
    planningReferenceId: "",
    // customerId: 0,
    customer: {
      id: 0, 
      firstName: "",
      lastName: "",
      addressLine1: "",
      city: "",
      county: "",
      postcode: "",
      emailAddress: "",
      telephoneHome: "",
      telephoneMobile:"",
      telephoneWork:"",
      notes: "",
    },
    developer: {
      firstName: "",
      lastName: "",
      fullName: "",
      companyName: "",
      emailAddress: "",
      telephoneMobile:"",
      telephoneWork:"",
    },
    developmentAddress: {
      CompanyName: "",
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      geoLocation: ""
     },
    name: "",
    businessDate: "",
    planningStatus:  "",
    currentStateStatus: "",
    currentState:  "",
    expectedStateCompletionDate:  "",
    nextState:  "",
    councilPlanningAppId: "",
    completionDate:  "",
    generator: "",
    notes: "",
    planningAppStates: [],
    method: 1
  };

  interval: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private toastrService: ToastrService,
    private progressService: ProgressService,
    private drawingServices: DrawingService,
    private planningAppService: PlanningAppService,
    private authGuard:AuthGuard) { 

      authGuard.canActivate();
      route.params.subscribe(p => { this.planningApp.id = +p['id'] || 0});  

    }
  
      //For state table
      displayedStateColumns = 
      ['iconStatus', 
      'stateName',
      'dueByDate', 
      'dateCompleted', 
      'stateStatus', 
      'edit',
      'nextState'];
    
  ngOnInit() {
    // this.drawingServices.getDrawings(this.planningApp.id)
    //   .subscribe(drawings => this.drawings = drawings);

    this.planningAppService.getPlanningApp(this.planningApp.id)
    .subscribe(
      v => this.planningApp = v,
      err => {
        if (err.status == 404) {
          this.router.navigate(['/appsinprogress']);
          return; 
        }  
        else if (err.status == 401){ 
          console.warn("error status => "  + err.status);
          this.router.navigate(['/login']);
          return;        
        }
    });
  }

  refreshData() {
    this.populatePlanningAppSummary();
  }

  private populatePlanningAppSummary() {
    this.planningAppService.getPlanningApp(this.planningApp.id)
    .subscribe(
      v => this.planningApp = v,
      err => {
        if (err.status == 404) {
          this.router.navigate(['/appsinprogress']);
          return; 
        }
    });
  }

  nextState() {
    this.savePlanningApp.id = this.planningApp.id;

    //Check conditions have been set before saving
    
    var result = this.planningAppService.nextState(this.savePlanningApp )

    if(this.planningApp.nextState == null)
        this.planningApp.nextState = this.COMPLETE;

    result.subscribe(

        planningApp => {
          this.toastrService.success('New State:' + this.planningApp.nextState, 'Success');
          { this.refreshData() }   
          this.router.navigate(['/planningapps/', this.planningApp.id])
        },

        error => {  
          this.toastrService.error('Please enter mandatory fields in state requirements tab', 'Error');
        },  
        );
  }

  submit() {
    var result$ = this.planningAppService.saveDevelopmentDetails(this.planningApp )
    result$.subscribe(
      planningApp => {
        this.toastrService.success('Planning Details updated ', 'Success');
      });
  }
  
  archive() {
    if (confirm("Archiving Not Installed, extra module")) {
        
    }
  }

  terminate() {
    if (confirm("Confirm : Terminate Planning App")) {
      this.savePlanningApp.id = this.planningApp.id;
      var result$ = this.planningAppService.terminate(this.savePlanningApp )
  
      if(this.planningApp.nextState == null)
          this.planningApp.nextState = this.COMPLETE;
  
      result$.subscribe(
          planningApp => {
            this.toastrService.success('Planning App : ' + this.planningApp.id + " Terminated", 'Success');   
            this.router.navigate(['/appsdetails/', this.planningApp.id])
          });
    }
  }

  uploadDrawings() {

    if(this.fileInput) {
      var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

      if(nativeElement.files != null)
      {
        console.warn(this.fileInput)
        this.progressService.startTracking()
          .subscribe(progress => {
            console.log(progress);
            this.zone.run(() => {
              this.progress = progress;
            });
          },
          undefined,
          () => { this.progress = null });

        this.drawingServices.upload(this.planningApp.id, nativeElement.files[0])
          .subscribe(drawings => {
              this.drawings.push(drawings)
          });
      }
    }
  }

  //Expansion Panel GUI functions
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
