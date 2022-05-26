import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class PaymentServiceService {
  constructor(private http: HttpClient) {}

  // Payment Details

  // get Questions
  public getOrder() {
    return this.http.get(`${baseUrl}/api/order`);
  }

  // Add Questions

  public addOrder(order: any) {
    return this.http.post(`${baseUrl}/api/order`, order);
  }
}
