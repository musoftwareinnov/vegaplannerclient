import { Component, OnInit } from '@angular/core';
import { StateInitialiserState } from 'src/app/models/stateinitialiserstate';
import { ActivatedRoute, Router } from '@angular/router';
import { StateInitialiserStateService } from 'src/app/services/stateinitialiserstate.service';
import { AuthGuard } from 'src/app/auth.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vpc-generatorstate',
  templateUrl: './vpc-generatorstate.component.html',
  styleUrls: ['./vpc-generatorstate.component.css']
})
export class VpcGeneratorstateComponent implements OnInit {

  stateInitialiserState: StateInitialiserState = {
    id: 0, 
    name: "",
    orderId: 0,
    completionTime: 2,
    alertToCompletionTime: 1,
    stateInitialiserId: 0,
    canDelete:true,
    stateInitialiserStateCustomFields: []
  };

  //For table
  displayedColumns = [
    'name', 
    'type', 
    'isPlanningAppField',
    'isMandatory'
  ];

  registerForm: FormGroup;
  submitted = false;

orderId: any = 0;
stateInitialiserId: any = 0;
isDelete: boolean=false;
close: boolean=false;

sub: any = "";


constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private stateInitialiserStateService: StateInitialiserStateService,
  private toastrService: ToastrService,
  private authGuard:AuthGuard) { 
    authGuard.canActivate();

    route.params.subscribe(p => { this.stateInitialiserState.id = +p['id'] || 0 } );
  }

ngOnInit() {
  this.sub = this.route
    .queryParams
    .subscribe(params => {
      this.orderId = +params['orderId'] || 0;
      this.stateInitialiserId = +params['initialiserId'] || 0;
    });

  this.registerForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);

  if (this.stateInitialiserState.id)
      this.stateInitialiserStateService.getStateInitialiserState(this.stateInitialiserState.id)
      .subscribe(
        stateInitialiserState => this.stateInitialiserState = stateInitialiserState,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/stateinitialiserstates']);
            return; 
          }},
        () => { this.populateForm(this.stateInitialiserState)}
      );
}

createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {

  return formBuilder.group({
    id: 0, 
    name:    ["", Validators.required],
    orderId: 0,
    completionTime: 2,
    alertToCompletionTime: 1,
    stateInitialiserId: 0,
    isDeleted: false,
    canDelete: true,
    stateInitialiserStateCustomFields: [],
  });
}

populateForm(stateInitialiserState: StateInitialiserState) {
  console.log("State Id:" + stateInitialiserState.id);
  
  this.registerForm.setValue(stateInitialiserState);
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  var result$;

  this.submitted = true;
  this.stateInitialiserState = Object.assign({}, this.registerForm.value);

  if(this.close==true) {
    this.router.navigate(['/generatorstatelist/' + this.stateInitialiserId])
    return;
  }
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      console.warn("Submit Not valid ");
      return;
  }
  
  var action

  if(this.isDelete) {
    action = "Deleted";
    result$ = this.stateInitialiserStateService.delete(this.stateInitialiserState.id) 
  }
  else if (this.stateInitialiserState.id) {
    action = "Updated";
    result$ = this.stateInitialiserStateService.update(this.stateInitialiserState) 
  }
  else {
    action = "Created";
    this.stateInitialiserState.orderId = this.orderId;
    this.stateInitialiserState.stateInitialiserId = this.stateInitialiserId;
    result$ = this.stateInitialiserStateService.create(this.stateInitialiserState); 
  }

  result$.subscribe(
    stateInitialiserState => {
      this.toastrService.success('State sucessfully ' + action, 'Success');
      this.router.navigate(['/generatorstatelist/' + this.stateInitialiserId])
    },
    error => { this.toastrService.error('State save error', 'Error');
               this.router.navigate(['/generatorstatelist/' + this.stateInitialiserId]) } );
  
  }

  delete() {
      this.isDelete = true;
      // if (confirm("Are you sure?")) {
      //   this.stateInitialiserStateService.delete(this.stateInitialiserState.id)
      //     .subscribe(x => { this.router.navigate(['/generatorstatelist/' + this.stateInitialiserId])});
      // }
  }
}          
