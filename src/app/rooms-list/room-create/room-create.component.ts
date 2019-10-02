import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { RoomResponseDto } from '../../models/rooms/room-response';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit, OnDestroy {

  constructor(private httpService:HttpService, private router:Router, private route: ActivatedRoute) { }

  public signForm: FormGroup;

  private routeObservable: Subscription;

  ngOnInit() {
    this.routeObservable = this.route.queryParams.subscribe(
      (params: Params) => {
        let id: number = +params['id'];
        console.log('params');
        console.log(params);
        console.log('id');
        console.log(id);
        if (id) {
          console.log('editing room');
          this.httpService.getRoomById(id).subscribe((room: RoomResponseDto) => {
            if (room) {
              this.signForm.controls['number'].setValue(room.number) ;
              this.signForm.controls['id'].setValue(room.id) ;
            }
          },
            (error) => {
              console.log("can't get room with id ");
            });
        }
    });
    this.signForm = new FormGroup({
      'id': new FormControl(null),
      'number': new FormControl('', [Validators.required, Validators.pattern('[0-9]+')])
    });
  }

  ngOnDestroy() {
    this.routeObservable.unsubscribe();
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
    if (!this.signForm.controls['id']) {
      this.createRoom();
    }
    else {
      this.updateRoom();
    }
  }

  private updateRoom() {
    let roomModel: RoomResponseDto = new RoomResponseDto();
    roomModel.number = +this.signForm.controls['number'].value;
    roomModel.id = +this.signForm.controls['id'].value;
    this.httpService.updateRoom(roomModel).subscribe((isSuccess: boolean) => {
      if (isSuccess) {
        this.router.navigate(['rooms-list']);
      }
      else {
        console.log('error in updating')
      }
    }, (error) => {
      console.log('error on server side');
      console.log(error);
      });
  }

  private createRoom(): void {
    let roomModel: RoomResponseDto = new RoomResponseDto();
    roomModel.number = +this.signForm.controls['number'].value;
    roomModel.id = +this.signForm.controls['id'].value;
    this.httpService.saveRoom(roomModel).subscribe((id: number) => {
      console.log('room saved succesfull');
      this.router.navigate(['rooms-list']);
    },
      (error) => {
        console.log('error in saving');
      });
  }

}
