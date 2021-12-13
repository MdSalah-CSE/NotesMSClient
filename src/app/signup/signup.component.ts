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

  currentUser:User={
    id:null,
    name:'',
    email:'',
    password:'',
    dateOfBirth:''
  }
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  signup(){
    if (this.currentUser.email != '' && this.currentUser.password != '') {
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
