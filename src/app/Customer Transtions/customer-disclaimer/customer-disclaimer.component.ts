import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-disclaimer',
  templateUrl: './customer-disclaimer.component.html',
  styleUrl: './customer-disclaimer.component.css'
})
export class CustomerDisclaimerComponent implements OnInit {

  currentYear: any;
  strings = "@";
  policies:any;
  
  constructor(private dialog: MatDialog, public service: CustServiceService,){
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    
  this.service.CustomerPolicies().subscribe((res: any) => {
        
    this.policies = res.response[0].disclaimer;
    

})
  }


}
