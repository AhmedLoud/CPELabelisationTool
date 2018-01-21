import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { AdminComponent } from './admin/admin.component';
import { DarknetTrainingComponent } from './admin/darknet-training/darknet-training.component';
import { DarknetTrainingCreateComponent } from './admin/darknet-training/darknet-training-create/darknet-training-create.component';

const routes: Routes = [
  { path: 'labelise', component: ImageComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'darknet-trainings', component: DarknetTrainingComponent },
      { path: 'darknet-training-create', component: DarknetTrainingCreateComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
