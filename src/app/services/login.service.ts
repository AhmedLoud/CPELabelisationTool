import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import 'rxjs/add/operator/takeWhile';
import { of } from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class LoginService {
  private backendUrl = 'http://localhost:3000/ping';
  private _isBackendApiAvailable: boolean;
  private interval: number;

  constructor(private http: HttpClient,
    private settingsService: SettingsService) {
    this._isBackendApiAvailable = false;
    this.interval = 10000;
    this.pingBackend();
  }

  pingBackend(): void {
    TimerObservable.create(0, this.interval)
      .takeWhile(() => !this._isBackendApiAvailable)
      .subscribe(() => {
        this.ping().subscribe(result => {
          if (result == "pong") {
            this._isBackendApiAvailable = true;
          }
        });
      });
  }



  ping(): Observable<string> {
    return this.http.get<string>(this.backendUrl)
      .pipe(() => {
        this._isBackendApiAvailable = false;
        return of('' as string);
      }
      );
  }

  get isConnectedToBackend(): boolean {
    return this._isBackendApiAvailable;
  }

}
