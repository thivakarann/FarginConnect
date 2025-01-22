import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CreateRefund } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-merchant-refund',
  templateUrl: './merchant-refund.component.html',
  styleUrl: './merchant-refund.component.css'
})
export class MerchantRefundComponent {
  addrefund: any = FormGroup;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {


    this.addrefund = new FormGroup({
      amount: new FormControl('', [Validators.required]),


    });

  }

  get amount() {
    return this.addrefund.get('amount');
  }


  // submit() {
  //   let submitModel: CreateRefund = {
  //     payId:,
  //     customerId:,
  //     amount: 
  //   };


  //   this.service.createrefunds(submitModel).subscribe((res: any) => {
  //     if (res.flag == 1) {
  //       this.toastr.success(res.responseMessage)
  //       window.location.reload();

  //     }
  //     else {
  //       this.toastr.error(res.responseMessage);
  //       this.dialog.closeAll()
  //     }

  //   });

  // }

}
