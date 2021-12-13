import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router,

    public ngZone: NgZone
  ) {}

  apiUrl = environment.apiUrl;

  public isAuthenticated(): Boolean {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (
      (token) ||
      (user && JSON.parse(user))
    ) {
      return true;
    }
    return false;
  }

  public setToken(token:any) {
      localStorage.setItem('token', token);
  }
  public setUserInfo(data:any) {
      debugger
      var user = {
        userId:data.userId,
          name:data.userName,
          email:data.email,
          dob:data.dateOfBirth
      }
    localStorage.setItem('user', JSON.stringify(user));
    
  }

  
  signup(user:User) {
    return this.http.post(this.apiUrl + 'Auth/UserSignup', user);
  }
  

  
  login(user:User) {
    return this.http.post(this.apiUrl + 'Auth/VerifyUserLogin', user);
  }

  
}
