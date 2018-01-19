import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-darknet-training-create',
  templateUrl: './darknet-training-create.component.html',
  styleUrls: ['./darknet-training-create.component.css']
})
export class DarknetTrainingCreateComponent implements OnInit {
  title = new FormControl();
  
  constructor() { }

  ngOnInit() {
  }

}
