import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerOTP, resendotp } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-mobile-verfication',
  templateUrl: './mobile-verfication.component.html',
  styleUrl: './mobile-verfication.component.css'
})
export class MobileVerficationComponent implements OnInit {
  strings = "@";
  MobileNumber: any;
  myForm!: FormGroup;
  resendOtp: boolean = false;
  displayTimer: boolean = true;
  Mobileverify: boolean = true;
  MobileOTP: boolean = false;
  display!: string;
  signupId: any;
  emailAddress: any;
  email: any;
  merchantId: any;
  currentYear:any;
  error: unknown;
  mobilenumbers: any;


  constructor(
    public service: CustServiceService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {  }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();
 
    this.myForm = new FormGroup({
      MobileNumbers: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$')
      ]),
    });
  }


  get MobileNumbers() {
    return this.myForm.get('MobileNumbers')

  }


  verify() {
    this.service.Mobileverify(this.MobileNumber).subscribe((res: any) => {
      if (res.flag == 1) {
        localStorage.setItem(
          'tokens',
          JSON.stringify(
            res.response.tokenData.token
          )
        );
        this.mobilenumbers = res.response.mobile
        
        
        // this.router.navigate([`customer-otp-verify/${this.mobilenumbers}`], {
        //   queryParams: { Alldata: this.mobilenumbers },
        // });

        this.router.navigate([`customer-verify-view/${this.mobilenumbers}`], {
          queryParams: { Alldata: this.mobilenumbers },
        });

        setTimeout(() => {
          window.location.reload()
        }, 200);


     

        
        
      }
      else {
        window.alert(res.responseMessage)
      }
    });
}
  





 



}
