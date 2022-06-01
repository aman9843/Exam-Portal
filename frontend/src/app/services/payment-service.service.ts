import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})

export class PaymentServiceService {
  constructor(private http: HttpClient) {}

  // Payment Details


  // Add Questions

  public addOrder(order: any) {
    return this.http.post(`${baseUrl}/api/order`, order);
  }


  public setOrder(premium:any) {
    localStorage.setItem('premium',premium);
    return true;

  }

  //get All Orders

  public getAllOrders() {
    return this.http.get(`${baseUrl}/api/order`)
  }

  // delete orders via admin

  public deleteOrder(id:any) {
    return this.http.delete(`${baseUrl}/api/order/${id}`)
  }

  // get order details

  public userLoggedIn() {
    let tokenStr = localStorage.getItem('premium')
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }


  //UserOrderRemove()

  public userOrderRemove() {
    localStorage.removeItem('premium')
  }


    // get Questions
    public getOrderByUserId(id:any) {
      return this.http.get(`${baseUrl}/api/order/${id}}`);
    }




// get Order
  public getCurrentUserOrder() {
    let userStr= localStorage.getItem('order');
    if(userStr != null) {

      return JSON.parse(userStr);

    } else {

      return null;
    }
  }
}
