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
  // Clables:any = [];
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
  public barChartData = [{ data: [], label: 'Counts This Week' }];

  ngOnInit() {
    console.log(this.data, 'data');
    this.gitService.getRepoCommitCount(this.data.owner, this.data.repo).subscribe(res => {
      this.chartdata = res;
      for (var i = 1; i <= 10; i++) {
        this.barChartData[0].data.push(res['all'][i - 1]);
        this.barChartLabels.push('Week ' + i);
        // this.Cdata.push(res['all'][i-1]);
        // this.Clables.push('Week '+ i);
      }
      console.log(this.chartdata, 'new')
    });
  }

  nextPage() {
    this.nextp = true;
    this.start = this.start + 10;
    this.count = this.count + 10;
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    if (this.count <= 40) {
      for (var i = this.start; i <= this.count; i++) {
        this.barChartData[0].data.push(this.chartdata.all[i - 1]);
        this.barChartLabels.push('Week ' + i);
        // this.Cdata.push(res['all'][i-1]);
        // this.Clables.push('Week '+ i);
      }
      console.log(this.barChartData[0].data, 'data')
    } else {
      this.prevp = true;
      this.count = 52;
      for (var i = this.start; i <= this.count; i++) {
        this.barChartData[0].data.push(this.chartdata.all[i - 1]);
        this.barChartLabels.push('Week ' + i);
        // this.Cdata.push(res['all'][i-1]);
        // this.Clables.push('Week '+ i);
      }
      console.log(this.barChartData[0].data, 'data')
      this.count = 50;
      this.start = 41;
    }

  }

  previousPage() {
    this.start = this.start - 10;
    this.count = this.count - 10;
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    if (this.start >= 1) {
      this.prevp = false;
      for (var i = this.start; i <= this.count; i++) {
        this.barChartData[0].data.push(this.chartdata.all[i - 1]);
        this.barChartLabels.push('Week ' + i);
        // this.Cdata.push(res['all'][i-1]);
        // this.Clables.push('Week '+ i);
      }
      console.log(this.barChartData[0].data, 'data')

    } else {
      this.nextp = false;
      this.prevp = false;
      this.count = 0;
      this.start = -9;
    }
    console.log(this.barChartData[0].data, this.start, 'data')
  }

}
