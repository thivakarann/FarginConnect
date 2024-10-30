import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ResendOtp, VerifyOtp } from '../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent implements OnInit {
  otpCode1: any;
  otpCode2: any;
  otpCode3: any;
  otpCode4: any;
  otpCode5: any;
  otpCode6: any;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  userId: any = localStorage.getItem('id');
  display!: string;
  signupId: any;
  emailAddress: any;
  timerId: any; // to hold the timer ID

  email: any;
  constructor(private service: FarginServiceService, private activeRouter: ActivatedRoute, private toaster: ToastrService, private router: Router) {
    this.timer(1);
  }


  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.emailAddress = param.emailAddress;
      
    })


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
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    let seconds: number = 3 * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    this.timerId = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0) {
        clearInterval(this.timerId);
        // window.alert('Your OTP IS Expired Click Resend OTP');
        this.resendOtp = true;
        this.displayTimer = false;
      }
    }, 1000);
  }

  verifyotp() {
    let submitmodel: VerifyOtp = {
      emailAddress: this.emailAddress,
      otpCode: this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6,
    }

    this.service.VerifyOtp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.email = res.response;
        

        this.toaster.success(res.responseMessage);
        this.router.navigate([`/reset`], {
          queryParams: { emailAddress: this.email },
        });
      }
      else {
        this.toaster.error(res.responseMessage)
      }
    })
  }

  getresendOtp() {
    let submitmodel: ResendOtp = {
      emailAddress: this.emailAddress
    };
    this.service.ResendOtp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.resendOtp = false; // Hide the resend link after requesting OTP
        this.displayTimer = true; // Show the timer
        this.timer(1); // Start the timer again
      } else {
        this.toaster.error(res.responseMessage);
      }
    });
  }

}

