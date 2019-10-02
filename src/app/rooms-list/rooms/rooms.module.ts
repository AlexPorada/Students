import { NgModule } from '@angular/core';
import { RoomsListComponent } from '../rooms-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SimpleTableModule } from '../../shared/simple-table/simple-table/simple-table.module';
import { RoomCreateComponent } from '../room-create/room-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const roomsRouter: Routes = [
  { path: 'rooms-list', component: RoomsListComponent },
  { path: 'room-create', component: RoomCreateComponent },
  { path: 'room-create/:id', component: RoomCreateComponent }
];

@NgModule({
  declarations: [RoomsListComponent, RoomCreateComponent],
  imports: [
    SimpleTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(roomsRouter, { useHash: true })
  ]
})
export class RoomsModule { }
