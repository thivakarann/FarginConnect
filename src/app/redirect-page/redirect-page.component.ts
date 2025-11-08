import { Component } from '@angular/core';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.css'
})
export class RedirectPageComponent {
  ngOnInit(): void {
    sessionStorage.clear()
  }
  string = "@"


  logout(){
    sessionStorage.clear();
    // sessionStorage.removeItem('token');
    location.href = '/login-page';
  }
}

