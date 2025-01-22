import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Refundpolicy } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewrefund',
  templateUrl: './viewrefund.component.html',
  styleUrl: './viewrefund.component.css'
})
export class ViewrefundComponent {
  viewrefund: any;
  refund: any;
  merchantId = localStorage.getItem('merchantId') || '';
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
valuerefund: any;
Check: boolean=false;
merchantName = localStorage.getItem('merchantname') || '';
  policyId: any;
  approvedstatus: any;
  roleName = localStorage.getItem('roleName')
  refundapprovedstatus: any;

  constructor(private dialog:MatDialog,private service:FarginServiceService,private toastr:ToastrService, private router: Router) {
 
  }
 
 
  ngOnInit(): void {
   
    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      if(res.flag==1){
        this.viewrefund= res.response.EntityModel.refundPolicy;
        this.policyId=res.response.EntityModel.policyId;
        this.approvedstatus = res.response.EntityModel.approvedStatus;
        this.refundapprovedstatus=res.response.EntityModel.refundPolicyApprovedStatus;
 
      //   for (let i = 0; i < this.viewrefund.length; i++) {
      //     const element = this.viewrefund[i];
      //     this.refund = element.refundPolicy;
      
      // }
    }  
    });
    if (this.roleName == 'Merchant Super admin')
      {
    this.valuerefund = 'Refund Policy-View';
  }
  else{
    this.service.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;
     

        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          
          if(this.actions=='Refund Policy-View'){
            this.valuerefund='Refund Policy-View'
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
    let submitModel:Refundpolicy={
      refundPolicyApprovedStatus: 'approved',
      refundPolicyApprovedBy: this.merchantName
    }
      this.service.RefundPolicyUpdate(this.policyId,submitModel).subscribe((res:any)=>{
        if(res.flag==1){
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
      })
    }

}
