import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})








export class ProfileComponent {


  constructor(private router: Router, private location: Location) { }

  adminname = JSON.parse(localStorage.getItem('adminname') || '');
  emailaddress = JSON.parse(localStorage.getItem('emailaddress') || '');
  mobilenumber = JSON.parse(localStorage.getItem('mobilenumber') || '');
  address = JSON.parse(localStorage.getItem('address') || '');


  click() {
    this.location.back();
  }


}



