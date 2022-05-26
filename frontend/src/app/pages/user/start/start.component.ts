import { LocationStrategy } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  // rzp_test_kgFKFrMvXW3UtK

  id: any;
  order: any;
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
    private route: ActivatedRoute,
    private router:Router
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

  // options = {
  //   key: 'rzp_test_kgFKFrMvXW3UtK',
  //   amount: '10000',
  //   currency: 'INR',
  //   name: 'Aman Prasad',
  //   description: 'RazorPay Integration',
  //   handler: (res: any) => {
  //     var event = new CustomEvent('payment.success', {
  //       detail: res,
  //       bubbles: true,
  //       cancelable: true,
  //     });
  //     window.dispatchEvent(event);
  //   },
  // };

  subscribe() {
    Swal.fire({
      title: 'Are You Sure you want to subscribe?',
      text: 'You need to pay for Premium Quizz !',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((e) => {
      if (e.isConfirmed) {

        this.router.navigate(['/subscription/'+this.id])


       }
    });
  }
}
