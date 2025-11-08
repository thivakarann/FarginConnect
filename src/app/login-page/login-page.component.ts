import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { LocationStrategy } from '@angular/common';
import { Captcha } from '../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  isLogin: boolean = true;
  loginForm!: FormGroup;
  showPassword: boolean = false;
  error: unknown;
  randomCaptcha!: string;
  captchaValue: any;
  message: any;
  viewCaptcha!: boolean;
  uniqueId = Math.random().toString(36).substring(2);

  constructor(
    private service: FarginServiceService,
    private location: LocationStrategy,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService,
  ) {
    history.pushState(null, '', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
      captcha: new FormControl(''),
      captcha1: new FormControl('')
    });
  };

  ngAfterViewInit(): void {
    setTimeout(() => { this.loginForm.reset(); }, 100);
  }

  removeReadonly(event: any): void {
    event.target.removeAttribute('readonly');
  }

  get emailAddress() {
    return this.loginForm.get('emailAddress');
  }
  get password() {
    return this.loginForm.get('password');
  }

  get captcha() {
    return this.loginForm.get('captcha');
  }

  get captcha1() {
    return this.loginForm.get('captcha1');
  }


  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  resetForm() {
    this.captcha?.reset()
    this.captcha1?.reset()
    this.password?.reset()
    this.viewCaptcha = false;
    this.getCaptcha();
  }

  getCaptcha() {
    this.captcha1?.reset();
    const payload = {
      emailAddress: this.emailAddress?.value,
    };
    if (this.emailAddress?.value) {
      let submitmodal: Captcha = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.Captcha(submitmodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.randomCaptcha = this.cryptoService.decrypt(res.data).replace(/^"(.*)"$/, '$1');
          this.loginForm.controls['captcha'].setValue(this.cryptoService.decrypt(res.data).replace(/^"(.*)"$/, '$1'))
          this.viewCaptcha = true;
        }
        else {
          this.toastr.error(res.messageDescription);
          this.emailAddress?.reset();
          this.password?.reset();
        }
      })
    }
  }

  refreshCaptcha() {
    this.captcha1?.reset();
    const payload = {
      emailAddress: this.emailAddress?.value,
    };
    if (this.emailAddress?.value) {
      let submitmodal: Captcha = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.Captcha(submitmodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.randomCaptcha = this.cryptoService.decrypt(res.data).replace(/^"(.*)"$/, '$1');
          this.loginForm.controls['captcha'].setValue(this.cryptoService.decrypt(res.data).replace(/^"(.*)"$/, '$1'))
          this.viewCaptcha = true;
        }
        else {
          this.toastr.error(res.messageDescription);
          this.emailAddress?.reset();
          this.password?.reset();
        }
      })
    }
  }
  submit() {
    if (this.captcha?.value == this.captcha1?.value) {
      if (this.loginForm.valid) {
        this.service.getLogin(this.loginForm.value.emailAddress, this.loginForm.value.password, this.loginForm.value.captcha1);
      }
      else { this.message = 'Please fill in all required fields.' };
      console.log("message" + this.message)
    }
    else if (this.message === 'Invalid UserName or Password') {
      console.log("message" + this.message)
      this.resetForm();
    }
    else if (this.message === "Password doesn't match") {
      console.log("message" + this.message)
      this.resetForm();

    }
    else { this.message = 'Captcha Mismatch'; }
    console.log("message" + this.message)
    this.refreshCaptcha()
  }











  // generateRandomCaptcha(length: number = 6): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let captcha = '';
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     captcha += characters[randomIndex];
  //   }
  //   return captcha;
  // }
}
