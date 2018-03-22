import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ImageToLabelise, BoundingBox, Label, Utilities } from '../models/index'
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router'
import { LabelService } from '../services/label.service';

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
  nextBoundingBoxLocalId: number = 0;
  context: CanvasRenderingContext2D;
  canvasImage;

  labels: Label[] = [];
  selectedBox: BoundingBox;
  selectedLabel: Label;


  @ViewChild("imageCanvas") imageCanvas: ElementRef;
  constructor(private imageService: ImageService,
    private labelService: LabelService,
    private router: Router) {
  }

  ngAfterViewInit(): void {
    this.loadCanvasContext();
    this.addEventListeners();
    if (this.image) {
      this.adaptCanvasToLoadedImage();
    }
  }

  ngOnInit(): void {
    this.getLabels();
    this.getRandomImageToLabelise();
    setInterval(() => {
      if (this.context && this.canvasImage) {
        this.drawboundingBoxes(this.canvasImage, this.context);
      }
    });

    setInterval(() => {
      console.log('selectedBoundingBox', this.selectedBox);
      console.log('currentBoundingBox', this.currentBoundingBox);
    }, 1000);
  }

  getRandomImageToLabelise(): void {
    this.imageService.getImageToLabelise().subscribe((image: ImageToLabelise) => {
      this.image = image;
      this.image.boundingBoxes = [];

    }, (error) => {
      console.log('error happened');

    });
  }

  getLabels(): void {
    this.labelService.getLabels().subscribe(labels => {
      this.labels = labels;
      this.selectedLabel = labels[0];
      this.initializeCurrentBoundingBox();
    });
  }

  onChangeLabel(): void {
    this.currentBoundingBox.label = this.selectedLabel;
  }

  addEventListeners(): void {
    /*
    Event Listener when mouse is down on the HTML canvas
     */
    this.imageCanvas.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
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
  }

  /**
   * Function load Canvas Context
   * *****************************
   * Load the canvas context
   * 
   */
  loadCanvasContext(): void {
    this.context = this.imageCanvas.nativeElement.getContext("2d");
  }

  adaptCanvasToLoadedImage(): void {
    this.canvasImage = new Image();
    this.canvasImage.src = this.image.imageUrl;
    this.canvasImage.onload = () => {
      this.context.canvas.height = this.canvasImage.height;
      this.context.canvas.width = this.canvasImage.width;
    };
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


    if (this.image) {
      //draw image to labelise
      context.drawImage(image, 0, 0);
      if (this.image.boundingBoxes) {
        //Draw all the bounding boxes associated to the image
        this.image.boundingBoxes.forEach(box => {
          context.strokeStyle = box.color;
          context.strokeRect(box.x, box.y,
            box.w, box.h);
            if(box.id === this.selectedBox.id){
              // context.ellipse(box.x,box.y,0.2,)
            }
        });
      }
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

  initializeCurrentBoundingBox(): void {
    this.currentBoundingBox = new BoundingBox();
    this.currentBoundingBox.label = this.selectedLabel;
    this.nextBoundingBoxLocalId = this.nextBoundingBoxLocalId + 1;
    this.currentBoundingBox.id = this.nextBoundingBoxLocalId;
    this.currentBoundingBox.color = Utilities.getRandomHTMLColor();
  }

  onClickSave(): void {
    if (this.currentBoundingBox.w == 0 || this.currentBoundingBox.h == 0)
      return;
    this.image.boundingBoxes.push(this.currentBoundingBox);
    this.initializeCurrentBoundingBox();
  }


  onLabeliseImage(): void {
    this.image.boundingBoxes.forEach(box => {
      box.normalize(this.canvasImage.width, this.canvasImage.height);
    });
    this.imageService.updateImage(this.image).subscribe(response => {
      this.isDrawingBoundingBox = false;
      this.imageService.getImageToLabelise().subscribe((image: ImageToLabelise) => {
        this.image = image;
        if (this.image) {
          this.initializeCurrentBoundingBox();
          this.adaptCanvasToLoadedImage();
        }
      }, (error) => {
      });
    })
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

  getBoxListColor(box: BoundingBox): string {
    if (this.isBoxSelected(box)) {
      const boundingBox: BoundingBox = this.image.boundingBoxes.find(b => b === box);
      return boundingBox.color;
    }
    else {
      return '#FFF';
    }
  }

  onDeleteBox(box: BoundingBox): void {
    this.image.boundingBoxes = this.image.boundingBoxes.filter(b => b !== box);
  }

}
