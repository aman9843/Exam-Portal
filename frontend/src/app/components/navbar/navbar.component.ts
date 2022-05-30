import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  orders:any

  constructor(public loginServices:LoginService , public order: PaymentServiceService) { }

  ngOnInit(): void {

    this.isLoggedIn= this.loginServices.isLoggedIn();
    this.user = this.loginServices.getUser();
    this.orders= this.order.userLoggedIn()
    this.loginServices.loginSbuject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginServices.isLoggedIn();
      this.user = this.loginServices.getUser();
    })

    this.orders = this.order.getOrderByUserId(this.user.id).subscribe(
      (data:any) => {
        this.orders = data
        console.log(this.orders)
      },
      (error) => {
        console.log(error)
      }
    );
  }


  public logOut() {
    this.loginServices.logOut();
    this.order.userOrderRemove()
    window.location.reload()
  }



}
