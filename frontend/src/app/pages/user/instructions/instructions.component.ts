import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  id:any;
  quizz:any;

  constructor(private route:ActivatedRoute,private quiz:QuizzService,private router:Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.quiz.getQuiz(this.id).subscribe(
      (data:any) => {

        this.quizz = data
      },
      (error) => {
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in Loading All Quizzes!',
        });
      }
    )
  }

  onStart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if(result.isConfirmed) {

        this.router.navigate(['/start/'+this.id])




      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", '', 'info')
      }


    })

  }





}
