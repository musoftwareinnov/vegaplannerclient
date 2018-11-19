import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';
import {BaseService} from "./base.service";
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs-compat'; 
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// Add the RxJS Observable operators we need in this app.
//import '../../rxjs-operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';
  res: any = {};
  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  private _authNavUserNameSource = new BehaviorSubject<string>("User not logged in");
  private _authNavBusinessDateSource = new BehaviorSubject<string>("");
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  authNavUser$ = this._authNavUserNameSource.asObservable();  //used to display user name in Nav Menu
  authNavBusinessDate$ = this._authNavBusinessDateSource.asObservable();  //used to display business date in Nav Menu

  private loggedIn = false;
  
  constructor(private http: Http, 
              private configService: ConfigService 
                                  )  {
    super();

    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();


  }

//   register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
//     let body = JSON.stringify({ email, password, firstName, lastName,location });
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = new RequestOptions({ headers: headers });

//     // return this.http.post(this.baseUrl + "/accounts", body, options)
//     //   .pipe(
//     //   map(res => true)),
//     //   catchError(error => Observable.of(null))
// catchError(this.handleError('addHero', hero))
//   }  
// catch() => catchError()
// do() => tap()
// finally() => finalize()
// switch() => switchAll()

   login(userName:string, password:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(userName);
    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),{ headers }
      )
      .map(res => res.json())
      .map(res => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', res.authToken);
          if(res.authToken ) { 
            const helper = new JwtHelperService();
            console.log("UserService Login succeeded: webtoken obtained for " + userName);
            const decodedToken = helper.decodeToken(res.authToken);
            var expd = helper.getTokenExpirationDate(res.authToken);
                
            var rol = decodedToken["rol"];
            console.log(rol);

          }
       }
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        this._authNavUserNameSource.next(res.userName);
        this._authNavBusinessDateSource.next(res.businessDate);


        return true;
      })
      .catch(this.handleError);
    }

    // login(userName:string, password:string) {
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   console.log(userName);
    //   return this.http
    //     .post(
    //     this.baseUrl + '/auth/login',
    //     //'/api/auth/login', (used for testing based on config file)
    //     JSON.stringify({ userName, password }),{ headers })
    
    //       .pipe( map(  res => res.json(), 
    //         res => { 
    //           if (typeof window !== 'undefined') {
    //               localStorage.setItem('authToken', res.authToken);
    //               if(res.authToken )
    //                   console.log("UserService Login succeeded: webtoken obtained for " + userName);
    //           }
    //           this.loggedIn = true;
    //           this._authNavStatusSource.next(true);
    //           this._authNavUserNameSource.next(res.userName);
    //           return true;
    //         } 
    //       )      
    //     )
    //   }

    logout() {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken')

          //Call logout service????
          console.log("UserService Logout succeeded");
        }
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
        this._authNavUserNameSource.next("");
    }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUwt() {
    var httpHeaders = new HttpHeaders;
    if(this.isLoggedIn()) {
      if (typeof window !== 'undefined') {
        var webToken = localStorage.getItem('authToken');
        var httpHeaders = new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${webToken}`
          });
      }
    }
    else {
      console.log("get Uwt UserService Not logged in");
    }
    return httpHeaders;
  }
}


