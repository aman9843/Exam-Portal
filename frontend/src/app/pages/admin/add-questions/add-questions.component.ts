import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  id:any;
  question={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answers:''

  }

  constructor(private route:ActivatedRoute, private questions:QuestionsService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
   
  }

}
