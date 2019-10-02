import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { HomeModule } from './home/home.module';
import { RoomsModule } from './rooms-list/rooms/rooms.module';
import { StudentsModule } from './students-list/students/students.module';
import { TeacherModule } from './teachers-list/teacher/teacher.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SimpleTableModule } from './shared/simple-table/simple-table/simple-table.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleTableModule,
    HomeModule,
    RoomsModule,
    StudentsModule,
    TeacherModule,
    HttpClientModule
  ],
  providers: [
    HttpService, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
