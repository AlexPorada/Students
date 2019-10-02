import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SimpleTableComponent } from '../simple-table.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [SimpleTableComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    BrowserModule,
    SimpleTableComponent
  ]
})
export class SimpleTableModule { }
