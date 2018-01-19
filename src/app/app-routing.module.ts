import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { AdminComponent } from './admin/admin.component';
import { DarknetTrainingComponent } from './admin/darknet-training/darknet-training.component';

const routes: Routes = [
  { path: 'labelise', component: ImageComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'training', component: DarknetTrainingComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
