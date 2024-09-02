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


  constructor(
    private dialog: MatDialog,
     private service: FarginServiceService, 
     private toastr: ToastrService,
     private router: Router, 
     private ActivateRoute: ActivatedRoute) {

  }



  ngOnInit(): void {



    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.policyId = param.Alldata;
      console.log(this.policyId)
    });

    this.editadminpolicy = new FormGroup({
      termAndCondition: new FormControl('', [Validators.required]),
      disclaimer: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required]),
      refundPolicy: new FormControl('', [Validators.required]),
      createdBy: new FormControl(),
      modifiedBy: new FormControl()
    });


    this.service.Adminpolicyviewbyidedit(this.policyId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.policyview = res.response;
        this.dataSource = new MatTableDataSource(this.businesscategory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;
      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
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
      createdBy: this.getadminname,
      modifiedBy: this.getadminname
    }

    this.service.adminpolicyedit(this.policyId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        window.location.reload()
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }


  close() {
    this.router.navigateByUrl('dashboard/Terms-policy');
  }

}
