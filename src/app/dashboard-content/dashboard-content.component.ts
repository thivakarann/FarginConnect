import { Component } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent {
  counts: any;
  constructor( private service: FarginServiceService) { }
 
  ngOnInit(): void {
    this.service.dashboardCount().subscribe((res:any)=>{
      this.counts=res.response;
      console.log(this.counts);
     
    })
  }
 
  
 
}
