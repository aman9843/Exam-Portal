import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }


  // get Questions
  public getQuestions() {
    return this.http.get(`${baseUrl}/api/questions`);
  }

  // Add Questions

  public addQuestions(question:any) {
    return this.http.post(`${baseUrl}/api/questions`,question)
  }
}
