import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payload } from '../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  email: any;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private cryptoService: EncyDecySericeService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  get emailAddress() {
    return this.forgotForm.get('emailAddress');
  }


  getForgotPassword() {
    const payload = {
      emailAddress: this.emailAddress?.value,
    };
    let submitmodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.getForgotPassword(submitmodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.email = res.response;
        this.toaster.success(res.messageDescription);
        const newStart = Date.now();
        sessionStorage.setItem('otpStartTime', newStart.toString());
        this.router.navigate([`/otp`], {
          queryParams: { emailAddress: this.emailAddress?.value },
        });
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }

  back() {
    this.router.navigate([`/login-page`], {
    });
  }

}
