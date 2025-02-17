import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { manualPayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-update-manualpayment',
  templateUrl: './update-manualpayment.component.html',
  styleUrl: './update-manualpayment.component.css'
})
export class UpdateManualpaymentComponent {
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  PaidAmount: any;
  merchantPayId: any;
  fulldata: any;
  paymentStatus: any;
  merchantpayid: any;
  payamount: any;
  merchantId: any;
  paymentMethod: any;
  Utrnumber: any;
  dates: any;
  chequedate: any;


 
  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
this.merchantpayid=this.data.value.merchantPayId;
this.payamount=this.data.value.paidAmount;
this.merchantId=this.data.value.merchantId.merchantId;
this.paymentMethod=this.data.value.paymentMethod;
this.Utrnumber=this.data.value.utrNumber;
this.dates=this.data.value.date

    
 
    this.myForm = new FormGroup({
      paidStatus: new FormControl('', [Validators.required,]),
      paymentmode: new FormControl('', [Validators.required,]),
      utrnumber: new FormControl(''),
      date: new FormControl(''),
 
    });
    if (this.data && this.data.value) {
      this.myForm.patchValue({
        paidStatus: this.data.value.paymentStatus,
        paymentmode: this.data.value.paymentMethod,
        utrnumber: this.data.value.utrNumber,
        date:this.data.value.date,
      });
    } else {
      console.error('Data is not defined');
    }
  }
 
  get paidStatus() {
    return this.myForm.get('paidStatus')
 
  }
 
  get paymentmode() {
    return this.myForm.get('paymentmode')
 
  }
  get utrnumber() {
    return this.myForm.get('utrnumber')
 
  }
  get date() {
    return this.myForm.get('date')
 
  }
 
 
  submit() {
    if(this.paymentmode?.value !='Cheque'){
      this.chequedate = '-';
console.log(this.chequedate)
  }
 
  else {
    this.chequedate = this.date?.value
console.log(this.chequedate)
  }

    let submitModel: manualPayment = {
      paymentStatus: this.paidStatus?.value,
      paymentMethod: this.paymentmode?.value,
      utrNumber: this.utrnumber?.value,
      date:this.chequedate,
      merchantId: this.merchantId,
      paidAmount: this.payamount,
      updatedby :this.getadminname
    }
 
    this.Approval.UpdateManualPayment(this.merchantpayid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
       
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}

