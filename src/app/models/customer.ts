import { PlanningApp } from "./planningapp";

export interface Customer {
    id: number; 
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    county: string;
    postcode: string;
    emailAddress: string; 
    telephoneHome: string; 
    telephoneMobile: string; 
    telephoneWork: string; 
    notes: string;
    //planningApplications: PlanningApp[];
}

export interface CustomerSelect {
    id: number; 
    customerNameLong: string;
    postcode: string;
}
