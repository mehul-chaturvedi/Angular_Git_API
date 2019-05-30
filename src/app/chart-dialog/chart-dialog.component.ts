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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Counts This Week'},
  ];
  ngOnInit() {
    console.log(this.data, 'data');
    this.gitService.getRepoCommitCount(this.data.owner, this.data.repo).subscribe(res => {
      this.barChartLabels = res['all'].keys() + 1;
      this.barChartData.data = res['all'];
    });
  }

}
