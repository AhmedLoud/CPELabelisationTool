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
  selectedBox: BoundingBox;

  @Input() createdboundingBoxes: BoundingBox[];

  @Output() labelSelected = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() labeliseImage = new EventEmitter();

  constructor(private labelService: LabelService) {
  }

  ngOnInit(): void {
    this.getLabels();
    this.ping();
  }

  ping(): void {
    this.labelService.ping().subscribe(message => {
      console.log('ping', message);
    })
  }

  getLabels(): void {
    this.labelService.getLabels().subscribe(labels => {
      this.labels = labels;
      this.selectedLabel = labels[0];
    });
  }

  onChangeSelectedLabel(label: Label): void {
    this.isAdding = true;
    this.labelSelected.emit(this.selectedLabel);
  }

  onClickSave(): void {
    this.isAdding = false;
    this.save.emit();
  }

  onClickCancel(): void {
    this.isAdding = false;
    this.cancel.emit();
  }

  onClickBoxItem(box: BoundingBox): void {
    this.selectedBox = box;
  }

  isBoxSelected(box: BoundingBox): boolean {
    if (!this.selectedBox) {
      return false;
    }
    return box.id == this.selectedBox.id;
  }

  onLabeliseImage(): void {
    this.labeliseImage.emit();
  }

}
