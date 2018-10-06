export interface Customer {
    id: number; 
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    emailAddress: string; 
    telephoneHome: string; 
    telephoneMobile: string; 
    telephoneWork: string; 
    notes: string;
}

export interface CustomerSelect {
    id: number; 
    customerNameLong: string;
    postcode: string;
}