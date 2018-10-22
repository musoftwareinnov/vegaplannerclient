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

      //Examples : 
      //this.registerForm.setValue({firstName:"harry"});
      //this.registerForm.setValue(this.customer);

      if (this.customer.id)
          this.customerService.getCustomer(this.customer.id)
          .subscribe(
            customer => this.customer = customer,
            err => {
              if (err.status == 404) {
                this.router.navigate(['/customers']);
                return; 
              }
          });
    }

    createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {

      return formBuilder.group({
        //id: 0, 
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
        notes: "",
      });
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;
      const customer: Customer = Object.assign({}, this.registerForm.value);

      console.warn("Submit -> "  +   customer.firstName);
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.warn("Submit Not valid-> "  +   customer.firstName);
          return;
      }

      //this.toastrService.success('Customer was sucessfully saved', 'Success');



      // var result$ = (this.customer.id) ? this.customerService.update(this.customer) : this.customerService.create(this.customer); 
  
  
      // result$.subscribe(
  
      //   customer => {
      //     this.toastrService.success('Customer was sucessfully saved', 'Success');
      //     this.router.navigate(['/customers'])
      // });
    }


  }
