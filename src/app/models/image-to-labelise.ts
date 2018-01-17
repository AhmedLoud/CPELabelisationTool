import { BoundingBox } from './index';
export class ImageToLabelise {
  id: number
  imageUrl: string;
  boundingBoxes: BoundingBox[];
}