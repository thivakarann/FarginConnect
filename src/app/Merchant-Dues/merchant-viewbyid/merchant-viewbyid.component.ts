import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-merchant-viewbyid',
  templateUrl: './merchant-viewbyid.component.html',
  styleUrl: './merchant-viewbyid.component.css'
})
export class MerchantViewbyidComponent implements OnInit {
  maintenancePayId: any;
  view: any;
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,) { }
 
 
  ngOnInit(): void {
    this.maintenancePayId = this.data.value;
    
 
    this.service.MaintenanceTransactionsView(this.maintenancePayId).subscribe((res:any)=>{
      if(res.flag==1){
        this.view=res.response;
      }
    })
  }

}
