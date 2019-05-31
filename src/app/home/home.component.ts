import { Component, OnInit } from '@angular/core';
import { GitServices } from '../services/git.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChartDialogComponent } from '../chart-dialog/chart-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gitService: GitServices, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
repos: any;
  ngOnInit() {
  }

  gitSearch(data) {
    const da = data.value;
    this.gitService.getUserRepos(da).subscribe(res => {
      console.log(res)
      this.repos = res;
      if(!this.repos.length){
        this.openSnackBar('No Repositories Available Try Other User Name', '');
      } 
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
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
