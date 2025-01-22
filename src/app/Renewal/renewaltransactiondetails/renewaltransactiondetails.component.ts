import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-renewaltransactiondetails',
  templateUrl: './renewaltransactiondetails.component.html',
  styleUrl: './renewaltransactiondetails.component.css'
})
export class RenewaltransactiondetailsComponent {
  merchantPayId: any;
  renweal!: any;
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,) { }
 
 
  ngOnInit(): void {
    // this.duesvalue = this.data.value;
    this.merchantPayId = this.data.value;
    // 
    
 
    this.service.RenewalTransactionsView(this.merchantPayId).subscribe((res:any)=>{
      if(res.flag==1){
        this.renweal=res.response;
      }
    })
  }
}
