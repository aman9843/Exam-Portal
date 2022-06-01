import { Component, OnInit} from '@angular/core';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import {LoginService} from 'src/app/services/login.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:any
  user:any
  subscription:any




  constructor(private order:PaymentServiceService, private login:LoginService) { }

  ngOnInit(): void {
     this.orders = this.order.getAllOrders().subscribe (
       (data:any) => {
         this.orders=data
       },
       (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong',
        });
       }
     )


  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure you want to cancel subscription?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.order.deleteOrder(id).subscribe(
          (data: any) => {
            this.orders = this.orders.filter((q: any) => q.id !== id);

            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error: any) => {
      
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong',
            });
          }
        );
      }
    });
  }

}

