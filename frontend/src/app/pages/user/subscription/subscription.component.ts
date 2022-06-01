import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  id: any;
  user: any;
  order = {
    amount: '',
    premiumCourse: true,
  };
  orderss: any;

  constructor(
    private route: ActivatedRoute,
    private orders: PaymentServiceService,
    private login: LoginService,
    private router: Router
  ) {}

  handler: any = null;

  ngOnInit(): void {
    this.loadStripe();
    this.user = this.login.getUser();
    this.orderss = this.orders
      .getOrderByUserId(this.user.id)
      .subscribe((data: any) => {
        this.orderss = data;

      });
  }

  submit() {
    if (this.order.amount == '' || this.order.amount == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please choose the Field!',
      });
      return;
    }

    this.orders.addOrder(this.order).subscribe(
      (data: any) => {
        this.order = {
          amount: '',
          premiumCourse: true,
        };
        this.orders.setOrder(this.order.premiumCourse);

        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L4gfeSIRvAaFQNQixc2Jwhu932YoRlyZDVeLsYzlaZW4XzYvZgOuHZ1khnIZOycPt72oQ8VVkxjFfc0ADC8ytPC00IkK1nl9w',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.

            Swal.fire(
              'Congratulations!',
              'Payment SuccessFully Done!',
              'success'
            )
          },


        });

        handler.open({
          name: this.user.name,
          email: this.user.email,
          description: 'Payment Gateway',
          amount: this.order.amount,
        });
      },

      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });

      }
    );
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L4gfeSIRvAaFQNQixc2Jwhu932YoRlyZDVeLsYzlaZW4XzYvZgOuHZ1khnIZOycPt72oQ8VVkxjFfc0ADC8ytPC00IkK1nl9w',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
         
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}


