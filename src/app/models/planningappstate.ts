import { StateRule } from "./staterule";
import { CustomField } from "./customfield";

export interface PlanningAppState {
    id: number; 
    stateName: string;
    dueByDate: string;
    dateCompleted: string;
    stateStatus: string;
    currentState: boolean;
    minDueByDate: string;
    dueByDateEditable: boolean;
    isCustomDuration: boolean;
    mandatoryFieldsSet: boolean;
    planningAppId: string;
    planningAppStateCustomFieldsResource: CustomField[];
    notes: string;
}