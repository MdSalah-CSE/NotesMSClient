import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  confirmPassword:any = null;
  isPassMatched:boolean = false;
  isPassMorethan5:boolean = false;
  currentUser:any={
    id:null,
    name:'',
    email:'',
    password:'',
    dateOfBirth:''
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onPassword(){
    if(this.currentUser.password.length > 5){
      this.isPassMorethan5 = true;
    }else{
      this.isPassMorethan5 = false;
    }
  }

  onConfirmPassword(){
    debugger
    if(this.currentUser.password.length > 5 && this.currentUser.password == this.confirmPassword){
      this.isPassMatched = true;
    }else{
      this.isPassMatched = false;
    }
  }


  signup(){
    if (this.currentUser.email != '' && this.currentUser.password != '') {
      if(this.currentUser.password.length <= 5){
        alert("Password should be more atleast character")
        return;
      }
      if(this.isPassMatched == false){
        alert("Password doesn't match")
        return;
      }
      debugger
      this.authService.signup(this.currentUser).subscribe(

        (data:any) => {
          debugger
        console.log(data)
        if(data.retCode == 1){
        alert("Successfully Created Account")
        this.router.navigate(['/login']);
        }else{
          alert("Please try again")
        }
        
        },
        error => {
          
        }
     )
      
      
    }
  }

}
