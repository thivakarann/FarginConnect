import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailOtpVerfiy, SmsOtpVerfiy } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-otpmobileverify',
  templateUrl: './otpmobileverify.component.html',
  styleUrl: './otpmobileverify.component.css'
})
export class OtpmobileverifyComponent {
  email = localStorage.getItem('email') || '';
  emailstatus = Number(localStorage.getItem('emailOtpVerificationStatus')) || '';
  smsstatus = Number(localStorage.getItem('smsOtpVerificationstatus')) || '';
  merchantId = localStorage.getItem('merchantId') || '';
  mobilenumber = localStorage.getItem('mobilenumber') || '';
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
    this.service.mobileverifys(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.mobileverify = res.response;
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

  verfiymobile() {
    let submitmodel: SmsOtpVerfiy = {
      smsOtpCode:
        this.otpCode7 +
        this.otpCode8 +
        this.otpCode9 +
        this.otpCode10 +
        this.otpCode11 +
        this.otpCode12,
    };
    this.service
      .otpmobile(this.merchantId, submitmodel)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.mobileverfiy = res.response;
          this.showData = false;
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.toaster.error(res.responseMessage);
        }
      });
  }
  getresendOtp() {
    this.service.mobileverifys(this.merchantId).subscribe((res: any) => {
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
