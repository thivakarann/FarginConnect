import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ResendOtp, VerifyOtp } from '../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css',
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
  userId: any = sessionStorage.getItem('id');
  display!: string;
  signupId: any;
  emailAddress: any;
  timerId: any; // to hold the timer ID
  timeLeft: number = 180; // Initial time in seconds
  timerInterval: any;
  startTime!: number;
  email: any;
  constructor(
    private service: FarginServiceService,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.timer();
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.emailAddress = param.emailAddress;
    });
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

  timer() {
    this.startTime = Date.now(); // Save the start timestamp
    this.timerInterval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      this.timeLeft = Math.max(180 - elapsedSeconds, 0);
      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  verifyotp() {
    let submitmodel: VerifyOtp = {
      emailAddress: this.emailAddress,
      otpCode:
        this.otpCode1 +
        this.otpCode2 +
        this.otpCode3 +
        this.otpCode4 +
        this.otpCode5 +
        this.otpCode6,
    };

    this.service.VerifyOtp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.email = res.response;

        this.toaster.success(res.responseMessage);
        this.router.navigate([`/reset`], {
          queryParams: { emailAddress: this.email },
        });
      } else {
        this.toaster.error(res.responseMessage);
      }
    });
  }

  getresendOtp() {
    let submitmodel: ResendOtp = {
      emailAddress: this.emailAddress,
    };
    this.service.ResendOtp(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.resendOtp = false; // Hide the resend link after requesting OTP
        this.displayTimer = true; // Show the timer
        this.timer(); // Start the timer again
      } else {
        this.toaster.error(res.responseMessage);
      }
    });
  }

  isOtpComplete(): boolean {
    return (
      this.otpCode1 &&
      this.otpCode2 &&
      this.otpCode3 &&
      this.otpCode4 &&
      this.otpCode5 &&
      this.otpCode6
    );
  }
}
