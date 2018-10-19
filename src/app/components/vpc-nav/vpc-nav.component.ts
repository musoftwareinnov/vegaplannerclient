import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-vpc-nav',
  templateUrl: './vpc-nav.component.html',
  styleUrls: ['./vpc-nav.component.css']
})
export class VpcNavComponent {

  loginStatus: boolean = false;
  userName: string = "";
  subscription:Subscription = new Subscription;
  userName$:Subscription = new Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, 
              private statisticsService: StatisticsService, 
              private userService:UserService) {}
  
  ngOnInit() {

    // this.populateStatistics();

    // this.interval = setInterval(() => { 
    //     this.populateStatistics(); 
    // }, 10000);

    //User logging
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.loginStatus = status);
    this.userName$ = this.userService.authNavUser$.subscribe(userName => this.userName = userName);
  }


  }
