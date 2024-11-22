import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { FormGroup } from '@angular/forms';
import { AdminsignerOtp } from '../fargin-model/fargin-model.module';

@Component({
  selector: 'app-aggrement-signer-otp',
  templateUrl: './aggrement-signer-otp.component.html',
  styleUrl: './aggrement-signer-otp.component.css'
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


  constructor(
    public SignerOTP: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.timer(1); }


  ngOnInit(): void {

    this.RefferenceCode = this.data.value;
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

  ResendOTP() {
    this.SignerOTP.AgreementSendOtp(this.RefferenceCode, 2).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }



  VerifyOtp() {
    let submitModel: AdminsignerOtp = {
      otpCode: this.otpCode1 + this.otpCode2 + this.otpCode3 + this.otpCode4 + this.otpCode5 + this.otpCode6
    }

    this.SignerOTP.AgreemntVerifyOtp(this.RefferenceCode, 2, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })


  }

}
