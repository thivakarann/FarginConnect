import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPolicyEdit } from '../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrl: './policy-edit.component.css'
})
export class PolicyEditComponent implements OnInit {
  editadminpolicy!: FormGroup;
  businessCategoryId: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  categorys: any;
  mccCodes: any;
  policyId: any;
  policyview: any;
  dataSource: any;
  businesscategory: any;
  sort: any;
  paginator: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  MerchantName: any;
  policyviewentity: any;
  merchant: any;
  filteredMerchantNames: any[] = [];
 
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute) {
 
  }
 
 
 
  ngOnInit(): void {
 
    this.service.Policymerchant().subscribe((res: any) => {
      if (res.flag == 1) {
        this.MerchantName = res.response;
        this.filteredMerchantNames = this.MerchantName.map((merchant: any) => ({
          label: merchant.merchantLegalName,
          value: merchant.merchantId
        }));
      } else {
        this.errorMsg = res.responseMessage;
      }
    });
 
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.policyId = param.Alldata;
      
    });
 
    this.editadminpolicy = new FormGroup({
      termAndCondition: new FormControl('', [Validators.required]),
      disclaimer: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required]),
      refundPolicy: new FormControl('', [Validators.required]),
      // createdBy: new FormControl(),
      modifiedBy: new FormControl(),
      merchantId: new FormControl('', [Validators.required]),
 
    });
 
 
    this.service.Adminpolicyviewbyidedit(this.policyId).subscribe((res: any) => {
      this.policyview = res.response;
      
      this.merchant=this.policyview.entityModel.merchantId
       
       //search dropdown merchant
       if (this.policyview?.entityModel?.merchantId) {
        this.editadminpolicy.get('merchantId')?.setValue(this.policyview.entityModel.merchantId);
      }
    });
  }
 
 
  get merchantId() {
    return this.editadminpolicy.get('merchantId');
  }
 
  get termAndCondition() {
    return this.editadminpolicy.get('termAndCondition');
  }
 
  get disclaimer() {
    return this.editadminpolicy.get('disclaimer');
  }
  get privacyPolicy() {
    return this.editadminpolicy.get('privacyPolicy');
  }
  get refundPolicy() {
    return this.editadminpolicy.get('refundPolicy');
  }
 
 
  adminedit() {
 
    let submitModel: AdminPolicyEdit = {
      termAndCondition: this.termAndCondition?.value,
      disclaimer: this.disclaimer?.value,
      privacyPolicy: this.privacyPolicy?.value,
      refundPolicy: this.refundPolicy?.value,
      modifiedBy: this.getadminname,
      merchantId: this.merchantId?.value
    }
 
    this.service.adminpolicyedit(this.policyId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        this.router.navigateByUrl('dashboard/Terms-policy');
 
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }
 
 
  close() {
    this.router.navigateByUrl('dashboard/Terms-policy');
  }
 
  filterMerchantNames(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredMerchantNames = this.MerchantName
      .filter((merchant: any) =>
        merchant.merchantLegalName.toLowerCase().includes(query)
      )
      .map((merchant: any) => ({
        label: merchant.merchantLegalName,
        value: merchant.merchantId
      }));
  }
 
}
