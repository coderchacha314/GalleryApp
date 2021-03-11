import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { FirebaseAPIService } from '../firebase-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode = true;
  Form: FormGroup | any;
  error:string;

  constructor(
    private fb: FormBuilder,
    private _authService: FirebaseAPIService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }

  onsubmit() {
    if (this.Form.valid) {
      console.log(this.Form.value);
      const email = this.Form.value.email;
      const password = this.Form.value.password;

      let authResponse: Observable<AuthResponse>;

      if (this.loginMode) {
        authResponse = this._authService.signIn(email, password);
      } else {
        authResponse = this._authService.signUp(email, password);
      }
      authResponse.subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.error=err.error.error.message;
        }
      );
    } else {
      //
    }
  }
}
