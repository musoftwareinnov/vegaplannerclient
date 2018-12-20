import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {UNAUTHORIZED, BAD_REQUEST, FORBIDDEN} from "http-status-codes";
import { ToastrService } from "ngx-toastr";
import { UserService } from "./shared/services/user.service";

///May replace with Interceptors as can auto retry

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = "An error occurred: Please click this message to refresh";
    static readonly DEFAULT_ERROR_TITLE: string = "Something went wrong";
    static readonly USER_TIMEOUT_MESSAGE: string = "User time out, login again";
    static readonly USER_FORBIDDEN_MESSAGE: string = "User forbidden to do this request, contact support";
    static readonly SERVICE_NOT_CONTACTABLE: string = "Server not contactable, contact support";

    constructor(  private injector: Injector,             
                  private toastrService: ToastrService,
                  private userService: UserService,
                  private ngZone: NgZone){};
      
    handleError(error: HttpErrorResponse ) { 
        console.log("ETTP ERROR REPSONSE!! ", error.status);
        //Log out if we have errors
        this.userService.logout();
        //At handler request not in angular zone so must run inside it calling ngZone
        const router = this.injector.get(Router);
        let httpErrorCode = error.status;
        switch (httpErrorCode) {
            case UNAUTHORIZED:
                console.log("ERROR UNAUTHORIZED");
                this.ngZone.run(() => router.navigate(['/login']),            
                this.showError(AppErrorHandler.USER_TIMEOUT_MESSAGE))     
                break;
            case FORBIDDEN:
                console.log("ERROR FORBIDDEN");
                this.ngZone.run(() => router.navigate(['/login']),
                this.showError(AppErrorHandler.USER_FORBIDDEN_MESSAGE) )           
                break;
            case BAD_REQUEST:
                console.log("ERROR BAD_REQUEST XXXXXX");
                this.ngZone.run(() => router.navigate(['/login']),
                this.showError(error.message));
                break;
            default:
               //Cannot Connect to Server
               this.ngZone.run(() => this.showError(error.message));
               this.ngZone.run(() => router.navigate(['/login']),
               this.showError(AppErrorHandler.SERVICE_NOT_CONTACTABLE) )   
          }
   
    
    }

    private showError(message:string){
        console.error(message);
        this.ngZone.run(() => this.toastrService.error(message, 'Error'));
      }
}