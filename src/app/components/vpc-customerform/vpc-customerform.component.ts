import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vpc-customerform',
  templateUrl: './vpc-customerform.component.html',
  styleUrls: ['./vpc-customerform.component.css']
})



export class VpcCustomerformComponent implements OnInit {
    customer: Customer = {
        id: 0, 
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city:"",
        county:"",
        postcode: "",
        emailAddress: "",
        telephoneHome: "",
        telephoneMobile:"",
        telephoneWork:"",
        notes: "",
      };

    registerForm: FormGroup;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private customerService: CustomerService,
      private toastrService: ToastrService,
      private authGuard:AuthGuard) {
  
        authGuard.canActivate();
        route.params.subscribe(p => { this.customer.id = +p['id'] || 0})
      }
  
    ngOnInit() {

      this.registerForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);

      if (this.customer.id)
          console.log("CustomerId:" + this.customer.id );
          this.customerService.getCustomer(this.customer.id)
          .subscribe(
            customer => this.customer = customer,       
            err => {
              if (err.status == 404) {
                this.router.navigate(['/customers']);
                return; 
              }},

              () => { console.log("onComplete"); this.populateForm(this.customer)}

          );
    }

    populateForm(customer: Customer) {
      console.log("CUstomerName:" + customer.id);
      
      customer.city = "Truro";
      customer.county = "COrnwall";
      
      this.registerForm.setValue(customer);
      //this.registerForm.setValue({firstName: customer.firstName});
    }

    createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {

      return formBuilder.group({
        id: 0, 
        firstName:    ['', Validators.required],
        lastName:     ['', Validators.required],
        addressLine1: ['', Validators.required],
        addressLine2: "",
        city:         ['', Validators.required],
        county:       ['', Validators.required],
        postcode:     ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        telephoneHome: "",
        telephoneMobile:['', Validators.required],
        telephoneWork:"",
        geoLocation:"",
        notes: "",
      });
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;
      this.customer = Object.assign({}, this.registerForm.value);

      this.customer.addressLine2 = "reg";
      console.warn("Submit -> "  +   this.customer.firstName);
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
      this.registerForm.reset();
  
      // Resets to provided model
      //this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
    }


  }
