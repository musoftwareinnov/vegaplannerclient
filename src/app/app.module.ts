import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';    
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserXhr } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { VpcNavComponent } from './components/vpc-nav/vpc-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
         MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
         MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatNativeDateModule 
        }from '@angular/material';


import { MatBadgeModule} from '@angular/material/badge';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { VpcDashboardComponent } from './components/vpc-dashboard/vpc-dashboard.component';
import { VpcAppsinprogressComponent } from './components/vpc-appsinprogress/vpc-appsinprogress.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './shared/services/user.service';

//Security
import { PlanningAppService } from './services/planningapp.service';
import { PlanningAppStateService } from './services/planninappstate.service';
import { ProgressService } from './services/progress.service';
import { DrawingService } from './services/drawing.service';
import { StateStatusService } from './services/statestatus.service';
import { StateInitialiserService } from './services/stateinitialiser.service';
import { CustomerService } from './services/customer.service';
import { StateInitialiserStateService } from './services/stateinitialiserstate.service';
import { StatisticsService } from './services/statistics.service';

//Security
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
//import { AccountModule }  from './components/account/account.module';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuard } from './auth.guard';
//import { StorageServiceModule} from 'angular-webstorage-service';
import { HttpJwtService } from './shared/services/httpJwt.service';
//import { SpinnerComponent } from './components/spinner/spinner.component';



const appRoutes:Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'dashboard' , component: VpcDashboardComponent},
  { path: 'appsinprogress' , component: VpcAppsinprogressComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    VpcNavComponent,
    VpcDashboardComponent,
    VpcAppsinprogressComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    HttpModule,

    //Material design modules
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,


  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler},
    // { provide: BrowserXhr, useClass: BrowserXhrWithProgress},
    HttpJwtService,
    UserService,
    PlanningAppService,
    // PlanningAppStateService,
    // DrawingService,
    // ProgressService,
    // CustomerService,
    StateStatusService,
    // StateInitialiserService,
    // StateInitialiserStateService,
    // StatisticsService,
    UserService,
    AuthGuard,
    [ConfigService, { 
      provide: XHRBackend, 
      useClass: AuthenticateXHRBackend
    }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
