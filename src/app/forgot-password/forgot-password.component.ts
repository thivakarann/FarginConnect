import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  email: any;


  constructor(private service: FarginServiceService, private router: Router, private toaster: ToastrService) {

  }
  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    })
  }
  get emailAddress() {
    return this.forgotForm.get('emailAddress');
  }
  getForgotPassword() {
    this.service.getForgotPassword(this.forgotForm.value).subscribe((res: any) => {
      if (res.flag == 1) {
        this.email = res.response.emailAddress;
        
        this.toaster.success(res.responseMessage);
        this.router.navigate([`/otp`], {
          queryParams: { emailAddress: this.email },
        });
      }
      else {
        this.toaster.error(res.responseMessage);
      }

    })
  }
  back() {
    this.router.navigate([`/login-page`], {
      // queryParams: { emailAddress: this.emailAddress },
    });
  }
}
