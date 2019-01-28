import { StateStatus } from '../models/statestatus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/services/user.service';
import { HttpJwtService } from '../shared/services/httpJwt.service';

@Injectable()
export class StaticDataService {

  private readonly staticdataEndpoint = '/staticdata';
  private httpHeaders = new HttpHeaders;
  
  constructor(private http: HttpClient, private httpJwtService:HttpJwtService) { }

  getHonorifics()  {
    return this.httpJwtService.get<any>(this.staticdataEndpoint + "/honorifics" + status);
  }
}