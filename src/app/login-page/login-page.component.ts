import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';

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

  constructor(private router: Router, private service: FarginServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      // password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      password: new FormControl('', [Validators.required]),
    });
  
  }
  get emailAddress() {
    return this.loginForm.get('emailAddress');
  }
  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  submit() {
    if (this.loginForm.valid) {
      this.service.getLogin(
        this.loginForm.value.emailAddress,
        this.loginForm.value.password
      );
    }
    this.service.loginError.subscribe((error) => {
      this.error = error;
    })
  }

}
