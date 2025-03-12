import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AdditionalManuvalPayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-addttional-manuval-payment',
  templateUrl: './addttional-manuval-payment.component.html',
  styleUrl: './addttional-manuval-payment.component.css'
})
export class AddttionalManuvalPaymentComponent implements OnInit {
  manualpay!: FormGroup;
  fullname: any = localStorage.getItem('fullname');
  
  payid:any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    console.log('jbnje' + this.fullname)
    
    this.payid = this.data.value;
    this.manualpay = new FormGroup({
    paymentMethod: new FormControl('', [Validators.required]),
    utrNumber: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
    });
    this.manualpay.get('paymentMethod')?.valueChanges.subscribe((value) => { const utrNumberControl = this.manualpay.get('utrNumber'); if (value === 'Cash') { utrNumberControl?.clearValidators(); utrNumberControl?.disable(); } else { utrNumberControl?.setValidators([Validators.required]); utrNumberControl?.enable(); } utrNumberControl?.updateValueAndValidity(); });

  }


  get paymentMethod() {
    return this.manualpay.get('paymentMethod');
  }
 
  get utrNumber() {
    return this.manualpay.get('utrNumber');
  }
  get paymentStatus() {
    return this.manualpay.get('paymentStatus');
  }

  Transactionpay() {
    let submitModel: AdditionalManuvalPayment = {
      paymentMethod: this.paymentMethod?.value,
      utrNumber: this.utrNumber?.value || "-",
      paymentStatus: this.paymentStatus?.value,
      modifiedBy:this.fullname
    }
 
    this.service.AdditionalManuvalPayment(this.payid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
        
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }


}
