import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-trans-view',
  templateUrl: './customer-trans-view.component.html',
  styleUrl: './customer-trans-view.component.css'
})
export class CustomerTransViewComponent {

  view: any;
  id: any;
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) {

    
  }
  ngOnInit(): void {
    this.id = this.data.value

    this.service.CustomerTransactionsView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
      }
    })
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }

}
