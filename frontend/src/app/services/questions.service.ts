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


  // Delete Questions
  public deleteQuestions(id:any) {
    return this.http.delete(`${baseUrl}/api/questions/${id}`)
  }

  //get Questions by Id
  public getQuestionsUpdated(id:any,question:any) {
    return this.http.put(`${baseUrl}/api/questions/${id}`,question)
  }
    //get Questions by Id
    public getQuestionsById(id:any) {
      return this.http.get(`${baseUrl}/api/questions/${id}`)
    }

  // get Questions by category Id
    public getQuestionsByCategoryId(id:any) {
      return this.http.get(`${baseUrl}/api/questions/quizz/${id}`)
    }


  }

