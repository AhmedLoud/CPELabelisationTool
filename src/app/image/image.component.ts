import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageToLabelise } from '../models/index'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  image: ImageToLabelise = {
    id: 1,
    imageUrl: 'https://source.unsplash.com/random',
    imagePath: 'https://source.unsplash.com/random'
  }
  @ViewChild("imageCanvas") imageCanvas: ElementRef;
  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('test');
    let context: CanvasRenderingContext2D = this.imageCanvas.nativeElement.getContext("2d");
    const randomImage = new Image();
    randomImage.src = 'https://source.unsplash.com/random';
    randomImage.onload = () => {
      context.canvas.height = randomImage.height;
      context.canvas.width = randomImage.width;
      context.drawImage(randomImage, 0,0);
    };

  }

}
