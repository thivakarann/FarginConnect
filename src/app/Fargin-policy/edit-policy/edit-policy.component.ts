import { Component } from '@angular/core';
import { editpolicy } from '../../fargin-model/fargin-model.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrl: './edit-policy.component.css'
})
export class EditPolicyComponent {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  policycreate: any = FormGroup;
  MerchantName: any;
  dataSource: any;
  errorMsg: any;
  policyId: any;
  policyview: any;
  policyid: any;


  constructor(
    private dialog: MatDialog,
     private service: FarginServiceService, 
     private toastr: ToastrService, 
     private fb: FormBuilder, 
     private router: Router,
    private ActivateRoute:ActivatedRoute) { }


  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.policyId = param.Alldata;
      
    });

    this.policycreate = new FormGroup({
      termAndCondition: new FormControl('', [Validators.required]),
      disclaimer: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required]),
      refundPolicy: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
    });


    this.service.viewbyIdpolicy(this.policyId).subscribe((res: any) => {
      this.policyview = res.response;
      
    
      
    });
  }

 

  get termAndCondition() {
    return this.policycreate.get('termAndCondition');
  }

  get disclaimer() {
    return this.policycreate.get('disclaimer');
  }

  get privacyPolicy() {
    return this.policycreate.get('privacyPolicy');
  }

  get refundPolicy() {
    return this.policycreate.get('refundPolicy');
  }



  close() {
    this.router.navigateByUrl('dashboard/view-policy');
  }

  admincreate() {
    let submitModel: editpolicy = {
      termAndCondition: this.termAndCondition.value.trim(),
      disclaimer: this.disclaimer.value.trim(),
      privacyPolicy: this.privacyPolicy.value.trim(),
      refundPolicy: this.refundPolicy.value.trim(),
      modifiedBy: this.getadminname,
    }
    
    this.service.editTermsPolicy(this.policyId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.router.navigateByUrl('dashboard/view-policy');

      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });
  }

}
