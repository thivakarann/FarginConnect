import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-privacy-policy',
  templateUrl: './customer-privacy-policy.component.html',
  styleUrl: './customer-privacy-policy.component.css'
})
export class CustomerPrivacyPolicyComponent implements OnInit{

  strings="@";
  currentYear:any;
  policies:any;

  constructor(private dialog: MatDialog, public service: CustServiceService,){
 }

ngOnInit(): void {

  this.currentYear = new Date().getFullYear();

  this.service.CustomerPolicies().subscribe((res: any) => {
        
    this.policies = res.response[0].privacyPolicy;
    

})
}

}


