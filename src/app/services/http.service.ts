import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StudentResponseDto } from '../models/students/student-response';
import { RoomResponseDto } from '../models/rooms/room-response';
import { TeacherResponseDto } from '../models/teachers/teacher-response';

@Injectable()
export class HttpService {

  private baseServerUrl: string = 'http://localhost:62507/api/';

  constructor(private httpClient: HttpClient) { }

  public getStudents(): Observable<StudentResponseDto[]> {
    return this.httpClient.get<StudentResponseDto[]>(this.baseServerUrl + 'Students');
  }

  public getTeachers(): Observable<TeacherResponseDto[]> {
    return this.httpClient.get<TeacherResponseDto[]>(this.baseServerUrl + 'Teacher/getTeachers');
  }

  public getRooms(): Observable<RoomResponseDto[]> {
    return this.httpClient.get<RoomResponseDto[]>(this.baseServerUrl + 'Room');
  }

  public saveStudent(student: StudentResponseDto): Observable<number> {
    return this.httpClient.post<number>(this.baseServerUrl + 'Students', student);

  }

  public saveRoom(room: RoomResponseDto): Observable<number> {
    if (!room) {
      throw new Error('Null Argument exception');
    }
    return this.httpClient.post<number>(this.baseServerUrl + 'Room', room);
  }

  public updateRoom(room: RoomResponseDto): Observable<boolean> {
    if (!room) {
      throw new Error('Null Argument exception');
    }
    return this.httpClient.put<boolean>(this.baseServerUrl + 'Room/' + room.id, room);
  } 

  public getRoomById(roomId: number): Observable<RoomResponseDto> {
    return this.httpClient.get<RoomResponseDto>(this.baseServerUrl + 'Room/' + roomId);
  }
}
