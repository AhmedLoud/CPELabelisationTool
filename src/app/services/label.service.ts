import { Injectable } from '@angular/core';
import { Label } from '../models/label';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export const LABELS: Label[] = [
  { id: 1, name: 'boisson' },
  { id: 2, name: 'boite-conserve' },
  { id: 3, name: 'animal' },
  { id: 4, name: 'humain' },
  { id: 5, name: 'cosmetique' }
];

@Injectable()
export class LabelService {
  private backendUrl = 'http://localhost:3000/ping';

  constructor(private http: HttpClient) { }

  getLabels(): Observable<Label[]> {
    return of(LABELS);
  }

  ping(): Observable<string> {
    return this.http.get<string>(this.backendUrl);
  }
}
