import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ImageToLabelise, BoundingBox, Label, Utilities } from '../models/index'
import { ImageService } from '../services/image.service';

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

  image: ImageToLabelise;

  currentBoundingBox: BoundingBox;
  isDrawingBoundingBox: boolean;
  canStartDrawingBoundingBox: boolean = false;
  nextBoundingBoxLocalId: number;

  @ViewChild("imageCanvas") imageCanvas: ElementRef;
  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {

  }

  /**
   * Function load Canvas Context
   * *****************************
   * Load the canvas context and add the needed listener
   * 
   */
  loadCanvasContext(): void {
    let context: CanvasRenderingContext2D = this.imageCanvas.nativeElement.getContext("2d");
    this.nextBoundingBoxLocalId = 0;
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
        if (this.canStartDrawingBoundingBox) {
          if (!this.isDrawingBoundingBox) {
            const pos = this.getMousePos(event);
            this.isDrawingBoundingBox = true;
            if (this.currentBoundingBox) {
              this.currentBoundingBox.x = pos.x;
              this.currentBoundingBox.y = pos.y;
              this.currentBoundingBox.w = 0;
              this.currentBoundingBox.h = 0;
            }
            console.log('(', pos.x, ',', pos.y, ')');
          }
        }

      });

      this.imageCanvas.nativeElement.addEventListener('mousemove', (event: MouseEvent) => {
        if (this.isDrawingBoundingBox) {
          const pos = this.getMousePos(event);
          if (this.currentBoundingBox) {
            this.currentBoundingBox.w = Math.abs(pos.x - this.currentBoundingBox.x);
            this.currentBoundingBox.h = Math.abs(pos.y - this.currentBoundingBox.y);
          }
        }
      });

      setInterval(() => {
        this.drawboundingBoxes(randomImage, context);
      });
    };
  }

  ngAfterViewInit(): void {
    this.imageService.getImageToLabelise().subscribe((image: ImageToLabelise) => {
      this.image = image;
      console.log('test', this.image);
      console.log(typeof this.image);
      if(this.image){

        this.loadCanvasContext();
      }
    }, (error) => {
      console.log('error happened');
    });

  }

  @HostListener('mouseup', ['$event'])
  onMouseup() {
    if (this.isDrawingBoundingBox) {
      this.isDrawingBoundingBox = false;
    }
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
  drawboundingBoxes(image, context: CanvasRenderingContext2D): void {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    //draw image to labelise
    context.drawImage(image, 0, 0);

    if (this.image.boundingBoxes) {
      //Draw all the bounding boxes associated to the image
      this.image.boundingBoxes.forEach(box => {
        context.strokeStyle = box.color;
        context.strokeRect(box.x, box.y,
          box.w, box.h);
      });
    }



    //Draw current bounding box
    if (this.currentBoundingBox) {
      context.strokeStyle = this.currentBoundingBox.color;
      context.shadowBlur = 100;
      context.shadowColor = "blue";
      context.strokeRect(this.currentBoundingBox.x, this.currentBoundingBox.y,
        this.currentBoundingBox.w, this.currentBoundingBox.h);

    }
  }


  startDrawingBoundingBox(label: Label): void {
    this.canStartDrawingBoundingBox = true;
    this.nextBoundingBoxLocalId = this.nextBoundingBoxLocalId + 1;
    this.currentBoundingBox = new BoundingBox();
    this.currentBoundingBox.classNumber = label.id;
    this.currentBoundingBox.className = label.name;
    this.currentBoundingBox.id = this.nextBoundingBoxLocalId;
    this.currentBoundingBox.color = Utilities.getRandomHTMLColor();
  }

  saveDrawnBoundingBox(): void {
    this.image.boundingBoxes.push(this.currentBoundingBox);
    this.canStartDrawingBoundingBox = false;
    this.isDrawingBoundingBox = false;
  }

  cancelDrawnBoundingBox(): void {
    this.canStartDrawingBoundingBox = false;
    this.isDrawingBoundingBox = false;
    delete this.currentBoundingBox;
  }

}
