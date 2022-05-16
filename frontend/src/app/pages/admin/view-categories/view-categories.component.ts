import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

   category:any;

  constructor(private categories : CategoriesService) { }

  ngOnInit(): void {

   this.categories.getCategories().subscribe((data:any) => {
      this.category = data;
      console.log(this.category)
    },(error)=> {
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
