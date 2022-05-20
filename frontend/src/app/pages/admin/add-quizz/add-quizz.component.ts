import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css'],
})
export class AddQuizzComponent implements OnInit {
  categories: any;
  quizzData = {

    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    enabled: true,
    CategoryId:'',



  };

  constructor(private cat: CategoriesService, private quizz: QuizzService, private router:Router) {}

  ngOnInit(): void {
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

  quizzSubmit() {

    if(this.quizzData.title.trim() === '' && this.quizzData.description === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter the Field!',
      });
      return;
    }
    this.quizz.addQuizz(this.quizzData).subscribe(
      (data:any) => {
         this.quizzData={
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          enabled: true,
          CategoryId:''
};
        console.log(data);
         Swal.fire('Congratulations!', 'Your Data Have Been Added!', 'success');
         this.router.navigate(['/admin/viewQuizz'])
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });
      }
    )
  }




}
