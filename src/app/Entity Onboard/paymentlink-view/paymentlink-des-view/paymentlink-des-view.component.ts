import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-paymentlink-des-view',
  templateUrl: './paymentlink-des-view.component.html',
  styleUrl: './paymentlink-des-view.component.css'
})
export class PaymentlinkDesViewComponent implements OnInit {
  description: any;
  constructor(private dialog:MatDialog,private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.description = this.data.value.description
  }

  close() {
    this.dialog.closeAll();
  }

}
