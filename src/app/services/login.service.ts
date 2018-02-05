import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import 'rxjs/add/operator/takeWhile';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';


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
    this.interval = 0;
    // this.pingBackend();
    console.log('constructor', this._isBackendApiAvailable);
  }

  pingBackend(): void {
    // TimerObservable.create(0, this.interval)
    //   .takeWhile(() => !this._isBackendApiAvailable)
    //   .subscribe(() => {
    //     this.ping().subscribe(result => {
    //       console.log('result', result)
    //       if (result.message == "pong") {
    //         this._isBackendApiAvailable = true;
    //       }
    //     });
    //   });
  }



  ping(): Observable<string> {
    return this.http.get<string>('http://localhost:3000/ping')
      .pipe(catchError(() => {
        this._isBackendApiAvailable = false;
        return of('' as string);
      })
      );
  }

  get isConnectedToBackend(): boolean {
    return this._isBackendApiAvailable;
  }

}
