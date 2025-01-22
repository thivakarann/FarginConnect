import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dues-failure',
  templateUrl: './dues-failure.component.html',
  styleUrl: './dues-failure.component.css'
})
export class DuesFailureComponent {
  constructor(private router:Router)
  {
    
  }
  Returnurl() {
    this.router.navigateByUrl(`/dashboard/dues`);
 
 
  }
}
