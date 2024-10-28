import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-otherpayments-view',
  templateUrl: './otherpayments-view.component.html',
  styleUrl: './otherpayments-view.component.css'
})
export class OtherpaymentsViewComponent {

  transaction: any;
  id: any;
  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog){
   
  }
  ngOnInit(): void {
    this.id = this.data.value
    
   this.service.OtherPayTransactionView(this.id).subscribe((res:any)=>{
    if(res.flag==1){
    this.transaction=res.response;
  }
  })
  }
}
