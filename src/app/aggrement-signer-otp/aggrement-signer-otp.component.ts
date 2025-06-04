import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { FormGroup } from '@angular/forms';
import { AdminsignerOtp } from '../fargin-model/fargin-model.module';

@Component({
  selector: 'app-aggrement-signer-otp',
  templateUrl: './aggrement-signer-otp.component.html',
  styleUrl: './aggrement-signer-otp.component.css',
})
export class AggrementSignerOtpComponent implements OnInit {
  myForm!: FormGroup;
  otpCode1: any;
  otpCode2: any;
  otpCode3: any;
  otpCode4: any;
  otpCode5: any;
  otpCode6: any;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  display!: string;
  RefferenceCode: any;
  mobilenumber: any;
  timeLeft: number = 180; // Initial time in seconds
  timerInterval: any;
  startTime!: number;

  constructor(
    public SignerOTP: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.timer();
  }

  ngOnInit(): void {
    this.RefferenceCode = this.data.value;

    this.mobilenumber = this.maskMobileNumber(this.data.value2);
  }

  maskMobileNumber(mobilenumber: string): string {
    if (mobilenumber.length < 10) {
      return mobilenumber; // If the number is too short, return the original number
    }
    const lastThree = mobilenumber.slice(-3);
    const maskedPart = 'x'.repeat(mobilenumber.length - 3);
    return `${maskedPart}${lastThree}`;
  }

  timer() {
    this.startTime = Date.now(); // Save the start timestamp

    this.timerInterval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      this.timeLeft = Math.max(180 - elapsedSeconds, 0); // Ensure it doesn’t go negative

      if (this.timeLeft === 0) {
        clearInterval(this.timerInterval);
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

  ResendOTP() {
    this.SignerOTP.AgreementSendOtp(this.RefferenceCode, 2).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.resendOtp = false;
          this.displayTimer = true;
          this.timer();
        } else {
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }

  VerifyOtp() {
    let submitModel: AdminsignerOtp = {
      otpCode:
        this.otpCode1 +
        this.otpCode2 +
        this.otpCode3 +
        this.otpCode4 +
        this.otpCode5 +
        this.otpCode6,
    };

    this.SignerOTP.AgreemntVerifyOtp(
      this.RefferenceCode,
      2,
      submitModel
    ).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
