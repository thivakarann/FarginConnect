import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-otherpay-view',
  templateUrl: './otherpay-view.component.html',
  styleUrl: './otherpay-view.component.css'
})
export class OtherpayViewComponent {
  PayId: any;
  view: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {
    this.PayId = this.data.value;


    this.service.OtherPayTransactionView(this.PayId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
      }
    })
  }

  viewreciept(id: any) {
    this.service.OtherPaymentReciept(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }
}
