import { Label } from './index';


export class DarknetTraining {
  id: number;
  is_finished: boolean;
  score: number;
  is_training: boolean;
  started_at: Date;
  finished_at: Date;
  labels: Label[];
  title: string;
  description: string;

  constructor(title: string, description: string, labels: Label[]){
    this.title = title;
    this.description = description;
    this.labels = labels;
  }

  static toJSON(darknetTraining: DarknetTraining) {
    return {
      darknet_training: {
        title: darknetTraining.title,
        description: darknetTraining.description,
        is_training: darknetTraining.is_training
      },
      labels: darknetTraining.labels
    }
  }
}

