import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

id:any;
title:any;
question:any;
  constructor(private route:ActivatedRoute, private questions:QuestionsService) { }

  ngOnInit(): void {
   this.id= this.route.snapshot.params['id'];
   this.title= this.route.snapshot.params['title'];
   console.log(this.id);
   console.log(this.title)


   this.questions.getQuestions().subscribe((data:any) => {
    this.question=data;
    console.log(this.question)

  },
  (error) => {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No Data TO SHow',
    });

  }
  )
  }






}
