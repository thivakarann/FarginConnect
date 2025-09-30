import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPolicycreate } from '../../fargin-model/fargin-model.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent implements OnInit {

  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  policycreate!: FormGroup;
  MerchantName: any;
  filteredMerchantNames: any[] = [];
  errorMsg: any;
  searchTerm: string = '';
  filterValue: string = '';
  selectedMerchant: any = null;
  filteredMerchants: any[] = [];

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.service.Policymerchant().subscribe((res: any) => {
      if (res.flag == 1) {
        this.MerchantName = res.response.reverse();
        this.filteredMerchantNames = this.MerchantName.map((merchant: any) => ({
          label: merchant.merchantLegalName,
          value: merchant.merchantId
        }));
      } else {
        this.errorMsg = res.responseMessage;
      }
    });

    this.policycreate = this.fb.group({
      termAndCondition: ['', [Validators.required]],
      disclaimer: ['', [Validators.required]],
      privacyPolicy: ['', [Validators.required]],
      refundPolicy: ['', [Validators.required]],
      merchantId: ['', [Validators.required]]
    });
  }

  get merchantId() {
    return this.policycreate.get('merchantId');
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
  };


  admincreate() {
    let submitModel: AdminPolicycreate = {
      termAndCondition: this.termAndCondition?.value.trim(),
      disclaimer: this.disclaimer?.value.trim(),
      privacyPolicy: this.privacyPolicy?.value.trim(),
      refundPolicy: this.refundPolicy?.value.trim(),
      createdBy: this.getadminname,
      merchantId: this.merchantId?.value
    };
    this.service.adminpolicycreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.router.navigateByUrl('dashboard/Terms-policy');
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  close() {
    this.router.navigateByUrl('dashboard/Terms-policy');
  }

  filterMerchantNames(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredMerchantNames = this.MerchantName.filter((merchant: any) =>
      merchant.merchantLegalName.toLowerCase().includes(query)
    ).map((merchant: any) => ({
      label: merchant.merchantLegalName,
      value: merchant.merchantId
    }));
  }

}
