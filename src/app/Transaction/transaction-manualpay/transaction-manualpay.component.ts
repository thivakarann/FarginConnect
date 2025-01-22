import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { manualpay } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-transaction-manualpay',
  templateUrl: './transaction-manualpay.component.html',
  styleUrl: './transaction-manualpay.component.css'
})
export class TransactionManualpayComponent implements OnInit {

  manualpay!: FormGroup;
  lcopid: any;
  lcop: any;
  plans: any;
  totalAmounts: any;
  prices: any;
  transactionValue: any;
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
  fullname: any = localStorage.getItem('fullname')

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transactionValue = this.data.value;

    this.timer(1);

  }

  ngOnInit(): void {

    this.service.ManuvelPaymentOtp(this.transactionValue).subscribe((res: any) => {
      if (res.flag == 1) {
        this.message = "OTP Send Sucessfully to Customer, It's valid only for"
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })

    this.manualpay = new FormGroup({
      paymentMethod: new FormControl('', [Validators.required]),
      utrNumber: new FormControl('', [Validators.required]),

      paymentStatus: new FormControl('', [Validators.required]),
      otpCode: new FormControl('', [Validators.required])
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
  get otpCode() {
    return this.manualpay.get('otpCode');
  }


  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = 3 * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        //('finished');
        clearInterval(timer);
        // window.alert('Your OTP IS Expired Click Resend OTP');
        this.resendOtp = true;
        this.displayTimer = false;
        this.otpCode1 +
          this.otpCode2 +
          this.otpCode4 +
          this.otpCode5 +
          this.otpCode6
        // this.message = 'Your OTP IS Expired Click Resend OTP'
      }
    }, 1000);
  }

  resendotp() {

    this.service.ManuvelPaymentOtp(this.transactionValue).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }



  Transactionpay(id: any) {
    let submitModel: manualpay = {
      paymentMethod: this.paymentMethod?.value,
      utrNumber: this.utrNumber?.value || "-",
      paymentStatus: this.paymentStatus?.value,
      otpCode: this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6,
      updatedBy:this.fullname
    }

    this.service.Manualpaytransaction(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
    
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

}
