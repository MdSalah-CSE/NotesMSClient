import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import {User} from '../Models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService, private router:Router) { }
  isExist:any;
  currentUser:any={
    id:null,
    email:'',
    password:''
  }

  ngOnInit(): void {
  }

  login(){
    if (this.currentUser.email != '' && this.currentUser.password != '') {
      debugger
      this.authService.login(this.currentUser).subscribe(

        (data:any) => {
          debugger
        console.log(data)
        if(data.retCode == 1){
          this.authService.setToken(data.token);
          this.authService.setUserInfo(data);
          
    this.router.navigate(['/dashboard']);
        }else{
          alert("Username or password doesn't match")
        }
        
        },
        error => {
          
        }
     )
      
      
    }
  }



}

