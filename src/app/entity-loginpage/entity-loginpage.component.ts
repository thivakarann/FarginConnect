import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entity-loginpage',
  templateUrl: './entity-loginpage.component.html',
  styleUrl: './entity-loginpage.component.css'
})
export class EntityLoginpageComponent implements OnInit {
  isLogin: boolean = true;
  loginForm!: FormGroup;
  showPassword: boolean = false;
  error: unknown;
  captchaValue: any;
  message: any;
  randomCaptcha!: string;  
 
constructor(private router:Router,private service:FarginServiceService){}
 
  ngOnInit(): void {
    this.random();
 
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, ]),
      captcha: new FormControl('', Validators.required)
    })
 
   
 
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
 
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  // submit() {
  //   if (this.captcha?.value == this.randomNO) {
  //   if (this.loginForm.valid) {
  //     this.service.getEntityLogin(
  //       this.loginForm.value.emailAddress,
  //       this.loginForm.value.password
  //     );
  //     }
  //     else {
  //       this.message = "Captcha Mismatch"
  //     }
  //     this.service.loginError.subscribe((error) =>{
  //       this.error = error;
  //     })
     
  //   }
 
  //   }
  submit() {
    if (this.captcha?.value === this.randomCaptcha) {
      if (this.loginForm.valid) {
        this.service.getEntityLogin(
          this.loginForm.value.emailAddress,
          this.loginForm.value.password
        );
      } else {
        this.message = "Please fill in all required fields.";
      }
    } else {
      this.message = "Captcha Mismatch";
      this.random();
      this.captchaValue='';
    }
  }
    // random() {
    //   this.randomNO = Math.floor(Math.random() * 100000) + 1;
    // }
 
    random() {
      this.randomCaptcha  = this.generateRandomCaptcha();
    }
 
    // Generate a random alphanumeric captcha string
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
