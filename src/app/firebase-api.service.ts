import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { AuthResponse } from './appInterface/auth-response.interface';
import { User } from './appModel/user.model';
import { Subject } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FirebaseAPIService {
  api = config.API_URL;
  user = new Subject<User>();
  constructor(private http: HttpClient) {}

  url = this.api + '/products.json';

  getProducttitleUrl = `${this.api}/dataTitle.json`;

  saveProducts(products: any[]) {
    return this.http.put(this.url, products);
  }

  fetchProducts() {
    return this.http.get(this.url);
  }
  getTitle() {
    return this.http.get(this.getProducttitleUrl);
  }

  signUp(email, password) {
    return (
      this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        })
        );
  }

  signIn(email, password) {
    return (
      this.http.post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        })
    );
  }

  private authenticationUser(email:any, userId:any, token:any, expiresIn:any) {
    const ExpirationTime = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, ExpirationTime);
    this.user.next(user);
  }
}
