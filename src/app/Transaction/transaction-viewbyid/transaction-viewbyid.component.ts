import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-transaction-viewbyid',
  templateUrl: './transaction-viewbyid.component.html',
  styleUrl: './transaction-viewbyid.component.css'
})
export class TransactionViewbyidComponent {
  transactionValue: any;
  id: any;
  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog){
   
  }
  ngOnInit(): void {
    this.id = this.data.value
    
   this.service.CustomerTransactionsView(this.id).subscribe((res:any)=>{
    if(res.flag==1){
    this.transactionValue=res.response;
  }
  })
  }

}
