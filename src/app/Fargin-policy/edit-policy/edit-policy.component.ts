import { Component } from '@angular/core';
import { editpolicy } from '../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrl: './edit-policy.component.css'
})
export class EditPolicyComponent {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  policycreate: any = FormGroup;
  MerchantName: any;
  dataSource: any;
  errorMsg: any;
  policyId: any;
  policyview: any;
  policyid: any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    private router: Router,
    private ActivateRoute: ActivatedRoute) { }


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

  admincreate() {
    let submitModel: editpolicy = {
      termAndCondition: this.termAndCondition.value.trim(),
      disclaimer: this.disclaimer.value.trim(),
      privacyPolicy: this.privacyPolicy.value.trim(),
      refundPolicy: this.refundPolicy.value.trim(),
      modifiedBy: this.adminName,
    }
    this.service.editTermsPolicy(this.policyId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.router.navigateByUrl('dashboard/view-policy');
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  close() {
    this.router.navigateByUrl('dashboard/view-policy');
  }

}
