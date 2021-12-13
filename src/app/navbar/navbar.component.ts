import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }
  userName:any = null;
  ngOnInit(): void {
    var use: any = localStorage.getItem('user');
    var user: any = JSON.parse(use);
    this.userName =  user.name;
  }

  onLogout() {
    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
