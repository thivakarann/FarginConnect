import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import {AdminUpdate } from '../../fargin-model/fargin-model.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit{
  AdminForm!:FormGroup;
  showPassword:boolean=false;
  createdBy: any = localStorage.getItem('adminname');
  adminuserId: any;
  viewData: any;
  data: any;

constructor(private service:FarginServiceService,private toaster:ToastrService,private activeRouter:ActivatedRoute,private router:Router){}
  ngOnInit(): void {


    this.activeRouter.queryParams.subscribe((param: any) => {
      this.adminuserId = param.AdminUserId;
      console.log(this.adminuserId)
    })


    this.AdminForm = new FormGroup({
      adminName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      gender:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      state:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      pincode:new FormControl('', [Validators.required]),
    })


    this.service.AdminView(this.adminuserId).subscribe((res:any)=>{
   if(res.flag==1){
    this.viewData=res.response;
    this.data=this.viewData.adminName;
    console.log(this.data)
   }
    })
  }
  get adminName() {
    return this.AdminForm.get('adminName');
  }
  get gender() {
    return this.AdminForm.get('gender');
  }

  get address() {
    return this.AdminForm.get('address');
  }
  get country() {
    return this.AdminForm.get('country');
  }
  get state() {
    return this.AdminForm.get('state');
  }
  get city() {
    return this.AdminForm.get('city');
  }
 

  get pincode() {
    return this.AdminForm.get('pincode');
  }

  
  submit(){
    let submitmodel:AdminUpdate={
      adminUserId:this.adminuserId,
       adminName:this.adminName?.value, 
       address:this.address?.value,
       city:this.city?.value,
       state:this.state?.value,
       pincode:this.pincode?.value,
       country:this.country?.value,
       gender:this.gender?.value,
       modifiedBy:this.createdBy
    }

    this.service.AdminUpdate(submitmodel).subscribe((res:any)=>{
      if(res.flag==1){
        this.toaster.success(res.responseMessage);
        window.location.reload();
      }
      else{
        this.toaster.error(res.responseMessage)
      }
    })
   
  }
  close(){
    this.router.navigate([`/dashboard/admindetails`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
