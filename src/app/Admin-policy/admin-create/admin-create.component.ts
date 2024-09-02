import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminPolicycreate } from '../../fargin-model/fargin-model.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent  implements OnInit{

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');

  policycreate:any=FormGroup;



  constructor(private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService,private fb: FormBuilder, private router: Router) {}


  ngOnInit(): void {
    
  this.policycreate = this.fb.group({
    termAndCondition: new FormControl('', [Validators.required]),
    disclaimer: new FormControl('', [Validators.required]),
    privacyPolicy: new FormControl('', [Validators.required]),
    refundPolicy: new FormControl('', [Validators.required]),
    createdBy: new FormControl(''),
    adminUserId: new FormControl('')
    });

  }


  get  termAndCondition() {
    return this.policycreate.get('termAndCondition');
  }

  get  disclaimer() {
    return this.policycreate.get('disclaimer');
  }

  get  privacyPolicy() {
    return this.policycreate.get('privacyPolicy');
  }
  
  get  refundPolicy() {
    return this.policycreate.get('refundPolicy');
  }

  

  close() {
    this.router.navigateByUrl('dashboard/Terms-policy');
  }





  admincreate(){
 let submitModel: AdminPolicycreate = {
   termAndCondition: this.termAndCondition.value,
   disclaimer: this.disclaimer.value,
   privacyPolicy: this.privacyPolicy.value,
   refundPolicy: this.refundPolicy.value,
   createdBy: this.getadminname,
   adminUserId: this.Adminid
 };
  
    
    this.service.adminpolicycreate(submitModel).subscribe((res: any) => {
      if(res.flag==1){
     
        this.toastr.success(res.responseMessage)   
        window.location.reload()
  
      }
      else{ 
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }  
      
  });
  }
}
