import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { TeacherResponseDto } from '../models/teachers/teacher-response';
import { last } from '@angular/router/src/utils/collection';
import { SimpleTableColumn, SimpleTableSettings } from '../shared/simple-table/table-models/table-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  public teachers: TeacherResponseDto[] = [];
  public tableColumns: SimpleTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'secondName', title: 'Second Name' }
  ];

  public tableSettings: SimpleTableSettings = {
    actions: true,
    delete: true,
    edit: true
  }

  constructor(private httpService: HttpService, private router:Router ) { }

  ngOnInit() {
    this.httpService.getTeachers().subscribe((tchs: TeacherResponseDto[]) => {
      this.teachers = tchs;
    });
    
  }

  public onEditClick(editItem: TeacherResponseDto): void {
    console.log('teacher edit click');
  }
  public onDeleteClick(deleteItem: TeacherResponseDto): void {
    this.teachers = this.teachers.filter((t) => t.id != deleteItem.id);
  }

  public onAddTeacherClick(): void {
    this.router.navigate(['teacher-create']);
    console.log('add new teacher');
  }

}
