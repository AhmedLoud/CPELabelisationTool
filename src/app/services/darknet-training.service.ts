import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { DarknetTraining } from '../models/index';

const TRAININGS = [
  { id: 1, title: 'first title', description: 'first description' },
  { id: 2, title: 'first title', description: 'first description' },
  { id: 3, title: 'first title', description: 'first description' },
  { id: 4, title: 'first title', description: 'first description' },
  { id: 5, title: 'first title', description: 'first description' },
  { id: 6, title: 'first title', description: 'first description' },
  { id: 7, title: 'first title', description: 'first description' },
  { id: 8, title: 'first title', description: 'first description' }
]

@Injectable()
export class DarknetTrainingService {
  private backendUrl = 'http://localhost:3000/ping';

  constructor(private http: HttpClient,
    private settingsService: SettingsService) { }

  getDarknetTrainings(): Observable<DarknetTraining[]> {
    // return of(TRAININGS);
    const url = this.settingsService.backendApiUrl + '/darknet_trainings';
    return this.http.get<DarknetTraining[]>(url);
  }

  ping(): Observable<string> {
    return this.http.get<string>(this.backendUrl);
  }
}
