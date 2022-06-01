import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class userService {
  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/api/users/register`, user);
  }

  public getUser(id: any) {
    return this.http.get(`${baseUrl}/api/users/profile/${id}`);
  }

  public updateUser(id: any, user: any) {
    return this.http.put(`${baseUrl}/api/users/profile/${id}`, user);
  }
}
