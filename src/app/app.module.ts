import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';    
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserXhr } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { VpcNavComponent } from './components/vpc-nav/vpc-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
         MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
         MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatBadgeModule} from '@angular/material/badge';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { VpcDashboardComponent } from './components/vpc-dashboard/vpc-dashboard.component';
import { VpcAppsinprogressComponent } from './components/vpc-appsinprogress/vpc-appsinprogress.component';


const appRoutes:Routes = [
  { path: 'dashboard' , component: VpcDashboardComponent},
  { path: 'appsinprogress' , component: VpcAppsinprogressComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    VpcNavComponent,
    VpcDashboardComponent,
    VpcAppsinprogressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    LayoutModule,
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
