import { Component, OnInit } from '@angular/core';
import { DarknetTrainingService } from '../../services/darknet-training.service'
import { DarknetTraining } from '../../models/index';
@Component({
  selector: 'app-training',
  templateUrl: './darknet-training.component.html',
  styleUrls: ['./darknet-training.component.css']
})
export class DarknetTrainingComponent implements OnInit {

  darknetTrainings: DarknetTraining[];

  constructor(private darknetTrainingService: DarknetTrainingService) { }

  ngOnInit() {
    this.getDarknetTrainings();
  }

  getDarknetTrainings(): void {
    this.darknetTrainingService.getDarknetTrainings().subscribe(darknetTrainings => {
      this.darknetTrainings = darknetTrainings;
      console.log(this.darknetTrainings);
    });
  }

}
