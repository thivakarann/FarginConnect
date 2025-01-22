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
export class ForgotPasswordComponent implements OnInit{
  forgotForm!:FormGroup;
  email: any;
  merchantId: any;

  constructor(private service:FarginServiceService,private router:Router,private toaster:ToastrService){

  }
  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      emailAddress: new FormControl('',  [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    })
  }
  get emailAddress() {
    return this.forgotForm.get('emailAddress');
  }
  getForgotPassword(){
    this.service.getForgotPassword(this.emailAddress?.value).subscribe((res:any)=>{
      if(res.flag == 1){
        this.email = res.response;
        this.merchantId=res.response.merchantId;
        
        this.toaster.success(res.responseMessage);
        this.router.navigate([`/otp`], {
          queryParams: { MerchantId: this.merchantId,
            email:this.email
            
          },
          
        });
      }
      else{
        this.toaster.error(res.responseMessage);
      }
    })
  }
  back(){
  this.router.navigate([`/admin/login`], {
    // queryParams: { emailAddress: this.emailAddress },
  }); 
}
}
