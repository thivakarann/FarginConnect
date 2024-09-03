import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providerupdate } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-serviceprovider-edit',
  templateUrl: './serviceprovider-edit.component.html',
  styleUrl: './serviceprovider-edit.component.css'
})
export class ServiceproviderEditComponent implements OnInit{
  AdminForm!:FormGroup;
  showPassword:boolean=false;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  serviceId: any;
  viewdata: any;

constructor(private service:FarginServiceService,private toaster:ToastrService,private router:Router,@Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {


    this.serviceId = this.data.value
    console.log(this.serviceId);


    this.AdminForm = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      emailAddress: new FormControl('',  [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      address:new FormControl('', [Validators.required]),
      providerName:new FormControl('', [Validators.required]),
    });

    this.service.ProviderViewById(this.serviceId).subscribe((res:any)=>{
      this.viewdata=res.response;
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
    let submitmodel:Providerupdate={
      companyName: this.companyName?.value,
      mobileNumber: this.mobileNumber?.value,
      emailAddress:this.emailAddress?.value ,
      location: this.address?.value,
      serviceProviderName: this.providerName?.value,
      modifiedBy: this.createdBy
    }

    this.service.ServiceProviderUpdate(submitmodel).subscribe((res:any)=>{
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

  close(){
    this.router.navigate([`/dashboard/admindetails`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
