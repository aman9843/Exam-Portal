import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css'],
})
export class AddQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;

  id: any;
  title: any;
  question = {
    QuizzId: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    premium: true,
    answers: '',
  };

  constructor(
    private route: ActivatedRoute,
    private questions: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    console.log(this.id);
    console.log(this.title);
    this.question.QuizzId = this.id;
  }

  submit() {
    if (this.question.content.trim() === '' && this.question.option1 === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter the Field!',
      });
      return;
    }

    this.questions.addQuestions(this.question).subscribe(
      (data: any) => {
        Swal.fire('Congratulations!', 'Your Data Have Been Added!', 'success');
        this.question = {
          QuizzId: {},
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          premium: true,
          answers: '',
        };

      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });
      }
    );
  }
}
