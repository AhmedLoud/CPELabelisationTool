import { Label } from './index';

export class BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: Label
  id: number;


  constructor() {
    this.w = 0;
    this.h = 0;
  }

  static toJSON(b: BoundingBox) {
    return {
      x: b.x,
      y: b.y,
      w: b.w,
      h: b.h,
      label: b.label
    }
  }

  static fromJSON(b) {

  }




  normalize(image_width: number, image_height: number): void {
    //(x,y) moved to center of bounding box
    this.x = this.x + (this.w / 2);
    this.y = this.y + (this.h / 2);

    //Normalize x, y
    this.x = this.x / image_width;
    this.y = this.y / image_height;

    //Normalize w, h
    this.w = this.w / image_width;
    this.h = this.h / image_height;
  }



}