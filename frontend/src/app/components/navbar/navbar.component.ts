import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any;

  constructor(public loginServices:LoginService) { }

  ngOnInit(): void {

    this.isLoggedIn= this.loginServices.isLoggedIn();
    this.user = this.loginServices.getUser();
    this.loginServices.loginSbuject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginServices.isLoggedIn();
      this.user = this.loginServices.getUser();
    })

  }


  public logOut() {
    this.loginServices.logOut();
    window.location.reload()
  }



}
