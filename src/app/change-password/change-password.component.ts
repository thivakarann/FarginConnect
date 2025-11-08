import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword, Payload } from '../fargin-model/fargin-model.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  confirmPassword: any;
  error: any;
  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;
  newPasswords: any;
  isConformPassword: boolean = false;
  isPasswordMatch: boolean = false;
  changeForm!: FormGroup;
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  email: any = this.cryptoService.decrypt(sessionStorage.getItem('Four') || '');
  constructor(
    private router: Router,
    private service: FarginServiceService,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.changeForm = new FormGroup({
      oldpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#^!%*?&])[A-Za-zd$@$#^!%*?&].{7,}'
        ),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#^!%*?&])[A-Za-zd$@$#^!%*?&].{7,}'
        ),
      ]),
    });
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
    if (passwordInput1 && passwordInput2) {
      this.isPasswordMatch = passwordInput1 === passwordInput2;
      this.error = this.isPasswordMatch ? 'Going good!!' : 'Password Mismatch';
    } else {
      this.error = '';
    }
  }

  togglePasswordVisibility(passwordInput: { type: string }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  togglePasswordVisibility1(passwordInput1: { type: string }) {
    this.showPassword1 = !this.showPassword1;
    passwordInput1.type = this.showPassword1 ? 'text' : 'password';
  }
  togglePasswordVisibility2(passwordInput2: { type: string }) {
    this.showPassword2 = !this.showPassword2;
    passwordInput2.type = this.showPassword2 ? 'text' : 'password';
  }


  Onsubmit() {
    let submitModel: ChangePassword = {
      oldPassword: this.oldpassword?.value,
      newPassword: this.newpassword?.value,
      emailAddress: this.email
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.ChangePassword(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.dialog.closeAll();
        this.router.navigateByUrl('/login-page');
      } else {
        this.toastr.error(res.messageDescription);
      }
    });
  }
}
