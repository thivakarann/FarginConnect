import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustServiceService } from '../../../Customer-service/cust-service.service';

@Component({
  selector: 'app-additionaltransaction-individualview',
  templateUrl: './additionaltransaction-individualview.component.html',
  styleUrl: './additionaltransaction-individualview.component.css'
})
export class AdditionaltransactionIndividualviewComponent implements OnInit{
  transactionValue: any;
  view: any;
  id: any;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,private service:CustServiceService) { }

  ngOnInit(): void {
    
    this.view = this.data.value2
    console.log(this.view)
    
  }


  cancel() {
    this.dialog.closeAll()
  }

}
