import { Component, OnInit } from '@angular/core';

import { userService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userServices: userService, private router: Router) {}
  public user = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.name == '' || this.user.name == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter the Field!'
      })
      return;
    }

    // add user
    this.userServices.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Congratulations!',
          'Regsitered SuccessFully!',
          'success'
        )
        this.router.navigate(['/login'])
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!'
        })
      }
    );
  }
}
