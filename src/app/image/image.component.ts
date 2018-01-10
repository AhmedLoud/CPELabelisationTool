import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @ViewChild("imageCanvas") imageCanvas: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log('test');
    let context: CanvasRenderingContext2D = this.imageCanvas.nativeElement.getContext("2d");
    context.fillStyle = 'blue';
    context.fillRect(10,10,150,150);
  }

}
