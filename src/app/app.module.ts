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
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DarknetTrainingComponent } from './admin/darknet-training/darknet-training.component';
import { DarknetTrainingDetailComponent } from './admin/darknet-training/darknet-training-detail/darknet-training-detail.component';
import { DarknetTrainingService } from './services/darknet-training.service';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LabelisationFormComponent,
    NavbarComponent,
    AdminComponent,
    DarknetTrainingComponent,
    DarknetTrainingDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LabelService, SettingsService, ImageService, DarknetTrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
