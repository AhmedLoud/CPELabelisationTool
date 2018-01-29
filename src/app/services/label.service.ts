import { Injectable } from '@angular/core';
import { Label } from '../models/label';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { LoginService } from './login.service';

export const LABELS: Label[] = [
  { id: 1, name: 'boisson' },
  { id: 2, name: 'boite-conserve' },
  { id: 3, name: 'animal' },
  { id: 4, name: 'humain' },
  { id: 5, name: 'cosmetique' }
];

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class LabelService {
  private backendUrl = 'http://localhost:3000/ping';

  constructor(private http: HttpClient,
    private settingsService: SettingsService,
    private loginService: LoginService) { }

  getLabels(): Observable<Label[]> {
    const url = this.settingsService.backendApiUrl + '/labels';
    if (this.loginService.isConnectedToBackend) {
      return this.http.get<Label[]>(url);
    }
    else {
      return of(LABELS);
    }
  }

  ping(): Observable<string> {
    return this.http.get<string>(this.backendUrl);
  }

  deleteLabel(label: Label): Observable<Label> {
    const id: number = label.id;
    const url: string = this.settingsService.backendApiUrl + `/labels/${id}`;
    return this.http.delete<Label>(url, httpOptions);
  }

  createLabel(label: Label): Observable<Label> {
    const url: string = this.settingsService.backendApiUrl + '/labels';
    if (this.loginService.isConnectedToBackend) {
      return this.http.post<Label>(url, label, httpOptions);
    }
    else {
      return of(label);
    }
  }
}
