import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-termsandpolicy',
  templateUrl: './customer-termsandpolicy.component.html',
  styleUrl: './customer-termsandpolicy.component.css'
})
export class CustomerTermsandpolicyComponent implements OnInit{
  strings = "@";
  currentYear:any;
  policies:any;


  constructor(private dialog: MatDialog, public service: CustServiceService,){

  }


  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    this.service.CustomerPolicies().subscribe((res: any) => {
        
        this.policies = res.response[0].termAndCondition;
        
    
    })
  }

}
