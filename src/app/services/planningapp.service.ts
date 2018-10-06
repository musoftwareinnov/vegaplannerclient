import { Headers } from '@angular/http';
import { PlanningApp, ChangePlanningAppState, PlanningAppGenerator, SavePlanningNotes } from '../models/planningapp';
import { PlanningAppSummary } from '../models/planningappsummary';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { StateAction } from '../constants';
import { UserService } from '../shared/services/user.service';
import { HttpJwtService } from '../shared/services/httpJwt.service';
