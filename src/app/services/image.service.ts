import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { ImageToLabelise } from '../models/index';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ImageService {


  constructor(private settingsService: SettingsService,
    private http: HttpClient) {
  }

  /**GET: get a random image from the server */
  getImageToLabelise(): Observable<ImageToLabelise> {
    const url = this.settingsService.backendApiUrl +
      '/random_image_to_labelise';
    return this.http.get<ImageToLabelise>(url);
  }

  /**PUT: update the image on the server */
  updateImage(image: ImageToLabelise): Observable<any> {
    const url = this.settingsService.backendApiUrl
      + '/images/' + image.id;
    return this.http.put(url, ImageToLabelise.toJSON(image), httpOptions);
  }

  private getDefaultImage(): ImageToLabelise {
    const img = new ImageToLabelise();
    img.imageUrl = 'assets/imageTest.jpg';
    img.boundingBoxes = [];
    return img;
  }
}
