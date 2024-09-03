import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providercreate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-serviceprovider-add',
  templateUrl: './serviceprovider-add.component.html',
  styleUrl: './serviceprovider-add.component.css'
})
export class ServiceproviderAddComponent implements OnInit{
  AdminForm!:FormGroup;
  showPassword:boolean=false;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');

constructor(private service:FarginServiceService,private toaster:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.AdminForm = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      emailAddress: new FormControl('',  [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      address:new FormControl('', [Validators.required]),
      providerName:new FormControl('', [Validators.required]),
    })
  }
  get companyName() {
    return this.AdminForm.get('companyName');
  }
  
  get emailAddress() {
    return this.AdminForm.get('emailAddress');
  }
 
  get mobileNumber() {
    return this.AdminForm.get('mobileNumber');
  }
 
 
  get address() {
    return this.AdminForm.get('address');
  }
 
  get providerName() {
    return this.AdminForm.get('providerName');
  }
  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  submit(){
    let submitmodel:Providercreate={
      companyName: this.companyName?.value,
      mobileNumber: this.mobileNumber?.value,
      emailAddress:this.emailAddress?.value ,
      location: this.address?.value,
      serviceProviderName: this.providerName?.value,
      createdBy: this.createdBy
    }

    this.service.ServiceProviderCreate(submitmodel).subscribe((res:any)=>{
      if(res.flag==1){
        this.toaster.success(res.responseMessage);
        window.location.reload();
      }
      else if(res.flag==2){
        this.toaster.error(res.responseMessage);
      }
      else{
        this.toaster.error(res.responseMessage);
      }
    })
   
  }

 
}
