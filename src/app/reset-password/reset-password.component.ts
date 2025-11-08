import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Payload, ResetPassword } from '../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  showPassword: boolean = false;
  showPassword1: boolean = false;
  confirmPasswordClass = 'form-control';
  isConfirmPasswordDirty = false;
  error: any;
  emailAddress: any;
  passwordsMatching: boolean | null = null;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }
  ngOnInit(): void {

    this.activeRouter.queryParams.subscribe((param: any) => {
      this.emailAddress = param.emailAddress;
    });

    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^%*?&])[A-Za-zd$@$!#^%*?&].{7,}'
        ),
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^%*?&])[A-Za-zd$@$!#^%*?&].{7,}'
        ),
      ]),
    });
  }

  get newPassword() {
    return this.resetForm.get('newPassword');
  }
  get confirmpassword() {
    return this.resetForm.get('confirmpassword');
  }

  togglePasswordVisibility(passwordInput: { type: string }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  togglePasswordVisibility1(passwordInput1: { type: string }) {
    this.showPassword1 = !this.showPassword1;
    passwordInput1.type = this.showPassword1 ? 'text' : 'password';
  }

  checkConform(passwordInput: string, passwordInput1: string) {
    this.isConfirmPasswordDirty = true;
    if (!passwordInput && !passwordInput1) {
      this.passwordsMatching = null; // Don't show a message if one of the fields is empty
      this.error = 'Kindly Fill All Required Fields';
    } else if (passwordInput == passwordInput1) {
      this.passwordsMatching = true; // Don't show a message if one of the fields is empty
      this.error = 'Password Match';
    } else {
      this.passwordsMatching = false;
      this.error = 'New Password and Confirm Password Mismatch';
    }
  }

  resetpassword() {
    if (this.resetForm.get('newPassword')?.value == '' || this.resetForm.get('confirmpassword')?.value == '') {
      this.toaster.error('Kindly Fill All Required Fields');
    }
    else {
      if (!this.passwordsMatching) {
        this.toaster.error(this.error);
      }
      else {
        let submitmodel: ResetPassword = {
          emailAddress: this.emailAddress,
          newPassword: this.newPassword?.value,
        };
        let datamodal: Payload = {
          data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
        }
        this.service.ResetPassword(datamodal).subscribe((res: any) => {
          if (res.flag == 1) {
            this.toaster.success(res.messageDescription);
            this.router.navigate([`/login-page`], {});
          } else {
            this.toaster.error(res.messageDescription);
          }
        });
      }
    }
  }
}
