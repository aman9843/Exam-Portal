import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private loginServices: LoginService, private order:PaymentServiceService, private router:ActivatedRoute) { }
  user:any
  orders:any
  id:any
  ngOnInit(): void {

    this.id = this.router.snapshot.params['id']
    console.log(this.id)
    this.user = this.loginServices.getUser();
    console.log(this.user)


    this.orders = this.order.getOrderByUserId(this.id).subscribe(
      (data:any) => {
        this.orders = data
        console.log(this.orders)
      },
      (error) => {
        console.log(error)
      }
    );


  }

}
