import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { RoomResponseDto } from '../models/rooms/room-response';
import { SimpleTableColumn, SimpleTableSettings } from '../shared/simple-table/table-models/table-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  public rooms: RoomResponseDto[] = [];
  public tableColumns: SimpleTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'number', title: 'Number' }
  ];

  public tableSettings: SimpleTableSettings = {
    actions: true,
    delete: true,
    edit: true
  }

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.httpService.getRooms().subscribe((r: RoomResponseDto[]) => {
      this.rooms = r;
    });
  }

  public onEditClick(editItem: RoomResponseDto): void {
    if (editItem && editItem.id) {
      this.router.navigate(['room-create'], { queryParams: { id: editItem.id } });
    }
    console.log('on edit room click');
  }
  public onDeleteClick(deleteItem: RoomResponseDto): void {
    this.rooms = this.rooms.filter((r) => { r.id !== deleteItem.id });
  }

  public onAddRoomClick() {
    this.router.navigate(['room-create']);
    console.log('add room');
  }

}
