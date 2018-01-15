import { Component, OnInit } from '@angular/core';
import { LabelService } from '../services/label.service';
import { Label } from '../models/index';
@Component({
  selector: 'app-labelisation-form',
  templateUrl: './labelisation-form.component.html',
  styleUrls: ['./labelisation-form.component.css']
})
export class LabelisationFormComponent implements OnInit {
  labels: Label[];
  selectedLabel: Label;
  constructor(private labelService: LabelService) {
    this.selectedLabel = new Label();
    this.selectedLabel.id = 0;
    this.selectedLabel.name = 'NONE';
   }

  ngOnInit() {
    this.getLabels();
  }

  getLabels(): void {
    this.labelService.getLabels().subscribe(labels => {
      this.labels = labels;
      this.selectedLabel = labels[0];
      console.log('here', this.labels)
    });
  }

}
