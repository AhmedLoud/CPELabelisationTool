import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  private _backendUrl;
  private _currentApiVersion;

  constructor() {
    this._backendUrl = 'http://localhost:3000';
    this._currentApiVersion = 1;
  }

  get backendApiUrl(): string {
    return this._backendUrl + `/api/v${this._currentApiVersion}`;
  }
}