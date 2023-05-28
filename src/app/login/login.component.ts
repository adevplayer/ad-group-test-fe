import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { environment } from 'src/environments/environments';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  authenticated = false;
  apiUrl = environment.backendUrl;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/api/user`, {withCredentials: true}).subscribe(
      (res: any) => {
        Emitters.authEmitter.emit(true);
        this.router.navigate(['/']);
      },
      err => {
        Emitters.authEmitter.emit(false);
      }
    );
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.http.post(`${this.apiUrl}/api/login`, this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/']));
  }
}