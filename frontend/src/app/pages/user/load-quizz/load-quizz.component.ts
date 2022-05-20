import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizz',
  templateUrl: './load-quizz.component.html',
  styleUrls: ['./load-quizz.component.css'],
})
export class LoadQuizzComponent implements OnInit {
  id: any;
  quizz:any;
  cid:any

  constructor(private route: ActivatedRoute, private quiz: QuizzService) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id == 0) {
        this.quiz.getQuizz().subscribe(
          (data: any) => {
            this.quizz = data;
            console.log(this.quizz);
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error in Loading All Quizzes!',
            });
          }
        );
      } else {

        console.log('Load Specific Quizz');
        this.quiz.getQuizzByCategoryId(this.id).subscribe(
          (data:any) => {
            this.quizz = data;
            console.log(this.quizz);

          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error in Loading All Quizzes!',
            });
          }
        );
      }
    });
  }

}
