import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  //getting category details

  public getCategories() {
    return this.http.get(`${baseUrl}/api/category/allcategory`);
  }


  public addCategories(category:any) {
    return this.http.post(`${baseUrl}/api/category/addcategory`,category);
  }
}
