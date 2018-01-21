/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

/*Component*/
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { LabelisationFormComponent } from './labelisation-form/labelisation-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { DarknetTrainingComponent } from './admin/darknet-training/darknet-training.component';
import { DarknetTrainingDetailComponent } from './admin/darknet-training/darknet-training-detail/darknet-training-detail.component';
import { DarknetTrainingCreateComponent } from './admin/darknet-training/darknet-training-create/darknet-training-create.component';

/*Services*/
import { LabelService } from './services/label.service';
import { SettingsService } from './services/settings.service';
import { ImageService } from './services/image.service';
import { DarknetTrainingService } from './services/darknet-training.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LabelisationFormComponent,
    NavbarComponent,
    AdminComponent,
    DarknetTrainingComponent,
    DarknetTrainingDetailComponent,
    DarknetTrainingCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LabelService, SettingsService, ImageService, DarknetTrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
