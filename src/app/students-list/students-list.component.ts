import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StudentResponseDto } from '../models/students/student-response';
import { SimpleTableColumn, SimpleTableSettings } from '../shared/simple-table/table-models/table-models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public students: StudentResponseDto[] = [];

  public tableColumns: SimpleTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'secondName', title: 'Second Name' },
    { key: 'birthDate', title: 'Birth Date' },
  ];

  public tableSettings: SimpleTableSettings = {
    actions: true,
    delete: true,
    edit: true
  }

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
        
    this.httpService.getStudents().subscribe((st: StudentResponseDto[]) => {
      this.students = st;
     });
  }

  public onEditTableClick(editSt: StudentResponseDto):void {
    console.log('onEdit clicked');
    console.log(editSt);
  }

  public onDeleteTableClick(deleteSt: StudentResponseDto): void {
    console.log('onDelete clicked');
    this.students = this.students.filter((el) => el.id != deleteSt.id);
  }

  public onAddStudentClick(): void {
    this.router.navigate(['student-create']);
    console.log('on add student click');
  }

}
