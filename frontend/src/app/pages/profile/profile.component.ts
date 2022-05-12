import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;

  constructor(private loginServices: LoginService) { }

  ngOnInit(): void {

    this.user = this.loginServices.getUser();
    console.log(this.user)


  }

}
