import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit {

  editadminpolicy!: FormGroup;
  businessCategoryId: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
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
       
    });
  }
 
 
  get merchantId() {
    return this.editadminpolicy.get('merchantId');
  }
}


