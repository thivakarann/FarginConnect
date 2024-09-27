import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BankPrimaryStatus, BankStatus, Bankverficiation, EmailTrigger, Facheckverification, PassPortverification, VoterIdVerify } from '../../fargin-model/fargin-model.module';
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
  valueentityEdit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueentitySecretkey: any;
  valueentityApi: any;
  valueentityEmailnotify: any;
  valuePersonalApproval: any;
  valuebankadd: any;
  valuebankstatus: any;
  valuebankprimaryStatus: any;
  valuebankapproval: any;
  valuebankupdate: any;
  valuebankverification: any;
valueKycAdd: any;
valueKycFile: any;
valueKycApproval: any;
valueKyccEdit: any;
valueKycVerification: any;
valueFinalapprove: any;


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
      this.bankdetails = res.response.merchantbank;
      this.KYCDetails = res.response.merchantdocument;

      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      console.log('BussinessCategoryId', this.businessCategoryId);
      console.log(this.detaislone);
      console.log(this.bankdetails);
      console.log(this.KYCDetails);
    })

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.valueentityEdit = 'Entity View-Edit';
            this.valueentityApi = 'Entity View-APIkey';
            this.valueentitySecretkey = 'Entity View-SecretKey';
            this.valueentityEmailnotify = 'Entity View-Email Notification';
            this.valuePersonalApproval = 'Entity View-Personal Approval'
            this.valuebankadd = 'Bank-Add';
            this.valuebankstatus = 'Bank-Status'
            this.valuebankprimaryStatus = 'Bank Primary-Status'
            this.valuebankapproval = 'Bank-Approval'
            this.valuebankupdate = 'Bank-Edit'
            this.valuebankverification = 'Bank-Verfification'
            this.valueKycAdd='KYC-add';
            this.valueKycFile='KYC-Image';
            this.valueKycApproval='KYC-Approval';
            this.valueKyccEdit='KYC-Edit';
            this.valueKycVerification='KYC-Verification'
            this.valueFinalapprove='Final-Approval'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              

              if (this.actions == 'Entity View-Edit') {
                this.valueentityEdit = 'Entity View-Edit';
              }
              if (this.actions == 'Entity View-APIkey') {
                this.valueentityApi = 'Entity View-APIkey';
              }
              if (this.actions == 'Entity View-SecretKey') {
                this.valueentitySecretkey = 'Entity View-SecretKey';
              }
              if (this.actions == 'Entity View-Email Notification') {
                this.valueentityEmailnotify = 'Entity View-Email Notification'
              }
              if (this.actions == 'Entity View-Personal Approval') {
                this.valuePersonalApproval = 'Entity View-Personal Approval'
              }
              if (this.actions == 'Bank-Add') {
                this.valuebankadd = 'Bank-Add'
              }
              if (this.actions == 'Bank-Status') {
                this.valuebankstatus = 'Bank-Status'
              }
              if (this.actions == 'Bank Primary-Status') {
                this.valuebankprimaryStatus = 'Bank Primary-Status';
              }
              if (this.actions == 'Bank-Approval') {
                this.valuebankapproval = 'Bank-Approval';
              }
              if (this.actions == 'Bank-Edit') {
                this.valuebankupdate = 'Bank-Edit';
              }
              if (this.actions == 'Bank-Verfification') {
                this.valuebankverification = 'Bank-Verfification'
              }
              if(this.actions=='KYC-add'){
                this.valueKycAdd='KYC-add'
              }
              if(this.actions=='KYC-Image'){
                this.valueKycFile='KYC-Image'
              }
              if(this.actions=='KYC-Approval'){
                this.valueKycApproval='KYC-Approval'
              }
              if(this.actions=='KYC-Edit'){
                this.valueKyccEdit='KYC-Edit'
              }
              if(this.actions=='KYC-Verification'){
                this.valueKycVerification='KYC-Verification'
              }
              if(this.actions=='Final-Approval'){
                this.valueFinalapprove='Final-Approval'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
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
        setTimeout(() => {
          window.location.reload()
        }, 1000);
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


  viewlogo(id: any, Link: any) {
    this.dialog.open(MerchantLogoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: {
        value: id,
        value1: Link

      }
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

  editKycDocuments(id: any, data: any) {
    this.dialog.open(EditKycdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
        value1: this.businessCategoryId,
        value2: data
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
        window.location.reload();
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

  copyText(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  entityTransaction(id: any) {
    this.router.navigate([`dashboard/entity-transaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  manualPayement(id: any) {
    this.dialog.open(UpdateManualpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }
}
