import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent implements OnInit {

  @Input() public doughnutChartLabels: string[] = [];
  @Input() public doughnutChartData: number[] = [];
  @Input() public doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
