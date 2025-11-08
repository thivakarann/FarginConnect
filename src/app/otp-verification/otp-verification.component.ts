import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { Payload, ResendOtp, VerifyOTP } from '../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

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
  email: any;
  // Initial time in seconds
  timeLeft: number = 180;
  startTime: number = 0;
  timerInterval: any;
  constructor(
    private service: FarginServiceService,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private cryptoService: EncyDecySericeService,
  ) {
    this.initTimer();
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


  initTimer() {
    const storedStart = sessionStorage.getItem('otpStartTime');
    if (storedStart) {
      this.startTime = parseInt(storedStart, 10);
    } else {
      this.startTime = Date.now();
      sessionStorage.setItem('otpStartTime', this.startTime.toString());
    }
    // ⏱️ Set timeLeft immediately so UI shows correct value on first render
    const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    this.timeLeft = Math.max(180 - elapsedSeconds, 0);

    this.startCountdown(); // continues updating every second
  };

  startCountdown() {
    this.timerInterval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      this.timeLeft = Math.max(180 - elapsedSeconds, 0);
      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval);
        localStorage.removeItem('otpStartTime'); // Optional: clear when expired
      }
    }, 1000);
  };

  maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '';
    const [local, domain] = email.split('@');
    const visible = local.slice(0, 3);
    const masked = '*'.repeat(Math.max(local.length - 3, 3));
    return `${visible}${masked}@${domain}`;
  }

  verifyotp() {
    let submitmodel: VerifyOTP = {
      emailAddress: this.emailAddress,
      emailOtpCode: this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
    }
    this.service.VerifyOtp(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        this.router.navigate([`/reset`], {
          queryParams: { emailAddress: this.emailAddress },
        });
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }

  getresendOtp() {
    this.otpCode1 = ''; this.otpCode2 = ''; this.otpCode3 = '';
    this.otpCode4 = ''; this.otpCode5 = ''; this.otpCode6 = '';
    let submitmodel: ResendOtp = {
      emailAddress: this.emailAddress,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
    }
    this.service.ResendOtp(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        // Reset timer
        clearInterval(this.timerInterval);
        this.startTime = Date.now();
        sessionStorage.setItem('otpStartTime', this.startTime.toString());
        this.startCountdown();
        this.resendOtp = false; // Hide the resend link after requesting OTP
        this.displayTimer = true; // Show the timer
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }

  isOtpComplete(): boolean {
    return (this.otpCode1 && this.otpCode2 && this.otpCode3 && this.otpCode4 && this.otpCode5 && this.otpCode6);
  }
}
