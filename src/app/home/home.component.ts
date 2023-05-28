import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Emitters} from '../emitters/emitters';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = '';
  apiUrl = environment.backendUrl;
  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/api/user`, {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

}