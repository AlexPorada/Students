import { NgModule } from '@angular/core';
import { TeachersListComponent } from '../teachers-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SimpleTableModule } from '../../shared/simple-table/simple-table/simple-table.module';
import { TeacherCreateComponent } from '../teacher-create/teacher-create.component';

const teacherRoutes: Routes = [
  { path: 'teachers-list', component: TeachersListComponent },
  { path: 'teacher-create', component: TeacherCreateComponent }
]; 

@NgModule({
  declarations: [TeachersListComponent, TeacherCreateComponent],
  imports: [
    SimpleTableModule,
    RouterModule.forRoot(teacherRoutes, { useHash: true })
  ]
})
export class TeacherModule { }
