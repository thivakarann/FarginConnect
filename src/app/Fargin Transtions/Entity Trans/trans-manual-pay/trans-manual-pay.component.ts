import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Console } from 'console';
import { subsmanualpay } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-trans-manual-pay',
  templateUrl: './trans-manual-pay.component.html',
  styleUrl: './trans-manual-pay.component.css'
})
export class TransManualPayComponent implements OnInit {

  manualpay!: FormGroup;
  lcopid: any;
  lcop: any;
  plans: any;
  totalAmounts: any;
  prices: any;
  maintenancePayId: any;
  message: any;
  otpCode1: any;
  otpCode2: any;
  otpCode3: any;
  otpCode4: any;
  otpCode5: any;
  otpCode6: any;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  display!: string;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maintenancePayId = this.data.value;
  console.log(this.maintenancePayId)
 
  }

  ngOnInit(): void {


    this.manualpay = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
      utrNumber: new FormControl('', [Validators.required]),

      technicalPayStatus: new FormControl('', [Validators.required]),
      updatedBy: new FormControl('')
    });

    this.manualpay.get('paymentMode')?.valueChanges.subscribe((value) => { const utrNumberControl = this.manualpay.get('utrNumber'); if (value === 'Cash') { utrNumberControl?.clearValidators(); utrNumberControl?.disable(); } else { utrNumberControl?.setValidators([Validators.required]); utrNumberControl?.enable(); } utrNumberControl?.updateValueAndValidity(); });

  }

  get paymentMode() {
    return this.manualpay.get('paymentMode');
  }

  get utrNumber() {
    return this.manualpay.get('utrNumber');
  }
  get technicalPayStatus() {
    return this.manualpay.get('technicalPayStatus');
  }



  Transactionpay(id: any) {
    let submitModel: subsmanualpay = {
      paymentMode: this.paymentMode?.value,
      technicalPayStatus: this.technicalPayStatus?.value,
      utrNumber: this.utrNumber?.value || "-",
      updatedBy: this.createdBy
    }

    this.service.ManualPay(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
    
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }

}     
