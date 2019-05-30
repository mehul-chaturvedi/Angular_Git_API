import { Component, OnInit } from '@angular/core';
import { GitServices } from '../services/git.service';
import { MatDialog } from '@angular/material';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gitService: GitServices, public dialog: MatDialog) { }
repos: any;
  ngOnInit() {
  }

  gitSearch(data) {
    const da = data.value;
    this.gitService.getUserRepos(da).subscribe(res => {
      this.repos = res;
      console.log(res, 'res');
    });
  }

  openChartDialog(owner, repo) {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      data: { owner: owner, repo: repo },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
