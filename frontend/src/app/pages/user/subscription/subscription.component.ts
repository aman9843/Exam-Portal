import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  id: any;
  user: any;
  order = {
    QuizzId: '',
    amount: '',
  };

  constructor(
    private route: ActivatedRoute,
    private orders: PaymentServiceService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.order.QuizzId = this.id;
    this.user = this.login.getUser();
    console.log(this.user);
  }

  options = {
    key: 'rzp_test_kgFKFrMvXW3UtK',
    amount: '',
    currency: 'INR',
    name: '',
    description: 'RazorPay Payment',
    order_id: '',
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
  };

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
          QuizzId: '',
          amount: '',
        };

        this.options.name = this.user.name;
        this.options.amount = data['amount'] + '00';
        this.options.handler = this.razorPayResponseHandler;
        var rzp1 = new Razorpay(this.options);
        rzp1.on('payment.failed', function (response: any) {
          alert(response.error.code);
        });
        rzp1.open();
      },

      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });
      }
    );
  }

  razorPayResponseHandler(res: any) {
    console.log(res);
  }
}
