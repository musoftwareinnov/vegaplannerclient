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
    startDate: string;
    projectGeneratorName: string;
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
    canTerminate:boolean,
    canArchive:boolean,
    customerName:string,     
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
    isLastGeneratorState: boolean;
    currentState: boolean;
  }

  export interface PlanningAppUpdateGenerator {
    id: number; 
    generatorId: number; 
    orderId: number;
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
    projectGeneratorId: number;
    name: string; 
    notes: string; 
    descriptionOfWork: string;
    developer: Developer;
    developmentAddress: Address;
    surveyors: number[];
    drawers: number[];
    admins: number[];
  }

