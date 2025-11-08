import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-otherpayments-view',
  templateUrl: './otherpayments-view.component.html',
  styleUrl: './otherpayments-view.component.css'
})
export class OtherpaymentsViewComponent {
  transaction: any;
  id: any;
  
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
  ngOnInit(): void {
    this.id = this.data.value
    this.service.OtherPayTransactionView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
      }
    })
  }
}
