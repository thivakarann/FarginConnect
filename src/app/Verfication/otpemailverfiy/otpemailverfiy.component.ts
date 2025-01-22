import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import {
  EmailOtpVerfiy,
  SmsOtpVerfiy,
} from '../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { time } from 'console';

@Component({
  selector: 'app-otpemailverfiy',
  templateUrl: './otpemailverfiy.component.html',
  styleUrl: './otpemailverfiy.component.css',
})
export class OtpemailverfiyComponent {
 
  email = localStorage.getItem('email') || '';
  emailstatus = Number(localStorage.getItem('emailOtpVerificationStatus')) || '';
  smsstatus =Number(localStorage.getItem('smsOtpVerificationstatus')) || '';
  merchantId =localStorage.getItem('merchantId') || '';
  mobilenumber= localStorage.getItem('mobilenumber') || '';
  otpCode1: any;
  otpCode2: any;
  otpCode3: any;
  otpCode4: any;
  otpCode5: any;
  otpCode6: any;
  emailverfiy: any;
  errorMsg: any;
  showcategoryData: any;
  showfirstOtp: boolean = false;
  showData: boolean = true;
  otpCode7: any;
  otpCode8: any;
  otpCode9: any;
  otpCode10: any;
  otpCode11: any;
  otpCode12: any;
  mobileverify: any;
  mobileverfiy: any;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  display!: string;
 
  constructor(
    private service: FarginServiceService,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.timer(1);
  }
  ngOnInit() {
    this.service.emailverifys(this.email).subscribe((res: any) => {
      if (res.flag == 1) {
        this.emailverfiy = res.response;
      } else {
        this.errorMsg = res.responseMessage;
      }
    });
  }
  timer(minute: any) {
    // let minute = 1;
    let seconds: number = 3 * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    this.resendOtp = false;
    this.displayTimer = true;
    
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
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key === 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }
 
  verifyotps() {
    let submitmodel: EmailOtpVerfiy = {
      emailOtpCode:
        this.otpCode1 +
        this.otpCode2 +
        this.otpCode3 +
        this.otpCode4 +
        this.otpCode5 +
        this.otpCode6,
    };
    this.service
      .otpemail(this.merchantId, submitmodel)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.emailverfiy = res.response;
          this.toaster.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        } else {
          this.toaster.error(res.responseMessage);
        }
      });
  }
  getresendOtp() {
    this.service.emailverifys(this.email).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.resendOtp = false;
        this.displayTimer = true;
        this.timer(1);
        
      }
      else {
        this.toaster.error(res.responseMessage)
 
      }
    })
  }
}

