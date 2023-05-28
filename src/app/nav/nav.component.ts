import {Component, OnInit} from '@angular/core';
import {Emitters} from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  authenticated = false;
  apiUrl = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/api/logout`, {}, {withCredentials: true})
      .subscribe(() => {
        this.authenticated = false
        window.location.href="/"
      });
  }

}