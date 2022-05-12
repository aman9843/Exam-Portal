import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories = [
    {
      cid:1,
      title:"Maths",
      description:"Algebra"
    },
    {
      cid:2,
      title:"Science",
      description:"Bio"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }



}
