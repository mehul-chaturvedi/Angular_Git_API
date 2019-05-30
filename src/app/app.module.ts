import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatListModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { GitServices } from './services/git.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChartDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    ChartsModule
  ],
  entryComponents: [ChartDialogComponent],
  providers: [GitServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
