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

//Material Design Modules
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
         MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
         MatPaginatorModule, MatFormFieldModule, MatInputModule, MatNativeDateModule ,
         MatTabsModule, MatProgressSpinnerModule 
        }from '@angular/material';
        
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

//Services
import { UserService } from './shared/services/user.service';
import { PlanningAppService } from './services/planningapp.service';
import { StateStatusService } from './services/statestatus.service';
import { CustomerService } from './services/customer.service';
import { StatisticsService } from './services/statistics.service';
import { PlanningAppStateService } from './services/planninappstate.service';
import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { DrawingService } from './services/drawing.service';
import { StateInitialiserService } from './services/stateinitialiser.service';
import { StateInitialiserStateService } from './services/stateinitialiserstate.service';
import { DescriptionOfWorkService } from './services/descriptionofwork.service';

//Security
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
//import { AccountModule }  from './components/account/account.module';
import { ConfigService } from './shared/utils/config.service';
import { AuthGuard } from './auth.guard';
//import { StorageServiceModule} from 'angular-webstorage-service';
import { HttpJwtService } from './shared/services/httpJwt.service';

//User defines components
import { MatSelectModule} from '@angular/material/select';
import { MatBadgeModule} from '@angular/material/badge';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { VpcNavComponent } from './components/vpc-nav/vpc-nav.component';
import { VpcDashboardComponent } from './components/vpc-dashboard/vpc-dashboard.component';
import { VpcAppsinprogressComponent } from './components/vpc-appsinprogress/vpc-appsinprogress.component';
import { LoginComponent } from './components/login/login.component';
import { VpcCustomerformComponent } from './components/vpc-customerform/vpc-customerform.component';
import { VpcCustomerlistComponent } from './components/vpc-customerlist/vpc-customerlist.component';
import { VpcGeneratorlistComponent } from './components/vpc-generatorlist/vpc-generatorlist.component';
import { VpcGeneratorstatelistComponent } from './components/vpc-generatorstatelist/vpc-generatorstatelist.component';
import { VpcCustomerappslistComponent } from './components/vpc-customerappslist/vpc-customerappslist.component';
import { VpcGeneratorstateComponent } from './components/vpc-generatorstate/vpc-generatorstate.component';
import { VpcAppscompletedComponent } from './components/vpc-appscompleted/vpc-appscompleted.component';
import { VpcGeneratornewComponent } from './components/vpc-generatornew/vpc-generatornew.component';
import { VpcAppsnewComponent } from './components/vpc-appsnew/vpc-appsnew.component';
import { VpcAppdetailsComponent } from './components/vpc-appdetails/vpc-appdetails.component';
// import { AppErrorHandler } from './app.error.handler';
import { VpcAppstateformComponent } from './components/vpc-appstateform/vpc-appstateform.component';
import { BusinessDatesService } from './services/businessdates.service';
import { AppErrorHandler } from './app.error.handler';
import { VpcAppssearchComponent } from './components/vpc-appssearch/vpc-appssearch.component';

//import { SpinnerComponent } from './components/spinner/spinner.component';

 

const appRoutes:Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'dashboard' , component: VpcDashboardComponent},
  { path: 'appsinprogress' , component: VpcAppsinprogressComponent},
  { path: 'searchapps' , component: VpcAppssearchComponent},
  { path: 'appscompleted' , component: VpcAppscompletedComponent},
  { path: 'appsnew' , component: VpcAppsnewComponent},
  { path: 'appstate/edit/:id' , component: VpcAppstateformComponent},
  { path: 'customers/new' , component: VpcCustomerformComponent},
  { path: 'customers/edit/:id' , component: VpcCustomerformComponent},
  { path: 'customers' , component: VpcCustomerlistComponent},
  { path: 'customers/planningapps/:id' , component: VpcCustomerappslistComponent},
  { path: 'generators' , component: VpcGeneratorlistComponent},
  { path: 'generators/new' , component: VpcGeneratornewComponent},
  { path: 'generatorstatelist/:id' , component: VpcGeneratorstatelistComponent},
  { path: 'generatorstate/edit/:id' , component: VpcGeneratorstateComponent},

  { path: 'planningapps/:id' , component: VpcAppdetailsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    VpcNavComponent,
    VpcDashboardComponent,
    VpcAppsinprogressComponent,
    LoginComponent,
    VpcCustomerformComponent,
    VpcCustomerlistComponent,
    VpcGeneratorlistComponent,
    VpcGeneratorstatelistComponent,
    VpcCustomerappslistComponent,
    VpcGeneratorstateComponent,
    VpcAppscompletedComponent,
    VpcGeneratornewComponent,
    VpcAppsnewComponent,
    VpcAppdetailsComponent,
    VpcAppstateformComponent,
    VpcAppssearchComponent
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
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress},
    // { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    HttpJwtService,
    UserService,
    PlanningAppService,
    PlanningAppStateService,
    DrawingService,
    ProgressService,
    CustomerService,
    StateStatusService,
    StateInitialiserService,
    StateInitialiserStateService,
    DescriptionOfWorkService,
    StatisticsService,
    UserService,
    BusinessDatesService,
    AuthGuard,
    
    [ConfigService, {  
      provide: XHRBackend, 
      useClass: AuthenticateXHRBackend
    }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
