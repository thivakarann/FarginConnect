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
  createdBy :any = JSON.parse(localStorage.getItem('adminname') || '');
  adminuserId: any;
  viewData: any;
  data: any;
  activeRole: any;
  role: any;

constructor(private service:FarginServiceService,private toaster:ToastrService,private activeRouter:ActivatedRoute,private router:Router){}
  ngOnInit(): void {

    this.service.roleactiveViewall().subscribe((res:any)=>{
      this.activeRole=res.response;
      
    })
    
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.adminuserId = param.AdminUserId;
      
    })


    this.AdminForm = new FormGroup({
      adminName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      gender:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      state:new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      city:new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      pincode:new FormControl('', [Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
      roleId:new FormControl('',[Validators.required])
    })


    this.service.AdminView(this.adminuserId).subscribe((res:any)=>{
     if(res.flag==1){
    this.viewData=res.response;
    this.data=this.viewData.adminName;
    
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
  get roleId(){
    return this.AdminForm.get('roleId')
  }

  
  submit(){
    let submitmodel:AdminUpdate={
      adminUserId:this.adminuserId,
       adminName:this.adminName?.value.trim(), 
       address:this.address?.value.trim(),
       city:this.city?.value.trim(),
       state:this.state?.value.trim(),
       pincode:this.pincode?.value.trim(),
       country:this.country?.value.trim(),
       gender:this.gender?.value,
       modifiedBy:this.createdBy,
       roleId:this.roleId?.value
    }

    this.service.AdminUpdate(submitmodel).subscribe((res:any)=>{
      if(res.flag==1){
        this.toaster.success(res.responseMessage);
        this.router.navigateByUrl(`/dashboard/admindetails`);
      }
      else{
        this.toaster.error(res.responseMessage)
      }
    })
   
  }
  close(){
    this.router.navigate([`/dashboard/admindetails`], {
    });
  }
}
