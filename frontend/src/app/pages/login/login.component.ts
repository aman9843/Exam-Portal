import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private order:PaymentServiceService) {}

  public user = {
    email: '',
    password: '',
  };

  ngOnInit(): void {

  }

  formSubmit() {

    if (this.user.email.trim() == '' || this.user.email == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter the Field!',
      });
      return;
    }

    this.loginService.loginUser(this.user).subscribe(
      (data: any) => {
     

        this.loginService.generateToken(data.token);



        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);



          if (this.loginService.getUserRole() === false) {
            this.router.navigate(['/user/0']);

            this.loginService.loginSbuject.next(true);
          } else if (this.loginService.getUserRole() === true) {
            this.router.navigate(['/admin/profile']);
            this.loginService.loginSbuject.next(true);
          } else {
            this.loginService.logOut();
            this.order.userOrderRemove();
          }
        });

        Swal.fire('Congratulations!', 'Login SuccessFully!', 'success');

       this.order.getOrderByUserId(data.id).subscribe(
         (data:any) => {

           this.order.setOrder(data[0].premiumCourse)
         },
         (error) => {

         }
       )

      },
      (error) => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong Credentials!',
        });
      }
    );
  }
}
