import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageToLabelise, BoundingBox } from '../models/index'

class MousePos {
  x: number;
  y: number;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})


export class ImageComponent implements OnInit {

  image: ImageToLabelise = {
    id: 1,
    imageUrl: 'https://source.unsplash.com/random',
    imagePath: 'https://source.unsplash.com/random',
    boundingBoxs: []
  };
  currentBoundingBox: BoundingBox;
  isDrawingBoundingBox: boolean;

  @ViewChild("imageCanvas") imageCanvas: ElementRef;
  constructor() {
    this.currentBoundingBox = new BoundingBox();
  }

  ngOnInit(): void {

  }

  /**
   * Function getMousePos
   * **********************
   * Return the relative coordinate of a mouse event in the HTML canvas
   * @param event 
   */
  getMousePos(event: MouseEvent): MousePos {
    let rect = this.imageCanvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    const pos: MousePos = new MousePos();
    pos.x = x;
    pos.y = y;
    return pos;
  }

  /**
   * Function drawBoundingBox
   * ************************
   * Called to draw the currentBoundingBox in the canvas
   * @param image background image 
   * @param context canvasContext
   */
  drawBoundingBox(image, context: CanvasRenderingContext2D): void {
    context.clearRect(0,0,context.canvas.width, context.canvas.height);
    context.drawImage(image, 0,0);
    context.strokeStyle = '#FF0000';
    context.strokeRect(this.currentBoundingBox.x, this.currentBoundingBox.y,
      this.currentBoundingBox.w, this.currentBoundingBox.h);
  }

  ngAfterViewInit(): void {
    let context: CanvasRenderingContext2D = this.imageCanvas.nativeElement.getContext("2d");
    const randomImage = new Image();
    randomImage.src = this.image.imageUrl;
    randomImage.onload = () => {
      context.canvas.height = randomImage.height;
      context.canvas.width = randomImage.width;
      context.drawImage(randomImage, 0, 0);

      /*
      Event Listener when mouse is down on the HTML canvas
       */
      this.imageCanvas.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
        if (!this.isDrawingBoundingBox) {
          const pos = this.getMousePos(event);
          this.isDrawingBoundingBox = true;
          this.currentBoundingBox.x = pos.x;
          this.currentBoundingBox.y = pos.y;
          this.currentBoundingBox.w = 0;
          this.currentBoundingBox.h = 0;
        }

      });

      this.imageCanvas.nativeElement.addEventListener('mousemove', (event: MouseEvent) => {
        if (this.isDrawingBoundingBox) {
          const pos = this.getMousePos(event);
          this.currentBoundingBox.w = Math.abs(pos.x - this.currentBoundingBox.x);
          this.currentBoundingBox.h = Math.abs(pos.y - this.currentBoundingBox.y);
        }
      });

      this.imageCanvas.nativeElement.addEventListener('mouseup', (event: MouseEvent) => {
        if (this.isDrawingBoundingBox) {
          this.isDrawingBoundingBox = false;

        }
      })

      setInterval(() => {
        this.drawBoundingBox(randomImage,context);    
      });
    };

  }



}
