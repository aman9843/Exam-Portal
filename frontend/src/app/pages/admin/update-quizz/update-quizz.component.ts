import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quizz',
  templateUrl: './update-quizz.component.html',
  styleUrls: ['./update-quizz.component.css']
})
export class UpdateQuizzComponent implements OnInit {

  constructor(private route:ActivatedRoute, private quizz:QuizzService, private cat:CategoriesService,private router:Router) { }

  id = 0;
  quiz:any;
  categories: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.quizz.getQuiz(this.id).subscribe(
      (data)=> {
        this.quiz=data;
        console.log(data)
      },
      (error)=> {
        console.log(error);

      }
    )
    this.cat.getCategories().subscribe(
      (data: any) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in Loading File!',
        });
      }
    );
  }

  update(id:any) {
    this.quizz.updateQuiz(id,this.quiz).subscribe(

      (data:any)=>{
        this.quiz = data;
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
