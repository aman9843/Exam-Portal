import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  id: any;
  title: any;
  question: any;
  quiz: any;
  quest: any;
  constructor(
    private route: ActivatedRoute,
    private questions: QuestionsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];


    this.questions.getQuestionsByCategoryId(this.id).subscribe(
      (data: any) => {
        this.question = data;

      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Data TO SHow',
        });
      }
    );
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questions.deleteQuestions(id).subscribe(
          (data: any) => {
            this.question = this.question.filter((q: any) => q.id !== id);

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
