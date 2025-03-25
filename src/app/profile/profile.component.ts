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

  adminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  emailaddress = JSON.parse(sessionStorage.getItem('emailaddress') || '');
  mobilenumber = JSON.parse(sessionStorage.getItem('mobilenumber') || '');
  address = JSON.parse(sessionStorage.getItem('address') || '');


  click() {
    this.location.back();
  }


}



