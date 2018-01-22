import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Label, DarknetTraining } from '../../../models/index';
import { LabelService } from '../../../services/label.service';
import { DarknetTrainingService } from '../../../services/darknet-training.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-darknet-training-create',
  templateUrl: './darknet-training-create.component.html',
  styleUrls: ['./darknet-training-create.component.css']
})
/**
 * This component is used to create a new DarknetTraining and save it 
 * to the server side through the darknetTrainingService
 */
export class DarknetTrainingCreateComponent implements OnInit {
  darknetTrainingForm: FormGroup;
  labelOptions: Label[];
  darknetTraining: DarknetTraining;


  constructor(private fb: FormBuilder,
    private labelService: LabelService,
    private darknetTrainingService: DarknetTrainingService,
    private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.darknetTrainingForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      labels: this.fb.array([]), //<----labels as an empty form array

    });
  }

  setLabels(labels: Label[]): void {
    const labelFGs = labels.map(label => this.fb.group(label));
    const labelFromArray = this.fb.array(labelFGs);
    this.darknetTrainingForm.setControl('labels', labelFromArray);
  }

  get labels(): FormArray {
    return this.darknetTrainingForm.get('labels') as FormArray;
  }

  /**
   * push a default label  to the form array labels
   */
  addLabel(): void {
    // const usedLabels: Label[] = this.darknetTrainingForm.value.labels.map((label: Label) => {
    //   return Object.assign({}, label);
    // });
    // console.log('used', usedLabels);
    // console.log('options', this.labelOptions)
    // this.labelOptions = this.labelOptions.filter(option => {
    //   return usedLabels.includes(option);
    // });
    // console.log(this.labelOptions)
    //TODO filter and remove already used option :)
    this.labels.push(this.fb.group(this.labelOptions[0]));
  }

  /**
   * Remove the label at the index labelIndex from the form array labels
   * @param labelIndex 
   */
  removeLabel(labelIndex: number): void {
    this.labels.removeAt(labelIndex);
  }

  ngOnInit() {
    this.labelService.getLabels().subscribe(labels => {
      this.labelOptions = labels;
    });
  }

  /**
   * Create a new DarknetTraining having attributes from the formModel and
   * saved it on the database
   */
  prepareSaveDarknetTraining(): DarknetTraining {
    const formModel = this.darknetTrainingForm.value;

    // deep copy of form model 
    const labelsDeepCopy: Label[] = formModel.labels.map((label: Label) => {
      console.log('label', label)
      return Object.assign({}, label);
    });

    //return new DarknetTrainingModel containing params from the form created by the user
    const darknetTraining: DarknetTraining = new DarknetTraining(
      formModel.title as string,
      formModel.description as string,
      labelsDeepCopy
    )

    return darknetTraining;
  }

  onSubmit(): void {
    this.darknetTraining = this.prepareSaveDarknetTraining();
    this.darknetTrainingService.createDarknetTraining(this.darknetTraining)
      .subscribe((darknetTraining) => {
        console.log(darknetTraining);
        this.router.navigateByUrl('/admin/darknet-trainings');

      }, (errors) => {
        console.log(errors);
      });
  }

  onChangeLabelName(labelName: string, formArrayIndex: number) {
    const labelAssociated = this.labelOptions.find(l => {
      return l.name == labelName;
    });
    console.log(labelAssociated);
    this.labels.removeAt(formArrayIndex);
    this.labels.insert(formArrayIndex, this.fb.group(labelAssociated));
  }

}
