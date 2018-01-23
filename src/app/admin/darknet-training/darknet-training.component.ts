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

  /**
   * Get the darknet training already existing on the database
   */
  getDarknetTrainings(): void {
    this.darknetTrainingService.getDarknetTrainings().subscribe(darknetTrainings => {
      this.darknetTrainings = darknetTrainings;
      console.log(this.darknetTrainings);
    });
  }

  /**
   * Delete the given darknetTrainingParam from the database 
   * remove it from the local variables too
   * @param darknetTraining 
   */
  onDeleteDarknetTraining(darknetTraining: DarknetTraining): void {
    if (darknetTraining.is_training) {
      console.error('cannot delete a currently training model');
      return;
    }
    if (confirm("are you sure you want to delete " + darknetTraining.title)) {
      this.darknetTrainings = this.darknetTrainings.filter(dt => {
        return dt !== darknetTraining;
      });
      this.darknetTrainingService.deleteDarknetTraining(darknetTraining).subscribe();
    }
  }

  onTrainDarknetTraining(darknetTraining: DarknetTraining): void {
    let copy = Object.assign({}, darknetTraining);
    copy.is_training = true;
    this.darknetTrainingService.updateDarknetTraining(copy)
      .subscribe(darknetTraining => {
        this.darknetTrainings = this.darknetTrainings.map(dt => {
          if (dt.id == darknetTraining.id)
            return darknetTraining
          else
            return dt;
        })
      });
  }

  onStopDarknetTraining(darknetTraining: DarknetTraining): void {
    let copy = Object.assign({}, darknetTraining);
    copy.is_training = false;
    this.darknetTrainingService.updateDarknetTraining(copy)
      .subscribe(darknetTraining => {
        this.darknetTrainings = this.darknetTrainings.map(dt => {
          if (dt.id == darknetTraining.id)
            return darknetTraining
          else
            return dt;
        })
      });
  }

  canTrain(): boolean {
    return !this.darknetTrainings.find(dt => dt.is_training);
  }
}
