import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { CustomerOTP, resendotp } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-customer-otp-verify',
  templateUrl: './customer-otp-verify.component.html',
  styleUrl: './customer-otp-verify.component.css'
})
export class CustomerOtpVerifyComponent implements OnInit {
  strings = "@";
  myForm!: FormGroup;
  otpCode1: any;
  otpCode2: any;
  otpCode3: any;
  otpCode4: any;
  otpCode5: any;
  otpCode6: any;
  currentYear: any;
  MobileNumber: any;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  display!: string;

  constructor(
    public service: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute
  ) { this.timer(1);}
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
      
    });
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

  verifyotp() {
    let submitmodel: CustomerOTP = {
      mobileNumber: this.MobileNumber,
      otpCode: this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6,
    }

    this.service.mobileotp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.router.navigate([`customer-verify-view/${this.MobileNumber}`], {
          queryParams: { Alldata: this.MobileNumber },
        });
      }

      else {
        window.alert(res.response)
      }
    })
  }


  getresendOtp() {
    let submitmodel: resendotp = {
      mobileNumber: this.MobileNumber,
    }
    this.service.mobileresendotp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {

      }

      else {
        window.alert(res.responseMessage)
      }
    })
  }
}
