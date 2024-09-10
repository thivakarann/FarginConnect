import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BankPrimaryStatus, BankStatus, Bankverficiation, Facheckverification, PassPortverification } from '../../fargin-model/fargin-model.module';
import { ApprovalForBankComponent } from '../approval-for-bank/approval-for-bank.component';
import { CommentsForApprovalComponent } from '../comments-for-approval/comments-for-approval.component';
import { KycApprovalComponent } from '../kyc-approval/kyc-approval.component';
import { KycdocumentViewComponent } from '../kycdocument-view/kycdocument-view.component';
import { KycCommentsComponent } from '../kyc-comments/kyc-comments.component';
import { AddKycdocumentComponent } from '../add-kycdocument/add-kycdocument.component';
import { EditKycdocumentComponent } from '../edit-kycdocument/edit-kycdocument.component';
import { CommentsforApprovaloneComponent } from '../commentsfor-approvalone/commentsfor-approvalone.component';
import { LevelOneApprovalComponent } from '../level-one-approval/level-one-approval.component';
import { LevelTwoApprovalComponent } from '../level-two-approval/level-two-approval.component';
import { CommentsforApprovaltwoComponent } from '../commentsfor-approvaltwo/commentsfor-approvaltwo.component';
import { FormGroup } from '@angular/forms';
import { EntityBankaddComponent } from '../entity-bankadd/entity-bankadd.component';
import { EntityBankeditComponent } from '../entity-bankedit/entity-bankedit.component';
import { BankInfoComponent } from '../bank-info/bank-info.component';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrl: './entity-view.component.css'
})
export class EntityViewComponent implements OnInit {

  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  id: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  KYCDetails: any;
  isChecked: boolean = false;
  businessCategoryId: any;
  BusinessCategoryId: any;
  approval1: any;
  approvedBy1: any;
  secondFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  clearFilters(): void {
    // Implement filter clearing logic here
    console.log('Filters cleared');
  }

  activeTab: string = 'events';


  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.approval1 = this.detaislone?.approvalStatusL1;
      this.bankdetails = res.response.merchantbank;
      this.KYCDetails = res.response.merchantdocument;

      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      console.log('BussinessCategoryId', this.businessCategoryId);
      console.log(this.detaislone);
      console.log(this.bankdetails);
      console.log(this.KYCDetails);
      console.log('Approval1', this.approval1)

    })
  }


  bankStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: BankStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankActiveStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload();

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: BankPrimaryStatus = {
      primaryAccountStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankprimaryStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        window.location.reload()
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }


  BankApproval(id: any) {
    this.dialog.open(ApprovalForBankComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
  }

  BankComments(id: any) {
    this.dialog.open(CommentsForApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })



  }



  getFrontPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 1 }
    })
  }


  getBackPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 2 }
    })
  }

  KycApproval(id: any) {
    this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
  }
  KYCComments(id: any) {
    this.dialog.open(KycCommentsComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
  }


  addbank(id: any) {
    this.dialog.open(EntityBankaddComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }

  editbank(id: any) {
    this.dialog.open(EntityBankeditComponent, {
      disableClose: true,
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })

  }
  addKycdocuments(id: any, BusinessCategoryId: any) {
    this.dialog.open(AddKycdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
        value1: this.businessCategoryId
      }
    })
  }

  editKycDocuments(id: any) {
    this.dialog.open(EditKycdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
        value1: this.businessCategoryId
      }
    })
  }
  levelOneApproval(id: any) {
    this.dialog.open(LevelOneApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })

  }


  levelTwoApproval(id: any) {
    this.dialog.open(LevelTwoApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  leveloneComments(comment: any) {
    this.dialog.open(CommentsforApprovaloneComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: comment,
      }
    })
  }

  levelTwoComments(commentL2: any) {
    this.dialog.open(CommentsforApprovaltwoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: commentL2,
      }
    })
  }


  FacheckVerification(Docname: any, data: any, id: any, ApprovedBy: any) {



    if (Docname == 'Aadhar Card') {
      let submitModel: Facheckverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy
      }

      this.MerchantView.FacheckAadharVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'PAN') {
      let submitModel: Facheckverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy
      }

      this.MerchantView.FacheckPanVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'Cinch') {
      let submitModel: Facheckverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy
      }
      this.MerchantView.FacheckCinchVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'GST') {
      let submitModel: Facheckverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy
      }
      this.MerchantView.FacheckGSTVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'Passport') {
      let submitModel: PassPortverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy,
        dateOfBirth: '27-03-2001'
      }
      this.MerchantView.FacheckPassportVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }


    else if (Docname == 'Driving License') {
      let submitModel: PassPortverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy,
        dateOfBirth: '27-03-2001'
      }
      this.MerchantView.FacheckLicenseVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage)
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
  }

  bankVerification(id: any) {
    let submitModel: Bankverficiation =
    {
      merchantBankId: id
    }
    this.MerchantView.BankVerification(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  bankInfo(id: any) {
    this.dialog.open(BankInfoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }
}



