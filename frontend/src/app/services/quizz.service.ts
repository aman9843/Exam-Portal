import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http : HttpClient) { }


  // viewQuizz

  public getQuizz() {
    return this.http.get(`${baseUrl}/api/quizz/quizz`);
  }
 // add Quizz
  public addQuizz(quizz:any) {
    return this.http.post(`${baseUrl}/api/quizz/quizz`,quizz)
  }
 // Delete Quizz
  public deleteQuiz(id:any) {
    return this.http.delete(`${baseUrl}/api/quizz/quizz/${id}`);


  }

  // Get Quizz with respect to id
  public getQuiz(id:any) {
    return this.http.get(`${baseUrl}/api/quizz/quizz/${id}`);


  }

  //Update Quizz with respect to id
  public updateQuiz(id:any,quizz:any) {
    return this.http.put(`${baseUrl}/api/quizz/quizz/${id}`,quizz);
  }
}
