import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginServices :LoginService) { }

  ngOnInit(): void {
  }

  public logOut() {
    this.loginServices.logOut();
    window.location.reload()
  }

}
