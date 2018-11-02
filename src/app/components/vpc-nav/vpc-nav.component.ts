import { BusinessDates } from './../../models/businessdates';
import { BusinessDatesService } from './../../services/businessdates.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Statistics } from 'src/app/models/statistics';

@Component({
  selector: 'app-vpc-nav',
  templateUrl: './vpc-nav.component.html',
  styleUrls: ['./vpc-nav.component.css']
})
export class VpcNavComponent {

  loginStatus: boolean = false;
  userName: string = "";
  businessDate: string = "";

  subscription:Subscription = new Subscription;
  userName$:Subscription = new Subscription;
  businessDate$:Subscription = new Subscription;


  planningStatistics: Statistics = {
    inProgress:0,
    onTime:0,
    due:0,
    overdue:0,
    completed:0,
    terminated:0,
    archived:0,
    overan:0,
    all:0
  };

interval: any = {};
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, 
              private statisticsService: StatisticsService, 
              private businessDatesService: BusinessDatesService,
              private userService:UserService) {}
  
  ngOnInit() {

    this.populateStatistics();
    this.interval = setInterval(() => { 
        this.populateStatistics(); 
    }, 10000);

    //User logging
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.loginStatus = status);
    this.userName$ = this.userService.authNavUser$.subscribe(userName => this.userName = userName);
    this.businessDate$ = this.userService.authNavBusinessDate$.subscribe(businessDate => this.businessDate = businessDate);
  }

  logout() {
    this.userService.logout();       
   }

   private populateStatistics() {
    this.statisticsService.getPlanningStatistics()
    .subscribe(
      v => this.planningStatistics = v
    );
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  }
