import { Component, OnInit } from '@angular/core';
import { StateInitialiser } from 'src/app/models/stateinitialiser';
import { ActivatedRoute, Router } from '@angular/router';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { AuthGuard } from 'src/app/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vpc-generatornew',
  templateUrl: './vpc-generatornew.component.html',
  styleUrls: ['./vpc-generatornew.component.css']
})
export class VpcGeneratornewComponent implements OnInit {
  stateInitialiser: StateInitialiser = {
    id: 0, 
    name: "",
    description: "",
    states: []
  };

orderId: any = 0;
stateInitialiserId: any = 0;
registerForm: FormGroup;
submitted = false;

sub: any = "";
constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private toastrService: ToastrService,
  private stateInitialiserService: StateInitialiserService,
  private authGuard:AuthGuard) { 
      authGuard.canActivate();
  }

ngOnInit() {
  this.registerForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);
}
 
    // convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  var result$;
  this.submitted = true;
  this.stateInitialiser = Object.assign({}, this.registerForm.value);

  console.warn("Desc:" + this.stateInitialiser.description);
  result$ = this.stateInitialiserService.create(this.stateInitialiser); 

  result$.subscribe(

    stateInitialiser => {
    this.toastrService.success('Generator was sucessfully created ', 'Success');
    this.router.navigate(['/generators']);
  });
}
createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {

  return formBuilder.group({
    id: 0, 
    name:    ['', Validators.required],
    description: '',  
  });
}
}
