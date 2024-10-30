import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrl: './bank-info.component.css'
})
export class BankInfoComponent implements OnInit {
  details: any;
  detaislone: any;
  approval1: any;
  bankdetails: any;
  KYCDetails: any;
  businessCategoryId: any;
  bankresId: any;
  bankverifyres: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router
  ) { }
  ngOnInit(): void {

    this.bankresId = this.data.value;
    
    this.service.BankVerificationResponse(this.bankresId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.bankverifyres = res.response;
      }
    })


  }





}