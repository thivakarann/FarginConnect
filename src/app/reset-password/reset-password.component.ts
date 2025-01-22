import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetForm!: FormGroup;
  showPassword: boolean = false;
  showPassword1: boolean = false;
  confirmPasswordClass = 'form-control';
  isConfirmPasswordDirty = false;
  passwordsMatching: boolean = false;
  error: any;
  emailAddress: any;
  constructor(private service: FarginServiceService, private router: Router, private activeRouter: ActivatedRoute,private toaster:ToastrService) {
  }
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.emailAddress = param.emailAddress;
      
    })

    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^%*?&])[A-Za-z\d$@$!#^%*?&].{7,}')]),
      confirmpassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#^%*?&])[A-Za-z\d$@$!#^%*?&].{7,}')]),
    })
  }
  get newPassword() {
    return this.resetForm.get('newPassword');
  }
  get confirmpassword() {
    return this.resetForm.get('confirmpassword');
  }
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  togglePasswordVisibility1(passwordInput1: { type: string; }) {
    this.showPassword1 = !this.showPassword1;
    passwordInput1.type = this.showPassword1 ? 'text' : 'password';
  }

  checkConform(passwordInput: string, passwordInput1: string) {
    this.isConfirmPasswordDirty = true;
    if (passwordInput == passwordInput1) {
      this.passwordsMatching = true;
      this.resetForm.valid;
      this.confirmPasswordClass = 'form-control is-valid';
      this.error = "Password Matched!"
    } else {
      this.resetForm.invalid;
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
      this.error = "Password Mismatch"

    }
  }
  resetpassword() {
    let submitmodel: ResetPassword = {
      contactEmail: this.emailAddress,
      password: this.newPassword?.value
    }

    this.service.ResetPassword(submitmodel).subscribe((res:any)=>{
      if(res.flag==1){
      this.toaster.success(res.responseMessage);
        this.router.navigate([`/admin/login`], {
        });
      }
      else{
        this.toaster.error(res.responseMessage);

      }
    })
  }
}
