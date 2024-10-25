import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addpolicy, AdminPolicycreate } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrl: './add-policy.component.css'
})
export class AddPolicyComponent {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  policycreate: any = FormGroup;
  MerchantName: any;
  dataSource: any;
  errorMsg: any;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {




    this.policycreate = new FormGroup({
      termAndCondition: new FormControl('', [Validators.required]),
      disclaimer: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required]),
      refundPolicy: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),


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
    let submitModel: addpolicy = {
      termAndCondition: this.termAndCondition.value,
      disclaimer: this.disclaimer.value,
      privacyPolicy: this.privacyPolicy.value,
      refundPolicy: this.refundPolicy.value,
      createdBy: this.getadminname,

    };

    this.service.addTermsPolicy(submitModel).subscribe((res: any) => {
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
