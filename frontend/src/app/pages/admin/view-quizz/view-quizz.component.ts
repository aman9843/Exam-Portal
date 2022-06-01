import { Component, OnInit } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizz',
  templateUrl: './view-quizz.component.html',
  styleUrls: ['./view-quizz.component.css']
})
export class ViewQuizzComponent implements OnInit {

  quiz:any;
  attemp= 10;

  constructor(private quizz:QuizzService) { }

  ngOnInit(): void {

    this.quizz.getQuizz().subscribe((data:any) => {
      this.quiz=data;


    },
    (error) => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Data TO SHow',
      });

    }
    )
  }

  deleteQuiz(qid:any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        this.quizz.deleteQuiz(qid).subscribe(
          (data:any) => {
            this.quiz = this.quiz.filter((quizzes:any)=> quizzes.id != qid)

            Swal.fire('Success','Quiz Deleted','success')
          },
          (error)=>{
           
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong',
            });

          }
        )

      }

    })



  }


}
