import { Component, OnInit, Input, Output } from '@angular/core';
import { SimpleTableColumn, SimpleTableSettings } from './table-models/table-models';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {

  @Input('data') data: any[];
  @Input('columns') columns: SimpleTableColumn[];
   
  @Input('settings') settings: SimpleTableSettings;

  @Output('onEdit') onEditEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output('onDelete') onDeleteEmitter: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  
  }

  public onEditClick(editItem: any): void {
    this.onEditEmitter.emit(editItem);
    
  }

  public onDeleteClick(deleteItem: any): void {
    this.onDeleteEmitter.emit(deleteItem);
    
  }

  public isDateType(val: any): boolean {
    return (!isNaN(Date.parse(val)) && isNaN(+val));
  }

}
