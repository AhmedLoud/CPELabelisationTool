import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ImageToLabelise } from '../models/index';


@Injectable()
export class ImageService {

  constructor(private settingsService: SettingsService,
    private http: HttpClient) {
  }

  getImageToLabelise(): Observable<ImageToLabelise> {
    const url = this.settingsService.backendApiUrl +
      '/random_image_to_labelise';
    return this.http.get<ImageToLabelise>(url);
  }

}