import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { HttpJwtService } from '../shared/services/httpJwt.service';
import { DescriptionOfWork } from '../models/descriptionofwork';

@Injectable()
export class DescriptionOfWorkService {

  private readonly descriptionofworkEndpoint = '/descriptionsofwork';
  private httpHeaders = new HttpHeaders; 
  
  constructor(private http: HttpClient, private httpJwtService:HttpJwtService) {}

  getDescriptionsofwork()  {
    return this.httpJwtService.get<any>(this.descriptionofworkEndpoint)
  }

  create(descriptionOfWork:DescriptionOfWork) {
    return this.httpJwtService.post<DescriptionOfWork>(this.descriptionofworkEndpoint, descriptionOfWork)
  }

  update(descriptionOfWork:DescriptionOfWork) {
    return this.httpJwtService.put<DescriptionOfWork>(this.descriptionofworkEndpoint + '/' + descriptionOfWork.id, descriptionOfWork)
  }
}