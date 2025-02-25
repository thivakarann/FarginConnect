import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { RefundPeriodUpdate } from '../../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-refund-period-edit',
  templateUrl: './refund-period-edit.component.html',
  styleUrl: './refund-period-edit.component.css'
})
export class RefundPeriodEditComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  id: any;
  details: any;

  constructor(
    public refundupdate: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.details = this.data.value;

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

  Edit(){
    let submitModel:RefundPeriodUpdate = {
      paymentMethod:this.paymentMethod?.value,
      day:this.day?.value,
      modifiedBy:this.getadminname
    }

    this.refundupdate.RefundPeriodUpdate(this.details?.refundDayId,submitModel).subscribe((res:any)=>{
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
