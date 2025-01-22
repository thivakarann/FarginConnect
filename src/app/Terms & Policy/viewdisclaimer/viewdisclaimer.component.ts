import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Disclaimerpolicy } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewdisclaimer',
  templateUrl: './viewdisclaimer.component.html',
  styleUrl: './viewdisclaimer.component.css'
})
export class ViewdisclaimerComponent {
  viewdisclaimer: any;
  disclaimer: any;
  disclaimers: any;
  merchantId = localStorage.getItem('merchantId') || '';
  valuedisclaimer: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  merchantName = localStorage.getItem('merchantname') || '';
  Check: boolean=false;
  policyId: any;
  approvedstatus: any;
  roleName = localStorage.getItem('roleName')
  disclaimerapprovedstatus: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) {

  }


  ngOnInit(): void {

    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewdisclaimer = res.response.EntityModel.disclaimer;
        this.policyId=res.response.EntityModel.policyId;
        this.approvedstatus = res.response.EntityModel.approvedStatus;
        this.disclaimerapprovedstatus = res.response.EntityModel.disclaimerApprovedStatus;
        console.log( this.approvedstatus) 
        console.log( this.disclaimerapprovedstatus)         

      }
    });
    if (this.roleName == 'Merchant Super admin')
      {
    this.valuedisclaimer = 'Disclaimer-View';
  }
  else{
    this.service.viewRole(this.roleId).subscribe((res: any) => {
    
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;
  
        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          if (this.actions == 'Disclaimer-View') {
            this.valuedisclaimer = 'Disclaimer-View'
          }
        }
      
    }
    })
  
  }
 

  }
 
  select(check:any){
    this.Check=check;
    
    }
 
    Accept(){
    let submitModel:Disclaimerpolicy={
      disclaimerApprovedStatus: 'approved',
      disclaimerApprovedBy: this.merchantName
    }
      this.service.DisclaimerPolicyUpdate(this.policyId,submitModel).subscribe((res:any)=>{
        if(res.flag==1){
          this.toastr.success(res.responseMessage);
          this.router.navigateByUrl('dashboard/view-privacy')
          // setTimeout(() => {
          //   window.location.reload()
          // }, 500);
        }
      })
    }

}
