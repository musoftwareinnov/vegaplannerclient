import { KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { CustomerService } from 'src/app/services/customer.service';
import { StaticDataService } from 'src/app/services/staticdata.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NameValuePair } from 'src/app/models/namevaluepair';
import { CustomerForm } from 'src/app/models/customerform';

@Component({
  selector: 'app-vpc-customerform',
  templateUrl: './vpc-customerform.component.html',
  styleUrls: ['./vpc-customerform.component.css']
})



export class VpcCustomerformComponent implements OnInit {
    customer: Customer = {
        id: 0, 
        titleId: 0,
        title: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        city:"",
        county:"",
        postcode: "",
        emailAddress: "",
        telephoneHome: "",
        telephoneMobile:"",
        telephoneWork:"",
        notes: "",
      };

    customerForm : CustomerForm = {
        id: 0, 
        titleId: 0,
        title: "",
        titles: [],
        firstName: "",
        lastName: "",
        addressLine1: "",
        city:"",
        county:"",
        postcode: "",
        emailAddress: "",
        telephoneHome: "",
        telephoneMobile:"",
        telephoneWork:"",
        notes: "",
      };

    honorifics: NameValuePair[];

    countries: NameValuePair[] = [ {id:2, name:'Mr'}, {id:3, name:'Mrs'} , {id:4, name:'Ms'}];

    registerForm: FormGroup;
    submitted = false;
 
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private customerService: CustomerService,
      private staticDataService: StaticDataService,
      private toastrService: ToastrService,
      private authGuard:AuthGuard) {
  
        authGuard.canActivate();
        route.params.subscribe(p => { this.customer.id = +p['id'] || 0})
      }
  
    ngOnInit() {

      this.staticDataService.getHonorifics()
      .subscribe(
        honorifics => this.honorifics = honorifics, 
        err => {},      
          () => { console.log("honorifics loaded"), console.log(this.honorifics);}
      );
      
      this.registerForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);

      this.registerForm.controls['titles'].setValue(0);

      console.log("INit CustomerID:" + this.customer.id);
      if (this.customer.id > 0) {
          console.log("CustomerId:" + this.customer.id );
          this.customerService.getCustomer(this.customer.id)
          .subscribe(
            customer => this.customer = customer,       
            err => {
              if (err.status == 404) {
                this.router.navigate(['/customers']);
                return; 
              }},

              () => { console.log("onComplete"); 
                      this.populateForm(this.customer);
                      }
          );
        }

        //this.registerForm.controls['titles'].setValue(this.honorifics[0].id);      
     }

    populateForm(customer: Customer) {
      console.log("CustomerName:" + customer.id);
      console.log("CustomerTitle:" + customer.titleId);
      this.registerForm.controls['titles'].setValue(3); 
      
      this.registerForm.setValue({id:customer.id,
                                  title:"", 
                                  titleId:0, 
                                  titles:[] ,
                                  firstName:customer.firstName,
                                  lastName:customer.lastName,
                                  addressLine1:customer.emailAddress,
                                  city:customer.city,
                                  county:customer.county,
                                  postcode:customer.postcode,
                                  emailAddress:customer.emailAddress,
                                  telephoneHome:customer.telephoneHome,
                                  telephoneMobile:customer.telephoneMobile,
                                  telephoneWork:customer.telephoneWork,
                                  geoLocation:"",
                                  nameSummary:"",
                                  fullName:"",
                                  customerAddressSummary:"",
                                  planningAppsCount:0,
                                  notes:customer.notes
                                   
                                  });
      //this.registerForm.setValue(customer);
      this.registerForm.controls['titles'].setValue(customer.titleId)
    }  
 

    createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
      return formBuilder.group({
        id:0,
        title:"",
        titleId: 0, 
        titles: new FormControl(null),
        firstName:    ['', Validators.required],
        lastName:     ['', Validators.required],
        addressLine1: ['', Validators.required],
        city:         ['', Validators.required],
        county:       ['', Validators.required],
        postcode:     ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        telephoneHome: "",
        telephoneMobile:['', Validators.required],
        telephoneWork:"", 
        geoLocation:"",
        nameSummary:"",
        fullName:"",
        customerAddressSummary:"",
        planningAppsCount:0,
        notes: "",
      });
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      console.log("submit customerid :  "  +   this.customer.id);
      this.submitted = true;
      this.customer = Object.assign({}, this.registerForm.value);   

      //get title if changed
      this.customer.titleId = this.registerForm.controls['titles'].value;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          console.warn("Submit Not valid-> "  +   this.customer.firstName);
          return;
      }   

      var result$ = (this.customer.id) ? this.customerService.update(this.customer) : this.customerService.create(this.customer); 
  
      result$.subscribe(
        customer => {
          this.toastrService.success('Customer was sucessfully saved', 'Success');
          this.router.navigate(['/customers'])
        },
        error => { this.toastrService.error('Customer name already taken', 'Error') } );
    }

    revert() {
      // Resets to blank object
      //this.registerForm.reset();
  
      // Resets to provided model
      this.registerForm.reset(this.customer);
    }

    close() {
      this.router.navigate(['/customers'])
    }

    onTitleChange() {
      var c = this.registerForm.controls['titles'];
      
      console.info("Customer Title: Type Change = " + c.value);
      this.customer.titleId = c.value;
    }
  }
