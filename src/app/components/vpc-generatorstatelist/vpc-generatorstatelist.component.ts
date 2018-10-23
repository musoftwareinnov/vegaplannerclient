import { Component, OnInit } from '@angular/core';
import { StateInitialiser } from 'src/app/models/stateinitialiser';
import { ActivatedRoute, Router } from '@angular/router';
import { StateInitialiserService } from 'src/app/services/stateinitialiser.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-vpc-generatorstatelist',
  templateUrl: './vpc-generatorstatelist.component.html',
  styleUrls: ['./vpc-generatorstatelist.component.css']
})
export class VpcGeneratorstatelistComponent implements OnInit {

  stateInitialiser: StateInitialiser = {
    id: 0, 
    name: "",
    description: "",
    states: [] 
  };
  //For table
displayedColumns = ['name', 
                    'duration', 
                    'alert', 
                    'edit', 
                    'addstate',
                    ];
  
constructor(
  private route: ActivatedRoute,
  private router: Router,
  private stateInitialiserService: StateInitialiserService,
  private authGuard:AuthGuard) { 
      authGuard.canActivate();
      route.params.subscribe(p => { this.stateInitialiser.id = +p['id'] || 0})
  }

ngOnInit() {

  console.warn(this.stateInitialiser);
  if (this.stateInitialiser.id)
      this.stateInitialiserService.getStateInitialiser(this.stateInitialiser.id)
      .subscribe(
        v => this.stateInitialiser = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/stateinitialisers']);
            return; 
          }
      });
}
}

