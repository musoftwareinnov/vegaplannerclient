import { Customer } from './customer';
import { Developer } from './developer';
import { Address } from './address';
import { DevelopmentAddress } from './developmentAddress';

export interface PlanningAppGet {
  totalItems: number;
  items: PlanningApp[];
}

export interface PlanningApp {
    id: number; 
    planningReferenceId: string;
    customer: Customer;
    developer: Developer;
    developmentAddress: DevelopmentAddress;
    name: string;
    businessDate: string;
    planningStatus: string;
    currentStateStatus: string;
    currentState: string;
    expectedStateCompletionDate: string; 
    nextState: string; 
    councilPlanningAppId: string;
    completionDate: string; 
    generator: string;
    notes: string;
    planningAppStates: PlanningAppStates[];
    planningAppFees: PlanningAppFees[];
    method: number;
    descriptionOfWork: string,
    surveyors:string,
    drawers:string,
    admins:string,
  }

export interface PlanningAppFees {
    id: number; 
    name: string;
    amount: number;
  
}

export interface PlanningAppStates {
    id: number; 
    stateName: string;
    dueByDate: string;
    dateCompleted: string;
    stateStatus: string;
    currentState: boolean;
  }

  export interface ChangePlanningAppState {
    id: number; 
    method: number;
  }

  export interface SavePlanningNotes {
    id: number; 
    notes: string;
  }

  export interface PlanningAppGenerator {
    customerId: number; 
    stateInitialiserId: number;
    name: string; 
    descriptionOfWork: string;
    developer: Developer;
    developmentAddress: Address;
    surveyors: number[];
    drawers: number[];
    admins: number[];
  }

