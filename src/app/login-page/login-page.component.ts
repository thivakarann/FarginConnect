import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';
import { LocationStrategy } from '@angular/common';

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
  constructor(
    private router: Router,
    private service: FarginServiceService,
    private location: LocationStrategy
  ) {
    history.pushState(null, '', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    });
  }

  ngOnInit(): void {
    this.random();

    sessionStorage.clear();

    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      // password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      password: new FormControl('', [Validators.required]),
      categoryFlag: new FormControl('', [Validators.required]),
      captcha: new FormControl('', Validators.required)
    });
  }
  get emailAddress() {
    return this.loginForm.get('emailAddress');
  }
  get password() {
    return this.loginForm.get('password');
  }

  get categoryFlag() {
    return this.loginForm.get('categoryFlag');
  }
  get captcha() {
    return this.loginForm.get('captcha');
  }
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  // submit() {
  //   if (this.loginForm.valid) {
  //     this.service.getLogin(
  //       this.loginForm.value.emailAddress,
  //       this.loginForm.value.password,
  //       this.loginForm.value.categoryFlag
  //     );
  //   }
  //   this.service.loginError.subscribe((error) => {
  //     this.error = error;
  //   })
  // }

  submit() {
    if (this.captcha?.value === this.randomCaptcha) {
      if (this.loginForm.valid) { 
        this.service.getLogin(
          this.loginForm.value.emailAddress,
          this.loginForm.value.password,
          this.loginForm.value.categoryFlag
        ); 
        setTimeout(() => {
          this.resetForm();  
        }, 300);
      } else {
        this.message = 'Please fill in all required fields.';
      }
    } else if (this.message === 'Invalid UserName or Password') {
      this.resetForm();
    } else if (this.message === "Password doesn't match") {
      this.resetForm();
    } else {
      this.message = 'Captcha Mismatch';
      this.random();
      this.captchaValue = '';
    }
  }
 
  resetCaptcha() {
    this.random();  
    this.captchaValue = '';  
  }

  resetForm() {
    // this.loginForm.patchValue({
    //   password: '',
    //   emailAddress: '',
    //   categoryFlag: '',
    // });

    this.random(); 
    this.captchaValue = ''; 
  }

  resetemailCaptcha() {
    this.loginForm.get('emailAddress')?.setValue('');  
    this.loginForm.get('password')?.setValue(''); 
    this.loginForm.get('categoryFlag')?.setValue('');
    this.random(); 
    this.captchaValue = ''; 
  }

  random() {
    this.randomCaptcha = this.generateRandomCaptcha();
  } 
  generateRandomCaptcha(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    return captcha;
  }
}
