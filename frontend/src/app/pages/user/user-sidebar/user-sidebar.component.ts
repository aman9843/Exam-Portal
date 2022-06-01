import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  category:any

  constructor(private cat:CategoriesService) { }

  ngOnInit(): void {
    this.cat.getCategories().subscribe((data:any) => {
      this.category = data;

    },(error)=> {
     

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Data TO SHow',
      });

    }



    )
  }

}
