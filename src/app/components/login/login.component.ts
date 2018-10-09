import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Credentials } from 'src/app/models/credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  brandNew: boolean = false;
  errors: string = "";
  isRequesting: boolean = false;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' }; 
  private subscription: Subscription = new Subscription;
  email = new FormControl('', [Validators.required, Validators.email ]);
  hide = true;
  
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  constructor(private userService: UserService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
          (param: any) => {
             this.brandNew = param['brandNew'];   
             this.credentials.email = param['email'];         
          }); 
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    console.log(value.email)
    if (valid) {

      this.userService.login(value.email, value.password)
        
        //.finally(() => this.isRequesting = false)
        .subscribe(
        result => {         
          if (result) {
            console.log("IN");
            if (typeof window !== 'undefined') {
                localStorage.setItem('authToken', result.authToken);
                if(result.authToken )
                    console.log("UserService Login succeeded: webtoken obtained for " + result.userName);
            }
                    
             console.log(result['userName'])   
             this.router.navigate(['/appsinprogress']); 
             return true;         
          }
        },
        error => this.errors = error);
    }

    this.userService.getUwt();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
}
