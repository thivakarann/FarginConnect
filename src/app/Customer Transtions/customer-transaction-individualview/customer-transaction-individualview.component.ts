import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-customer-transaction-individualview',
  templateUrl: './customer-transaction-individualview.component.html',
  styleUrl: './customer-transaction-individualview.component.css'
})
export class CustomerTransactionIndividualviewComponent implements OnInit{
  transactionValue: any;
  view: any;
  id: any;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private service:FarginServiceService) { }

  ngOnInit(): void {
    // this.transactionValue = this.data.value;
    // 
    // this.id = this.data.value
    this.view = this.data.value2
    console.log(this.view)
    

    // this.service.CustomersinglePaymentDetails(this.id).subscribe((res:any)=>{
    //   if(res.flag==1){
    //     this.view=res.response;
    //   }
    // }) 
        
  }

  

  cancel() {
    this.dialog.closeAll()
  }

}
