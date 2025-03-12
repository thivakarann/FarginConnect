import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-additional-payview',
  templateUrl: './additional-payview.component.html',
  styleUrl: './additional-payview.component.css'
})
export class AdditionalPayviewComponent {
  transactionValue: any;
  id: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.id = this.data.value

    this.service.AdditionalPaymentsViewById(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transactionValue = res.response;
        this.transactionValue.reverse();
      }
    })
  }
}
