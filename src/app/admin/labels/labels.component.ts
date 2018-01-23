import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../services/label.service';
import { Label } from '../../models/index';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  labels: Label[];
  hoverIndex: number;
  constructor(private labelService: LabelService) { }

  ngOnInit() {
    this.getLabels();
  }

  getLabels(): void {
    this.labelService.getLabels().subscribe(labels => {
      this.labels = labels;
    });
  }

  addLabel(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.labelService.createLabel({ name } as Label).subscribe(label => {
      this.labels.push(label);
    })
  }

  onDeleteLabel(label: Label): void {
    this.labels = this.labels.filter(l => l !== label);
    this.labelService.deleteLabel(label).subscribe();
  }

}
