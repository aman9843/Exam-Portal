import { LocationStrategy } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';


declare var Razorpay: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {





  options = {
    "key": "rzp_live_boZzP5mjjMxPk4YPI91YkTCOw7K",
    "amount": "200",
    "name": "Aman Prasad",
    "description": "Web Development",
    "image": "https://example.com/your_logo",
    "order_id": "",
    "handler": (res: any) => {

       console.log(res)
    },



  };


  pay() {

    
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }





  id: any;
  question: any;
  marksGot = 0;
  correctAnswers = 0;
  attemp = 0;
  maxMarks = 100;
  timer: any;
  isSubmit = false;



  constructor(
    private locationst: LocationStrategy,
    private questions: QuestionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.preventBack();
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions.getQuestionsByCategoryId(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.question = data;
        this.timer = this.question.length * 10 * 60;

        this.question.forEach((q: any) => {
          q['givenAnswers'] = '';
        });

        console.log(this.question);
        this.startTimer();
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

  // Prevent Back Button
  preventBack() {
    history.pushState(null, location.href);
    this.locationst.onPopState(() => history.pushState(null, location.href));
  }

  // Submit
  submitQuiz() {
    Swal.fire({
      title: 'Are you sure you want to submit?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((e) => {
      if (e.isConfirmed) {
        this.isSubmit = true;
        this.submitDirect();
      }

      console.log('Correct Answers:' + this.correctAnswers);
      console.log('Marks Got:' + this.marksGot);
      console.log('Attempt', this.attemp);
    });
  }

  // Set Time FOr Quiz
  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitDirect();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  // Format it according to min & Sec
  formatTime() {
    let m = Math.floor(this.timer / 60);
    let s = this.timer - m * 60;
    return `${m} min: ${s} sec`;
  }

  // Directly Submit When Quiz is over
  submitDirect() {
    this.question.forEach((q: any) => {
      if (q.givenAnswers == q.answers) {
        this.correctAnswers++;
        let marksSingle = this.maxMarks / this.question.length;
        this.marksGot = Math.round(marksSingle + this.marksGot);
      }

      if (q.givenAnswers.trim() !== '') {
        this.attemp++;
      }
    });
  }

  savePdf() {
    window.print();
  }



}
