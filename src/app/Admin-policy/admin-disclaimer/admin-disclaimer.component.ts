import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-admin-disclaimer',
  templateUrl: './admin-disclaimer.component.html',
  styleUrl: './admin-disclaimer.component.css'
})
export class AdminDisclaimerComponent implements OnInit {

  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  policyId: any;
  disclaimer: any;




  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) private data: any) {

  }


  ngOnInit(): void {

    this.service.adminPolicyget().subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategory = res.response;
        for (let i = 0; i < this.businesscategory.length; i++) {
          const element = this.businesscategory[i];
          this.policyId = element.policyId;
          console.log(this.policyId)
          this.disclaimer = element.disclaimer;


        }
      }
    });


  }





}