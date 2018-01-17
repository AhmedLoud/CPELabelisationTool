import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { LabelisationFormComponent } from './labelisation-form/labelisation-form.component';
import { LabelService } from './services/label.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';
import { ImageService } from './services/image.service';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LabelisationFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LabelService, SettingsService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
