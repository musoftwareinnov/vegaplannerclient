import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectGenerator } from '../models/projectgenerator';
import { HttpJwtService } from '../shared/services/httpJwt.service';

@Injectable()
export class ProjectGeneratorService  {

  private readonly projectGeneratorServiceEndpoint = '/projectgenerators';
  private httpHeaders = new HttpHeaders;
  constructor(private http: HttpClient, private httpJwtService:HttpJwtService) { 
  }

  getProjectGeneratorList(filter:any)  {
    return this.httpJwtService.get<any>(this.projectGeneratorServiceEndpoint + '?' + this.toQueryString(filter))
  }

  getProjectGenerator(id: number)  {
    return this.httpJwtService.get<ProjectGenerator>(this.projectGeneratorServiceEndpoint + '/' + id)
  }

  create(stateInitialiser:any) {
    return this.httpJwtService.post<any>(this.projectGeneratorServiceEndpoint, stateInitialiser)
  }

  toQueryString(obj:any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if( value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
    }
}} 