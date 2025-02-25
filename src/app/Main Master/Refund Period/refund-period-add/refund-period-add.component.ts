import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Refundperiodadd } from '../../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-refund-period-add',
  templateUrl: './refund-period-add.component.html',
  styleUrl: './refund-period-add.component.css'
})
export class RefundPeriodAddComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;

  constructor(
    public refunddetailadd: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      paymentMethod: new FormControl('', Validators.required),
      day: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[1-9][0-9]*$")
      ]),
    });
  }

  get paymentMethod() {
    return this.myForm.get('paymentMethod')

  }
  get day() {
    return this.myForm.get('day')

  }

  submit() {
    let submitModel: Refundperiodadd = {
      paymentMethod: this.paymentMethod?.value,
      day: this.day?.value,
      createdBy: this.getadminname
    }

    this.refunddetailadd.Refundperiodadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();


      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
