import { DescriptionOfWork } from './../../models/descriptionofwork';
import { DescriptionOfWorkService } from './../../services/descriptionofwork.service';
import { Component, OnInit } from '@angular/core';
import { PlanningAppGenerator } from 'src/app/models/planningapp';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-vpc-appsnew',
  templateUrl: './vpc-appsnew.component.html',
  styleUrls: ['./vpc-appsnew.component.css']
})
export class VpcAppsnewComponent implements OnInit {
  query: any = {
    pageSize: 0
  };
  customerSelect:any[] = [];
  userSelect:any[] = [];
  stateGeneratorSelect:any[] = [];
  queryResult: any = {};
  queryGeneratorResult: any = {};
  descriptionOfWorkResult: any = {};
  newAppForm: FormGroup;
  submitted = false;


  generator: PlanningAppGenerator = {
    customerId: 0,
    stateInitialiserId: 0,
    name: '',
    descriptionOfWork: '',
    developer: {
      companyName: "",
      firstName: "",
      lastName: "",
      fullName: "",
      emailAddress: "",
      telephoneMobile:"",
      telephoneWork:""
    },
    developmentAddress: {
      CompanyName: "",
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      geoLocation: "",
    },
    surveyors: [],
    drawers: [],
  }

  constructor(
              private formBuilder: FormBuilder,
              private PlanningAppService: PlanningAppService,
              private toastrService: ToastrService,
              private customerService: CustomerService,
              private userService: UserService,
              private stateInitialiserService: StateInitialiserService,
              private descriptionOfWorkService: DescriptionOfWorkService,
              private router: Router,
              private authGuard:AuthGuard) {
                  authGuard.canActivate();
              }

  ngOnInit() {
    //TODO: Join merge for performance???

    this.customerService.getCustomers(this.query)
      .subscribe(result => this.queryResult = result);

    this.descriptionOfWorkService.getDescriptionsofwork()
      .subscribe(result => this.descriptionOfWorkResult = result);

    this.stateInitialiserService.getStateInitialiserList(this.query)
      .subscribe(result => this.queryGeneratorResult = result);

    this.userService.getUserNames()
      .subscribe(result => this.userSelect = result);     

    this.newAppForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);
  }

  // convenience getter for easy access to form fields
  get f() { return this.newAppForm.controls; }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {

    var form = formBuilder.group({
      customer:              new FormControl(null).setValidators([Validators.min(1)]),
      generator:             new FormControl(null),
      descriptionOfWork:     new FormControl(null),
      userSurveyorsMultiple: new FormControl(null),
      userDrawersMultiple:   new FormControl(null),
      notes:  ""
    });  

    form.controls['generator'].setValue(1, {onlySelf: true});
    return form;
  }

  onGeneratorChange(){

  }
  
  onSubmit() {  

    this.generator.stateInitialiserId = this.newAppForm.controls['generator'].value;
    this.generator.customerId = this.newAppForm.controls['customer'].value;
    this.generator.name = this.newAppForm.controls['notes'].value;
    this.generator.descriptionOfWork = this.newAppForm.controls['descriptionOfWork'].value;
    this.generator.surveyors = this.newAppForm.controls['userSurveyorsMultiple'].value;
    this.generator.drawers = this.newAppForm.controls['userDrawersMultiple'].value;

    console.log("Desc of work: " + this.generator.descriptionOfWork);
    console.log("Surveyors: " +  this.generator.surveyors);   
    console.log("Drawers: " +  this.generator.drawers);   


    if(this.generator.customerId > 0) {
      this.PlanningAppService.generatePlanningApp(this.generator).subscribe(
      planningApp => {
        this.toastrService.success('Planning app sucessfully created', 'Success');
        this.router.navigate(['/planningapps/', planningApp.id])
      });
    }
    else {
      this.toastrService.error('Please specify customer', 'Error');
    }
  }
}
