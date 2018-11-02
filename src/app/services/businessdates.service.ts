import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpJwtService } from '../shared/services/httpJwt.service';
import { BusinessDates } from '../models/businessdates';

@Injectable()
export class BusinessDatesService {

  private readonly statestatusEndpoint = '/businessdates';
  private httpHeaders = new HttpHeaders;
  
  constructor(private http: HttpClient, private httpJwtService:HttpJwtService) { }

  getBusinessDates()  {
    return this.httpJwtService.get<BusinessDates>(this.statestatusEndpoint)
  }
}