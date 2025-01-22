import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Termspolicy } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewterms',
  templateUrl: './viewterms.component.html',
  styleUrl: './viewterms.component.css'
})
export class ViewtermsComponent {
  viewterms: any;
  terms: any;
  termAndCondition: any;
  closebutton: boolean = false;
  displayTimer: boolean = true;
  display: any;
  ADD: boolean = false;
  Check: boolean = false;

  merchantId = localStorage.getItem('merchantId') || '';
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuetermsandpolicy: any;
  merchantName = localStorage.getItem('merchantname') || '';
  policyId: any;
  ApprovedStatus: any;
  roleName = localStorage.getItem('roleName')
  PolicyApprovedStatus: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) {

  }


  ngOnInit(): void {

    this.service.viewterm(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewterms = res.response.EntityModel.termAndCondition;
        this.policyId = res.response.EntityModel.policyId;
        this.ApprovedStatus = res.response.EntityModel.approvedStatus;
        this.PolicyApprovedStatus = res.response.EntityModel.termsConditionApprovedStatus;

        console.log( this.ApprovedStatus) 
        console.log( this.PolicyApprovedStatus)         
        //   for (let i = 0; i < this.viewterms.length; i++) {
        //     const element = this.viewterms[i];
        //     this.terms = element.terms;
        //   
        //   this.termAndCondition = element.termAndCondition;
        //   

        // }
      }
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valuetermsandpolicy = 'Terms and Condition-View';
    }
    else{
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
      
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions
  
              if (this.actions == 'Terms and Condition-View') {
                this.valuetermsandpolicy = 'Terms and Condition-View'
              }
            
          }
        }
      })
  
    }


  }




  close() {
    window.location.reload()
  }

  select(check: any) {
    this.Check = check;
    
  }

  Accept() {
    let submitModel: Termspolicy = {
      termsConditionApprovedStatus: 'approved',
      termsConditionApprovedBy: this.merchantName
    }
    this.service.TermsPolicyUpdate(this.policyId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/view-disclaimer')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500)
      }
    })
  }

}
;