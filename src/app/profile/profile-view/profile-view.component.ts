import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnInit {
  merchantId = localStorage.getItem('merchantId') || '';
  technicalTotalAmount=localStorage.getItem('technicalTotalAmount');
  gstAmount=localStorage.getItem('gstAmount');
  technicalAmount=localStorage.getItem('technicalAmount')
  technicalPayStatus=localStorage.getItem('technicalPayStatus')
  manualDetails: any;
  profilevalue: any;
  viewmerchant: any;
  constructor(
    private service: FarginServiceService,
  ) { }

  ngOnInit(): void {
    
    this.service.merchantbyids(this.merchantId).subscribe((res: any) => {
      this.viewmerchant = res.response.merchantpersonal;
      console.log(this.viewmerchant)
    });
    
    

    
  
  }

}
