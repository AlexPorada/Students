import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { RoomResponseDto } from '../../models/rooms/room-response';
import { StudentResponseDto } from '../../models/students/student-response';
import { Router } from '@angular/router';
import { TeacherResponseDto } from '../../models/teachers/teacher-response';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  public signForm: FormGroup;
  public rooms: RoomResponseDto[] = [];
  public teachers: TeacherResponseDto[] = [];
  public dropdownList: any[] = [];
  public dropDownSettings = {
                              singleSelection: false,
                              text: 'Select Teachers',
                              selectAllText: 'Select All',
                              unSelectAllText: 'UnSelect All',
                              enableSearchFilter: true,
                              classes: 'custom-class custom-class-example'
                            };

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'secondName': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'birthDate': new FormControl(null, [Validators.required]),
      'roomId': new FormControl(null),
      'teacherIds': new FormControl(null)
    });

    this.httpService.getRooms().subscribe((r: RoomResponseDto[]) => {
      this.rooms = r;
    });

    this.httpService.getTeachers().subscribe((t: TeacherResponseDto[]) => {
      this.teachers = t;
      this.dropdownList = this.teachers.map((t) => {
        return { id: t.id, itemName: `${t.firstName} ${t.secondName}` };
      });
    });

  }

  public onSubmit(): void {
    if (this.signForm.invalid) {

      for (var key in this.signForm.controls) {
        let control = this.signForm.controls[key];
        if (control.invalid) {
          control.markAsTouched();
        }
      }
      return;
    }
    console.log(this.signForm);
    this.sendDataToServer();
  }

  private sendDataToServer() {
    let model = new StudentResponseDto();
    model.firstName = this.signForm.controls['firstName'].value;
    model.secondName = this.signForm.controls['secondName'].value;
    model.birthDate = this.signForm.controls['birthDate'].value;
    model.roomId = this.signForm.controls['roomId'].value;

    this.httpService.saveStudent(model).subscribe((id: number) => {
      console.log('saved successful');
      this.router.navigate(['students-list']);
    },
    (error) => {
      console.log('error in saving');
    });
  }

}
