import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-solutions',
  templateUrl: './customer-solutions.component.html',
  styleUrl: './customer-solutions.component.css'
})
export class CustomerSolutionsComponent implements OnInit{

  strings="@";
  currentYear:any;


  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

  }



}
