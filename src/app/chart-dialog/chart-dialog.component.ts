import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GitServices } from '../services/git.service';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.css']
})
export class ChartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private gitService: GitServices) { }
  chartdata: any;
  count = 10;
  start = 1;
  nextp = false;
  prevp = false;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{ data: [], label: 'Commit Counts Per Week' }];

  ngOnInit() {
    console.log(this.data, 'data');
    this.gitService.getRepoCommitCount(this.data.owner, this.data.repo).subscribe(res => {
      this.chartdata = res;
      this.fillChart(this.start, this.count)
    });
  }

  nextPage() {
    this.nextp = true;
    this.start = this.start + 10;
    this.count = this.count + 10;
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    if (this.count <= 40) {
      this.fillChart(this.start, this.count)
    } else {
      this.prevp = true;
      this.count = 52;
      this.fillChart(this.start, this.count);
      this.count = 50;
      this.start = 41;
    }

  }

  previousPage() {
    this.start = this.start - 10;
    this.count = this.count - 10;
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    if (this.start > 1) {
      this.prevp = false;
      this.fillChart(this.start, this.count);

    } else {
        this.fillChart(this.start, this.count)
      this.nextp = false;
      this.prevp = false;
      this.count = 0;
      this.start = -9;
    }
  }

  fillChart(start, count){
    for (var i = start; i <= count; i++) {
      this.barChartData[0].data.push(this.chartdata.all[i - 1]);
      this.barChartLabels.push('Week ' + i);

    }
  }

}
