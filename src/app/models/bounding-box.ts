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
  }

  static toJSON(b) {
    return {
      x: b.x,
      y: b.y,
      w: b.w,
      h: b.h,
      label: b.label
    }
  }



}