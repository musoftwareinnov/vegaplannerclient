import { NameValuePair } from "./namevaluepair";

export interface CustomerForm {
    id: number; 
    titleId: number;
    title:string
    titles:NameValuePair[];
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    county: string;
    postcode: string;
    emailAddress: string; 
    telephoneHome: string; 
    telephoneMobile: string; 
    telephoneWork: string; 
    notes: string;
}

