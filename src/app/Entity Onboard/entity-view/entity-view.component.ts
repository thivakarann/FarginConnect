import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ApprovalBank, bankData, bankedit, BankPrimaryStatus, BankStatus, Bankverficiation, EmailTrigger, Facheckverification, KycApproval, PassPortverification, VoterIdVerify } from '../../fargin-model/fargin-model.module';
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
import { EntityPgonboardComponent } from '../entity-pgonboard/entity-pgonboard/entity-pgonboard.component';
import { KycInfoComponent } from '../kyc-info/kyc-info.component';
import { UpdateManualpaymentComponent } from '../update-manualpayment/update-manualpayment.component';
import { MerchantLogoComponent } from '../merchant-logo/merchant-logo.component';
import { CreateManualpaymentComponent } from '../create-manualpayment/create-manualpayment.component';
import { KeysUpdateComponent } from '../keys-update/keys-update.component';
import { ViewOnboardinfoComponent } from '../view-onboardinfo/view-onboardinfo.component';

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
  accountId: any;
  startdate!: string;
  enddate!: string;
 
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; // The number of items to display per page
  selected: any;
  selecteded: string = '5';
 
 
  p: any = 1;
 
  alltransactions: any;
  searchText: any;
 
 
 
  navbarEventEmitter: any;
  isDropdownOpen = false;
  searchTexts: any;
 
  Daterange!: string;
  data: any;
  term: any;
  Viewall: any;
  content: any;
  getallData: any;
  serviceid: any;
  ToDateRange: any;
  FromDateRange: any;
  showdata!: boolean;
  Data: any;
  bankapproval: any;
  Kycapproval: any;
  showLiveKeys: any;
  loggedOut!: boolean;
  manualDetails: any;
  id1: any;
  paidamount: any;
  merchantpayid: any;
  id2: any;

 
  selectTab(tab: string): void {
    this.activeTab = tab;
  }
 
  clearFilters(): void {
    // Implement filter clearing logic here
    console.log('Filters cleared');
  }
 
  activeTab: string = 'events';
  @Output()dataSubmitted= new EventEmitter<bankData>();
  @Output()dataSubmitteds= new EventEmitter<bankedit>();
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
      this.bankdetails = res.response.merchantbank;
      this.KYCDetails = res.response.merchantdocument;
 
      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      console.log('BussinessCategoryId', this.businessCategoryId);
      console.log(this.detaislone);
      console.log(this.bankdetails);
      console.log(this.KYCDetails);
 
 
    })
 
    this.MerchantView.GetManualPay(this.id).subscribe((res:any)=>{
      if(res.flag==1){
        this.manualDetails=res.response;
      }
    })
  }
 
  bankStatus(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: BankStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankActiveStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
         this.dialog.closeAll()
 
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
    
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  BankApproval(id: any) {
    const dialogRef= this.dialog.open(ApprovalForBankComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
    dialogRef.componentInstance.datas.subscribe((newBankData: ApprovalBank) => {
      this.bankdetails.push(newBankData);
    });
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
 
 
  viewlogo(id:any,Link:any){
    this.dialog.open(MerchantLogoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id,
        value1:Link
 
      }
    })
  }
  KycApproval(id: any) {
    const dialogRef = this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    });
  
    dialogRef.componentInstance.dataApproval.subscribe((newBankData: KycApproval) => {
      this.KYCDetails.push(newBankData);
      // Optionally refresh UI or perform other actions
    });
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
    const dialogRef = this.dialog.open(EntityBankaddComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    });
 
    dialogRef.componentInstance.dataSubmitted.subscribe((newBankData: bankData) => {
      this.bankdetails.push(newBankData);
    });
  }
  editbank(id: any) {
    const dialogRef =  this.dialog.open(EntityBankeditComponent, {
      disableClose: true,
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    });
    dialogRef.componentInstance.dataSubmitteds.subscribe((newBankData: bankedit) => {
      this.bankdetails.push(newBankData);
    });
 
  }
    addKycdocuments(id: any, BusinessCategoryId: any) {
      const dialogRef =  this.dialog.open(AddKycdocumentComponent, {
        enterAnimationDuration: "1000ms",
        exitAnimationDuration: "1000ms",
        disableClose: true,
        data: {
          value: this.id,
          value1: this.businessCategoryId
        }
      })
      dialogRef.componentInstance.dataKYC.subscribe((newBankData: FormData) => {
        this.KYCDetails.push(newBankData);
      });
 
  }
 
  editKycDocuments(id: any,data:any) {
    this.dialog.open(EditKycdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
        value1: this.businessCategoryId,
        value2:data
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
    console.log(data)
    console.log(ApprovedBy)
    let submitModel: Facheckverification =
    {
      kycId: id,
      docNumber: data,
      approvalBy: ApprovedBy
    }
 
    if (Docname == 'Aadhaar') {
      this.MerchantView.FacheckAadharVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
 
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'PAN') {
      this.MerchantView.FacheckPanVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'Cin') {
      let submitModel: Facheckverification =
      {
        kycId: id,
        docNumber: data,
        approvalBy: ApprovedBy
      }
      this.MerchantView.FacheckCinchVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
 
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'GST') {
 
      this.MerchantView.FacheckGSTVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
 
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
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
 
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
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
 
        }
        else {
          this.toastr.error(res.responseMessage)
        }
      })
    }
    else if (Docname == 'VoterId') {
 
      let submitModel: VoterIdVerify =
      {
        kycId: id,
        docNumber: data,
        // approvalBy: ApprovedBy,
      }
      this.MerchantView.FacheckVoterIdVerification(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
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
 
  KycInfo(id: any, Docname: any) {
    this.dialog.open(KycInfoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
        value1: Docname
      }
    })
  }
 
  pgOnboard() {
    this.dialog.open(EntityPgonboardComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
 
  }
 
  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/entitycustomerviewAll/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
 
  Viewqr(id: any) {
    this.router.navigate([`dashboard/entity-qrcode/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
 
  ViewRefund(id: any) {
    this.router.navigate([`dashboard/entity-refund/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
 
  viewsettlement
    (id: any) {
    this.router.navigate([`dashboard/entity-settlement/${id}`], {
      queryParams: { Alldata: id },
    });
    console.log(id);
  }
  editpersonalInfo(id: any) {
    this.router.navigate([`dashboard/edit-personal/${id}`], {
      queryParams: { Alldata: id },
    });
 
  }
 
  close() {
    this.router.navigate([`dashboard/entity-viewall`], {
      // queryParams: { Alldata: id },
    });
  }
 
  emailtrigger() {
    let submitModel: EmailTrigger = {
      merchantId: this.id,
      linkExpiry: '2024-09-20',
      description: 'Testt',
      returnUrl: 'https://ess.pockethrms.com/Home/Dashboard?Menu=DashBoard'
    }
    this.MerchantView.EmailTrigger(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
 

 
  entityTransaction(id: any) {
    this.router.navigate([`dashboard/entity-transaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  createmanualPayement(){
    this.dialog.open(CreateManualpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }
 
  viewmanualtransaction(id:any){
  console.log(this.id)
  this.router.navigate([`dashboard/manual-transaction/${id}`], {
    queryParams: { Alldata: id },
  });
}
 
 
  manualPayement(id:any){
    this.dialog.open(UpdateManualpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {    
        value:id,
      }
    })
  }

  viewOnboardInfo(id:any){
    this.dialog.open(ViewOnboardinfoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {    
        value:id,
      }
    })
  }
}
