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

  viewdata: any;
  viewdata1: any;
  transactiondata: any;
  transaction: any;
  constructor(private router: Router,
    private service: FarginServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.transaction = this.data.value;
    console.log(this.transaction);
 
  }
}
