import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: []
})
export class Graphic1Component implements OnInit {

  graficos: any = {
    grafico1: {
      labels: ['Beans', 'Sweet', 'Ice'],
      data:  [24, 30, 46],
      type: 'doughnut',
      leyenda: 'Random Items'
    },
    grafico2: {
      labels: ['Men', 'Women'],
      data:  [4500, 6000],
      type: 'doughnut',
      leyenda: 'Interviews'
    },
    grafico3: {
      labels: ['Yes', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      leyenda: 'Do you have a crush?'
    },
    grafico4: {
      labels: ['No', 'Yes'],
      data:  [85, 15],
      type: 'doughnut',
      leyenda: 'Have you seen a 3D waifu?'
    },
  };


  constructor() { }

  ngOnInit() {
  }

}
