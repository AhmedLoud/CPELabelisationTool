import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import {DarknetTraining} from '../models/index';

@Injectable()
export class DarknetTrainingService {
  private backendUrl = 'http://localhost:3000/ping';

  constructor(private http: HttpClient,
     private settingsService: SettingsService) { }

  getDarknetTrainings(): Observable<DarknetTraining[]> {
    const url = this.settingsService.backendApiUrl + '/darknet_trainings';
    return this.http.get<DarknetTraining[]>(url);
  }

  ping(): Observable<string> {
    return this.http.get<string>(this.backendUrl);
  }
}
