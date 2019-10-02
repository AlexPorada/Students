import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsListComponent } from '../students-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SimpleTableModule } from '../../shared/simple-table/simple-table/simple-table.module';
import { StudentCreateComponent } from '../student-create/student-create.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const studentRoutes: Routes = [
  { path: 'students-list', component: StudentsListComponent },
  { path: 'student-create', component: StudentCreateComponent }
];

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentCreateComponent
  ],
  imports: [
    SimpleTableModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    RouterModule.forRoot(studentRoutes, { useHash: true })
  ]
})
export class StudentsModule { }
