import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;
  @Input('name') leyend = 'Leyend';
  @Input() percentage = 50;

  @Output() increaserValue: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange( newValue: number) {

    // let elemHTML: any = document.getElementsByName('percentage') [0];
    // console.log(this.txtProgress);


    if ( newValue >= 100 ){
      this.percentage = 100;
    } else if ( newValue <= 0 ) {
      this.percentage = 0;
    } else {
    this.percentage = newValue;
    }

    this.txtProgress.nativeElement.value = this.percentage;

    this.increaserValue.emit( this.percentage );

  }

  changeValue( value ) {

    if(this.percentage >= 100 && value > 0){
      this.percentage = 100;
      return;
    }
    if(this.percentage <= 0 && value < 0){
      this.percentage = 0;
      return;
    }
    this.percentage = this.percentage + value;

    this.increaserValue.emit( this.percentage );

    this.txtProgress.nativeElement.focus();
  }

}
