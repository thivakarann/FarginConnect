import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})



export class TestPageComponent {


  Button: boolean = false;


  select(button:any){
    this.Button;
  }

}
