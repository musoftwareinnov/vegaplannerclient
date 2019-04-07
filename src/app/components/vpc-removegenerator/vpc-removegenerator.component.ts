import { PlanningAppStateService } from './../../services/planninappstate.service';
import { Component, OnInit } from '@angular/core';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { PlanningAppUpdateGenerator } from 'src/app/models/planningapp';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningAppService } from 'src/app/services/planningapp.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-vpc-removegenerator',
  templateUrl: './vpc-removegenerator.component.html',
  styleUrls: ['./vpc-removegenerator.component.css']
})
export class VpsGeneratorremoveComponent implements OnInit {

  constructor( 
              private planningAppStateService: PlanningAppStateService,
              private planningAppService: PlanningAppService,
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
  
  generatorName: string
  
  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      this.generator.id = +params['planningAppId'] || 0;
      this.generator.generatorId = +params['generatorId'] || 0;
    });

    this.planningAppStateService.getPlanningAppState(this.generator.generatorId)
    .subscribe(result => this.queryGeneratorResult = result);
  }

  onSubmit() {  
    this.generator.orderId = this.orderId
    console.log('Generator')
    console.log(this.generator)

    if(this.generator.generatorId > 0) {
      this.planningAppService.removeGenerator(this.generator).subscribe(
      planningApp => {
        this.toastrService.success('Generator sucessfully removed', 'Success');
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
}


