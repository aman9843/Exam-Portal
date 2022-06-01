import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user:any
  id:any

  constructor(private users:userService,private router:Router, private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.users.getUser(this.id).subscribe(
      (data)=> {
        this.user=data;

      },
      (error)=> {
       
      }
    )

  }


  update(id:any) {
    this.users.updateUser(id,this.user).subscribe(

      (data:any)=>{
        this.user = data;

        Swal.fire('Congratulations!', 'Your Data Have Been Updated!', 'success');
        this.router.navigate([`/user/userProfile/${this.id}`])
      },
      (error) => {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something Went Wrong!',
        });
      }
    )
  }
}
