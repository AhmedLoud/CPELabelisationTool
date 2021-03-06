/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/*Component*/
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { DarknetTrainingComponent } from './admin/darknet-training/darknet-training.component';
import { DarknetTrainingDetailComponent } from './admin/darknet-training/darknet-training-detail/darknet-training-detail.component';
import { DarknetTrainingCreateComponent } from './admin/darknet-training/darknet-training-create/darknet-training-create.component';
import { LabelsComponent } from './admin/labels/labels.component';

/*Services*/
import { LabelService } from './services/label.service';
import { SettingsService } from './services/settings.service';
import { ImageService } from './services/image.service';
import { DarknetTrainingService } from './services/darknet-training.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    NavbarComponent,
    AdminComponent,
    DarknetTrainingComponent,
    DarknetTrainingDetailComponent,
    DarknetTrainingCreateComponent,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LabelService,
    SettingsService,
    ImageService,
    DarknetTrainingService,
    LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
