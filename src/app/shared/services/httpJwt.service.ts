import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { ConfigService } from '../utils/config.service';

// Wrapper class for passing Web Tokens to server

@Injectable()
export class HttpJwtService {

  baseUrl: string = '';

  constructor(private http: HttpClient, 
              private configService: ConfigService, 
              private userService:UserService) {

                this.baseUrl = configService.getApiURI();
              }

  get<T>(endpoint: string) {
    return this.http.get<T>(this.baseUrl + endpoint, { headers: this.userService.getUwt() });
  }

  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(this.baseUrl + endpoint, body, { headers: this.userService.getUwt() })
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(this.baseUrl + endpoint, body, { headers: this.userService.getUwt() })
  }

  delete<T>(endpoint: string) {
    return this.http.delete(this.baseUrl + endpoint, { headers: this.userService.getUwt() });
  }
}