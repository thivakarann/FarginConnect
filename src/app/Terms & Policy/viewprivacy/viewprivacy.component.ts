import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Privacypolicy } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewprivacy',
  templateUrl: './viewprivacy.component.html',
  styleUrl: './viewprivacy.component.css'
})
export class ViewprivacyComponent {
  disclaimer: any;
  disclaimers: any;
  viewprivacy: any;
  privacy: any;
  merchantId = localStorage.getItem('merchantId') || '';
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valueprivacyPolicy: any;
  policyId: any;
  merchantName = localStorage.getItem('merchantname') || '';
  Check: boolean = false;
  approvedstatus: any;
  roleName = localStorage.getItem('roleName')
  Policyapprovedstatus: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) {

  }
 
 
  ngOnInit(): void {
   
    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      if(res.flag==1){
        this.viewprivacy = res.response.EntityModel.privacyPolicy;
        this.policyId = res.response.EntityModel.policyId;
        this.approvedstatus = res.response.EntityModel.approvedStatus;
        this.Policyapprovedstatus = res.response.EntityModel.policyApprovedStatus;


        //   for (let i = 0; i < this.viewprivacy.length; i++) {
        //     const element = this.viewprivacy[i];
        //     this.privacy = element.privacyPolicy;
        //   

        // }
      }
    });
    if (this.roleName == 'Merchant Super admin')
      {
    this.valueprivacyPolicy = 'Privacy Policy-View';
  }
  else{
    this.service.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;
      
     
        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          
          if(this.actions=='Privacy Policy-View'){
            this.valueprivacyPolicy='Privacy Policy-View'
          }
              }
      
    }
    })
  }
   

  }


  select(check: any) {
    this.Check = check;
    
  }

  Accept() {
    let submitModel: Privacypolicy = {
      policyApprovedStatus: 'approved',
      policyApprovedBy: this.merchantName
    }
    this.service.PrivacyPolicyUpdate(this.policyId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/view-refund')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);
      }
    })
  }
}
