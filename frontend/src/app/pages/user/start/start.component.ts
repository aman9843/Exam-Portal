import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  id:any
  question:any
  marksGot =0;
  correctAnswers = 0;
  attemp = 0;
  constructor(private locationst: LocationStrategy , private questions:QuestionsService, private route:ActivatedRoute) {}

  ngOnInit(): void {

    this.preventBack();
    this.id = this.route.snapshot.params['id']
    console.log(this.id);
    this.loadQuestions();
  }


  loadQuestions() {
    this.questions.getQuestionsByCategoryId(this.id).subscribe((data:any) => {
      console.log(data)
      this.question= data

      this.question.forEach((q:any) => {
        q['givenAnswers'] = ''

      });

      console.log(this.question)
    },

    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Data TO SHow',
      });


    },



    )
  }

  preventBack() {
    history.pushState(null, location.href);
    this.locationst.onPopState(() =>
      history.pushState(null,location.href)
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((e) => {
      if(e.isConfirmed) {
        this.question.forEach((q:any) => {
          if(q.givenAnswers == q.answer) {
            this.correctAnswers++;
            let marksSingle =
            this.question[0].maxMarks/this.question.length;
            this.marksGot += marksSingle
          }
        });

        console.log("Correct Answers:"+this.correctAnswers);
        console.log("Marks Got:"+ this.marksGot)
      }
    })
  }
}

