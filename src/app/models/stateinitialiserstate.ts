import { StateRule } from "./staterule";
import { CustomField } from "./customfield";

export interface StateInitialiserState { 
    id: number;
    name: string;
    orderId: number;
    completionTime: number;
    alertToCompletionTime: number;
    stateInitialiserId: number;
    canDelete:boolean;
    stateInitialiserStateCustomFields: CustomField[];
}