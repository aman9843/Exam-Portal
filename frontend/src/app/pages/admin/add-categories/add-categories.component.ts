import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  category = {
    title:"",
    description:""
  }

  constructor(private categories:CategoriesService, private router:Router) { }

  ngOnInit(): void {




  }

  formSubmit() {

    if(this.category.title.trim() === '' && this.category.description === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter the Field!',
      });
      return;
    }

     this.categories.addCategories(this.category).subscribe(
       (data:any) => {
         this.category.title='',
         this.category.description=''

          Swal.fire('Congratulations!', 'Your Data Have Been Added!', 'success');
          this.router.navigate(['/admin/categories'])


       },
       (error) => {
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill the Field!',
        });
       }
     )

    }



}
