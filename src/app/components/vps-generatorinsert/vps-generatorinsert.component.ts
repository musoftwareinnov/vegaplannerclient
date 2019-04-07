import { Component, OnInit } from '@angular/core';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { PlanningAppUpdateGenerator } from 'src/app/models/planningapp';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-vps-generatorinsert',
  templateUrl: './vps-generatorinsert.component.html',
  styleUrls: ['./vps-generatorinsert.component.css']
})
export class VpsGeneratorinsertComponent implements OnInit {

  constructor( 
              private formBuilder: FormBuilder,
              private PlanningAppService: PlanningAppService,
              private stateInitialiserService: StateInitialiserService,
              private toastrService: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private authGuard:AuthGuard) {
                authGuard.canActivate();
                route.params.subscribe(p => { this.orderId = +p['id'] || 0 } );
              }

  query: any = {
    pageSize: 0
  };
  queryGeneratorResult: any = {};
  generator: PlanningAppUpdateGenerator = {
    id: 0, 
    generatorId: 0, 
    orderId: 0
  }
  orderId: number
  planningAppReference: string
  newAppForm: FormGroup;
  
  ngOnInit() {
    
    this.stateInitialiserService.getStateInitialiserList(this.query)
    .subscribe(result => this.queryGeneratorResult = result);

    //Get Ap
    this.route
    .queryParams
    .subscribe(params => {
      this.generator.id = +params['planningAppId'] || 0;
    });

    this.newAppForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);
  }

  onSubmit() {  
    this.generator.generatorId = this.newAppForm.controls['generator'].value;
    //Increase OrderId so its inserted after the current generator
    this.generator.orderId = this.orderId+1
    console.log('Generator')
    console.log(this.generator)

    if(this.generator.generatorId > 0) {
      this.PlanningAppService.insertGenerator(this.generator).subscribe(
      planningApp => {
        this.toastrService.success('Generator sucessfully inserted', 'Success');
        this.router.navigate(['/planningapps/', this.generator.id])
      });
    }
    else {
      this.toastrService.error('Please specify generator', 'Error');
    }
  }

  close() {
    this.router.navigate(['/planningapps/'+ this.generator.id ]);
  }
    // convenience getter for easy access to form fields
    get f() { return this.newAppForm.controls; }

    createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
  
      var form = formBuilder.group({
        generator:             new FormControl(null),
      });  
  
      form.controls['generator'].setValue(1, {onlySelf: true});
      return form;
    }
}

