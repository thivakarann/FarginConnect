import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from '../fargin-model/fargin-model.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  confirmPassword: any
  error: any;
  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;
  newPasswords: any;
  isConformPassword: boolean = false;
  isPasswordMatch: boolean = false;
  changeForm!: FormGroup;
  adminId: any = sessionStorage.getItem('adminid');
  constructor(
    private router: Router,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) { }
  ngOnInit(): void {
    this.changeForm = new FormGroup({
      oldpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#^!%*?&])[A-Za-z\d$@$#^!%*?&].{7,}')]),
      confirmpassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#^!%*?&])[A-Za-z\d$@$#^!%*?&].{7,}')]),
    })

  }
  get oldpassword() {
    return this.changeForm.get('oldpassword');
  }
  get newpassword() {
    return this.changeForm.get('newpassword');
  }
  get confirmpassword() {
    return this.changeForm.get('confirmpassword');
  }
  checkConform(passwordInput1: string, passwordInput2: string) {
    this.isConformPassword = true;
    if (passwordInput1 == passwordInput2) {
      this.isPasswordMatch = true;
      this.error = "Going good!!";
    } else {
      this.isPasswordMatch = false;
      this.error = "Password Mismatch";
    }
  }
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  togglePasswordVisibility1(passwordInput1: { type: string; }) {
    this.showPassword1 = !this.showPassword1;
    passwordInput1.type = this.showPassword1 ? 'text' : 'password';
  }
  togglePasswordVisibility2(passwordInput2: { type: string; }) {
    this.showPassword2 = !this.showPassword2;
    passwordInput2.type = this.showPassword2 ? 'text' : 'password';
  }
  Onsubmit() {
    let submitModel: ChangePassword = {
      userPassword: this.oldpassword?.value,
      newPassword: this.newpassword?.value,
    };
    this.service.ChangePassword(this.adminId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}


