import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-admin-refundpolicy',
  templateUrl: './admin-refundpolicy.component.html',
  styleUrl: './admin-refundpolicy.component.css'
})
export class AdminRefundpolicyComponent implements OnInit {

  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  policyId: any;
  refundPolicy: any;




  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) private data: any) {

  }


  ngOnInit(): void {

 
    this.service.Policiesgetbyid(this.data.value).subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategory = res.response;
      
      }
    });


  }


  close() {
    window.location.reload()
  }

}