import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LabelService } from '../services/label.service';
import { Label, BoundingBox } from '../models/index';
@Component({
  selector: 'app-labelisation-form',
  templateUrl: './labelisation-form.component.html',
  styleUrls: ['./labelisation-form.component.css']
})
export class LabelisationFormComponent implements OnInit {
  labels: Label[];
  selectedLabel: Label;
  isAdding: boolean;
  @Input() createdBoundingBoxs: BoundingBox[];

  @Output() labelSelected = new EventEmitter();
  @Output() save = new EventEmitter();
  constructor(private labelService: LabelService) {
  }

  ngOnInit(): void {
    this.getLabels();
  }

  getLabels(): void {
    this.labelService.getLabels().subscribe(labels => {
      this.labels = labels;
      this.selectedLabel = labels[0];
    });
  }

  onClickAdd(): void {
    this.labelSelected.emit(this.selectedLabel);
    this.isAdding = true;
  }

  onClickSave(): void {
    this.isAdding = false;
    this.save.emit();
  }


}
