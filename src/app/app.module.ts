import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { LabelisationFormComponent } from './labelisation-form/labelisation-form.component';
import { LabelService } from './services/label.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    LabelisationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LabelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
