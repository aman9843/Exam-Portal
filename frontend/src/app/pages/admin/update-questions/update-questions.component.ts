import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.css']
})
export class UpdateQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
  question:any
  quizzes:any
  id = 0;

  constructor(private router:Router, private questions:QuestionsService, private quizz:QuizzService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.questions.getQuestionsById(this.id).subscribe(
      (data:any) => {
        this.question = data


      },
      (error)=> {


      }
    )


    this.quizz.getQuizz().subscribe(
      (data: any) => {

        this.quizzes = data;
      },
      (error) =>{
     
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in Loading File!',
        });
      }
    )
  }

  submit(id:any){
    this.questions.getQuestionsUpdated(id,this.question).subscribe(

      (data:any)=>{
        this.question = data;
        console.log(data)
        Swal.fire('Congratulations!', 'Your Data Have Been Updated!', 'success');
        this.router.navigate(['/admin/viewQuizz'])
      },
      (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });
      }
    )

  }

}
