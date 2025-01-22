import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-by-redirect',
  templateUrl: './by-redirect.component.html',
  styleUrl: './by-redirect.component.css'
})
export class ByRedirectComponent {
string="@"
  constructor(private location:Location, private router:Router){

  }


  close() {
    this.router.navigate(['/customer/login']);
  }

}
