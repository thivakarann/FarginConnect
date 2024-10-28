import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ApprovalBank, bankData, bankedit, BankPrimaryStatus, Bankverficiation, Drivingverification, EmailTrigger, Facheckverification, KycApproval, Pasportverify, PassPortverification, PgOnboard, settopStatus, SmsStatus, verification, verify, VoterIdVerify } from '../../fargin-model/fargin-model.module';
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
import { BankVerificationMatchComponent } from '../bank-verification-match/bank-verification-match.component';
import { CreateOtherpaymentComponent } from '../create-otherpayment/create-otherpayment.component';
import { EditOtherpaymentComponent } from '../edit-otherpayment/edit-otherpayment.component';
import { EntityKyceditComponent } from '../entity-kycedit/entity-kycedit.component';
import { SmsCreateComponent } from '../sms-create/sms-create.component';
import { EditSmsComponent } from '../edit-sms/edit-sms.component';
import { AddBussinessdocumentComponent } from '../bussiness-document/add-bussinessdocument/add-bussinessdocument.component';
import { ApprovalBussinessdocumentComponent } from '../bussiness-document/approval-bussinessdocument/approval-bussinessdocument.component';
import { CommentBussinessdocumentComponent } from '../bussiness-document/comment-bussinessdocument/comment-bussinessdocument.component';
import { EditBussinessdocumentComponent } from '../bussiness-document/edit-bussinessdocument/edit-bussinessdocument.component';
import { ImageBussinessdocumentComponent } from '../bussiness-document/image-bussinessdocument/image-bussinessdocument.component';
import { SmsApprovalComponent } from '../sms-approval/sms-approval.component';
import { SmsHistoryEntityComponent } from '../sms-history-entity/sms-history-entity.component';

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
  copySuccess: boolean = false;
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; // The number of items to display per page
  selected: any;
  selecteded: string = '5';


  p: any = 1;

  alltransactions: any;
  searchText: any;


  valuesmssetting: any
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
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueentitytransaction: any;
  valuentitysettlement: any;
  valueentityRefund: any;
  valueentityqr: any;
  valueentityCustomers: any;
  valueentitypaylink: any;
  valueGeneral: any;
  valuebankinfo: any;
  valuekycdocument: any;
  valuefinalapproval: any;
  valueplatform: any;
  valuelogo: any;
  valueeditentity: any;
  valueviewonboard: any;
  valueentityonboard: any;
  valuelevelcomment: any;
  valueapproval: any;
  valuebankadd: any;
  valuebanksts: any;
  valueprimarysts: any;
  valuebankapproval: any;
  valuebankcomment: any;
  valuebankedit: any;
  valuebankverify: any;
  valuebankapprovalsts: any;
  valuekycadd: any;
  valuekycfile: any;
  valuekyccomment: any;
  valueekycedit: any;
  valuekycverfication: any;
  valuemanualpay: any;
  valuemanualedit: any;
  valuemanualview: any;
  valuefinalcomment: any;
  valuefinalapprovals: any;
  valueEntityqrs: any;
  otherDetails: any;
  payid: any;
  identityProof: any;
  addressProof: any;
  signatureProof: any;
  addressedit: any;
  smsDetails: any;
  merchantsmsId: any;
  bussinessdoc: any;
  valuekycimage: any;
  valuekycedit: any;
  valuekycverification: any;
  valuekycapproval: any;
  valuebussinessdocument: any;
  valuebussinessAdd: any;
  valuebussinessImage: any;
  valuebussinessapproval: any;
  valuebussinesscomment: any;
  valuebussinessedit: any;
  valuemanualpayment: any;
  valueCustomized: any;
  valueCustomizedadd: any;
  valueCustomizededit: any;
  valueCustomizedview: any;
  valuesmsadd: any;
  valuesmsapproval: any;
  valuesmsstatus: any;
  valuesmsview: any;
  valuesmsedit: any
  valueentityautodebit: any;
  entitypermission: any[] = [];
  roles: any;
  paymentStatus: any;
  paymentMethod: any;
  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  clearFilters(): void {
    // Implement filter clearing logic here
    
  }

  activeTab: string = 'events';
  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          this.entitypermission = res.response?.permission
          

          this.getpermissionValue();
          if (this.roleId == 1) {


            this.valueplatform = 'Entity View Platform Payment';
            this.valuelogo = 'Entity View-LOGO';
            this.valueeditentity = 'Entity View-Edit';
            this.valueviewonboard = 'Entity View-Onboard Information'
            this.valueentityonboard = 'Entity View-Onboard'
            this.valuelevelcomment = 'Entity View-Comment';
            this.valueapproval = 'Entity View-Approval'
            this.valuebankadd = 'Bank-Add';
            this.valuebanksts = 'Bank-Status'
            this.valueprimarysts = 'Bank Primary-Status'
            this.valuebankapproval = 'Bank-Approval'
            this.valuebankcomment = 'Bank-comment'
            this.valuebankedit = 'Bank-Edit'
            this.valuebankverify = 'Bank-Verification'
            this.valuebankapprovalsts = 'Bank-Approval Status'
            this.valuekyccomment = 'Entity View KYC Document-comments'
            this.valuekycimage = 'Entity View KYC Document-Image'
            this.valuekycedit = 'Entity View KYC Document-Edit'
            this.valuekycapproval = 'Entity View KYC Document-Approval'
            this.valuekycverification = 'Entity View KYC Document-Verification'
            this.valuefinalapprovals = 'Final-Approval'
            this.valuemanualpay = 'One Time Setup Payment-Create'
            this.valuemanualedit = 'One Time Setup Payment-Edit'
            this.valuemanualview = 'One Time Setup Payment-View'
            this.valuefinalcomment = 'Final-Comment'
             this.valuefinalcomment = 'Final-Comment'
              this.valuefinalcomment = 'Final-Comment'

            this.valuebussinessAdd = 'Entity View Bussiness Document-Add'
            this.valuebussinessapproval = 'Entity View Bussiness Document-Approval'
            this.valuebussinesscomment = 'Entity View Bussiness Document-Comments'
            this.valuebussinessImage = 'Entity View Bussiness Document-Image'
            this.valuebussinessedit = 'Entity View Bussiness Document-Edit'


            this.valueCustomizedadd = 'Entity View Customized Payment-Add'
            this.valueCustomizededit = 'Entity View Customized Payment-Edit'
            this.valueCustomizedview = 'Entity View Customized Payment-View'

            this.valuesmsadd = 'Sms Setting-Add'
            this.valuesmsapproval = 'Sms Setting-Approval'
            this.valuesmsedit = 'Sms Setting-Edit'
            this.valuesmsview = 'Sms Setting-View'
            this.valuesmsstatus = 'Sms Setting-Status'
            this.valuekycadd = 'Entity View KYC Document-add'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View KYC Document-add') {
                this.valuekycadd = 'Entity View KYC Document-add'
              }
              if (this.actions == 'Sms Setting-Edit') {
                this.valuesmsedit = 'Sms Setting-Edit'
              }
              if (this.actions == 'Sms Setting-Add') {
                this.valuesmsadd = 'Sms Setting-Add'
              }
              if (this.actions == 'Sms Setting-Approval') {
                this.valuesmsapproval = 'Sms Setting-Approval'
              }
              if (this.actions == 'Sms Setting-View') {
                this.valuesmsview = 'Sms Setting-View'
              }
              if (this.actions == 'Sms Setting-Status') {
                this.valuesmsstatus = 'Sms Setting-Status'
              }




              if (this.actions == 'Entity View Platform Payment') {
                this.valueplatform = 'Entity View Platform Payment'
              }
              if (this.actions == 'Entity View-LOGO') {
                this.valuelogo = 'Entity View-LOGO'
              }
              if (this.actions == 'Entity View-Edit') {
                this.valueeditentity = 'Entity View-Edit'
              }
              if (this.actions == 'Entity View-Onboard Information') {
                this.valueviewonboard = 'Entity View-Onboard Information'
              }
              if (this.actions == 'Entity View-Onboard') {
                this.valueentityonboard = 'Entity View-Onboard'
              }
              if (this.actions == 'Entity View-Comment') {
                this.valuelevelcomment = 'Entity View-Comment'
              }
              if (this.actions == 'Entity View-Approval') {
                this.valueapproval = 'Entity View-Approval'
              }
              if (this.actions == 'Bank-Add') {
                this.valuebankadd = 'Bank-Add'
              }
              if (this.actions == 'Bank-Status') {
                this.valuebanksts = 'Bank-Status'
              }

              if (this.actions == 'Bank Primary-Status') {
                this.valueprimarysts = 'Bank Primary-Status'
              }
              if (this.actions == 'Bank-Approval') {
                this.valuebankapproval = 'Bank-Approval'
              }
              if (this.actions == 'Bank-comment') {
                this.valuebankcomment = 'Bank-comment'
              }
              if (this.actions == 'Bank-Edit') {
                this.valuebankedit = 'Bank-Edit'
              }
              if (this.actions == 'Bank-Verification') {
                this.valuebankverify = 'Bank-Verification'
              }
              if (this.actions == 'Bank-Approval Status') {
                this.valuebankapprovalsts = 'Bank-Approval Status'
              }

              if (this.actions == 'Entity View KYC Document-comments') {
                this.valuekyccomment = 'Entity View KYC Document-comments'
              }
              if (this.actions == 'Entity View KYC Document-Image') {
                this.valuekycimage = 'Entity View KYC Document-Image'
              }
              if (this.actions == 'Entity View KYC Document-Edit') {
                this.valuekycedit = 'Entity View KYC Document-Edit'
              }
              if (this.actions == 'Entity View KYC Document-Approval') {
                this.valuekycapproval = 'Entity View KYC Document-Approval'
              }
              if (this.actions == 'Entity View KYC Document-Verification') {
                this.valuekycverification = 'Entity View KYC Document-Verification'
              }
              if (this.actions == 'Final-Approval') {
                this.valuefinalapprovals = 'Final-Approval'
              }
              if (this.actions == 'One Time Setup Payment-Create') {
                this.valuemanualpay = 'One Time Setup Payment-Create'
              }
              if (this.actions == 'One Time Setup Payment-Edit') {
                this.valuemanualedit = 'One Time Setup Payment-Edit'
              }
              if (this.actions == 'One Time Setup Payment-View') {
                this.valuemanualview = 'One Time Setup Payment-View'
              }
              if (this.actions == 'Final-Comment') {
                this.valuefinalcomment = 'Final-Comment'
              }
              if (this.actions == 'Entity View Bussiness Document') {
                this.valuebussinessdocument = 'Entity View Bussiness Document'
              }
              if (this.actions == 'Entity View Bussiness Document-Add') {
                this.valuebussinessAdd = 'Entity View Bussiness Document-Add'
              }
              if (this.actions == 'Entity View Bussiness Document-Edit') {
                this.valuebussinessedit = 'Entity View Bussiness Document-Edit'
              }
              if (this.actions == 'Entity View Bussiness Document-Image') {
                this.valuebussinessImage = 'Entity View Bussiness Document-Image'
              }
              if (this.actions == 'Entity View Bussiness Document-Comments') {
                this.valuebussinesscomment = 'Entity View Bussiness Document-Comments'
              }

              if (this.actions == 'Entity View Bussiness Document-Approval') {
                this.valuebussinessapproval = 'Entity View Bussiness Document-Approval'
              }


              if (this.actions == 'Entity View Customized Payment-Add') {
                this.valueCustomizedadd = 'Entity View Customized Payment-Add'
              }
              if (this.actions == 'Entity View Customized Payment-Edit') {
                this.valueCustomizededit = 'Entity View Customized Payment-Edit'
              }
              if (this.actions == 'Entity View Customized Payment-View') {
                this.valueCustomizedview = 'Entity View Customized Payment-View'
              }


            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });




    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      

      this.detaislone = res.response.merchantpersonal;
      this.bankdetails = res.response.merchantbank;
      this.KYCDetails = res.response.merchantkycdocument;
      this.bussinessdoc = res.response.merchantbusinessdocument;
      
      this.identityProof = res.response.merchantkycdocument[0].identityProof;
      this.addressProof = res.response.merchantkycdocument[0].addressProof;
      this.signatureProof = res.response.merchantkycdocument[0].signatureProof;




      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      
      
      
      


    })

    this.MerchantView.GetManualPay(this.id).subscribe((res: any) => {

      if (res.flag == 1) {
        this.manualDetails = res.response;

        this.manualDetails.forEach((item: any) => {
          this.paymentStatus = item.paymentStatus;
          this.paymentMethod = item.paymentMethod
          

        });
      }
    })


    this.MerchantView.OtherPayByMerchantId(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.otherDetails = res.response;
      }
    });

    this.MerchantView.SMSViewById(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsDetails = res.response;

      }
    })
  }
  getpermissionValue() {

    if (this.roleId == 1) {
      this.valueentitytransaction = 'Entity View Transaction';
      this.valueentityautodebit = 'Entity View Rent Logs'
      this.valuentitysettlement = 'Entity View Settlement';
      this.valueentityRefund = 'Entity View Refund';
      this.valueEntityqrs = 'Entity View QR';
      this.valueentityCustomers = 'Entity View Customer';
      this.valueentitypaylink = 'Entity View Payment Link';
      this.valueGeneral = 'Entity View General Information';
      this.valuebankinfo = 'Entity View Bank Information';
      this.valuekycdocument = 'Entity View KYC Document';
      this.valuefinalapproval = 'Entity View Final Approval';
      this.valuebussinessdocument = 'Entity View Bussiness Document'
      this.valuemanualpayment = 'One Time Setup Payment'
      this.valueCustomized = 'Entity View Customized Payment'
      this.valuesmssetting = 'Sms Setting'

    }
    else {
      for (let data of this.entitypermission) {
        this.roles = data.permission;
        if (this.roles == 'Entity View Transaction') {
          this.valueentitytransaction = 'Entity View Transaction';
        }
        if (this.roles == 'Entity View Settlement') {
          this.valuentitysettlement = 'Entity View Settlement'
        }
        if (this.roles == 'Entity View Refund') {
          this.valueentityRefund = 'Entity View Refund'
        }
        if (this.roles == 'Entity View QR') {
          this.valueEntityqrs = 'Entity View QR'
        }
        if (this.roles == 'Entity View Customer') {
          this.valueentityCustomers = 'Entity View Customer'
        }
        if (this.roles == 'Entity View Payment Link') {
          this.valueentitypaylink = 'Entity View Payment Link'
        }
        if (this.roles == 'Entity View Rent Logs') {
          this.valueentityautodebit = 'Entity View Rent Logs'
        }
        if (this.roles == 'Entity View Bussiness Document') {
          this.valuebussinessdocument = 'Entity View Bussiness Document'
        }
        if (this.roles == 'One Time Setup Payment') {
          this.valuemanualpayment = 'One Time Setup Payment'
        }
        if (this.roles == 'Entity View General Information') {
          this.valueGeneral = 'Entity View General Information'
        }
        if (this.roles == 'Entity View Bank Information') {
          this.valuebankinfo = 'Entity View Bank Information'
        }
        if (this.roles == 'Entity View KYC Document') {
          this.valuekycdocument = 'Entity View KYC Document'
        }
        if (this.roles == 'Entity View Final Approval') {
          this.valuefinalapproval = 'Entity View Final Approval'
        }
        if (this.roles == 'Entity View Customized Payment') {
          this.valueCustomized = 'Entity View Customized Payment'
        }
        if (this.roles == 'Sms Setting') {
          this.valuesmssetting = 'Sms Setting'
        }
      }
    }
  }
  bankStatus(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: settopStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankActiveStatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }



  viewpaymentLink(id: any) {
    this.router.navigate([`dashboard/paymentlink-view/${id}`], {
      queryParams: { Alldata: id },
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
        setTimeout(() => {
          window.location.reload()
        }, 500);

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
    // dialogRef.componentInstance.datas.subscribe((newBankData: ApprovalBank) => {
    //   this.bankdetails.push(newBankData);
    // });
  }
  BankComments(id: any) {
    this.dialog.open(CommentsForApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })

  }
  // getFrontPath(id: any) {
  //   this.dialog.open(KycdocumentViewComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",
  //     // disableClose: true,
  //     data: { value: id, value1: 1 }
  //   })
  // }
  // getBackPath(id: any) {
  //   this.dialog.open(KycdocumentViewComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",
  //     // disableClose: true,
  //     data: { value: id, value1: 2 }
  //   })
  // }


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
  // KycApproval(id: any) {
  //   this.dialog.open(KycApprovalComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",
  //     disableClose: true,
  //     data: { value: id }
  //   });


  // }

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
        value: id,
      }
    });

    // dialogRef.componentInstance.dataSubmitted.subscribe((newBankData: bankData) => {
    //   this.bankdetails.push(newBankData);
    // });
  }
  editbank(id: any) {
    this.dialog.open(EntityBankeditComponent, {
      disableClose: true,
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    });
    // dialogRef.componentInstance.dataSubmitteds.subscribe((newBankData: bankedit) => {
    //   this.bankdetails.push(newBankData);
    // });

  }
  addKycdocuments(id: any) {
    this.dialog.open(AddKycdocumentComponent, {
      width: '50vw',
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
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
  // FacheckVerification(Docname: any, data: any, id: any, ApprovedBy: any) {
  //   
  //   
  //   let submitModel: Facheckverification =
  //   {
  //     kycId: id,
  //     docNumber: data,
  //     approvalBy: ApprovedBy
  //   }

  //   if (Docname == 'Aadhaar') {
  //     this.MerchantView.FacheckAadharVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);

  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  //   else if (Docname == 'PAN') {
  //     this.MerchantView.FacheckPanVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);
  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  //   else if (Docname == 'Cin') {
  //     let submitModel: Facheckverification =
  //     {
  //       kycId: id,
  //       docNumber: data,
  //       approvalBy: ApprovedBy
  //     }
  //     this.MerchantView.FacheckCinchVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);

  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  //   else if (Docname == 'GST') {

  //     this.MerchantView.FacheckGSTVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);

  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  //   else if (Docname == 'Passport') {
  //     let submitModel: PassPortverification =
  //     {
  //       kycId: id,
  //       docNumber: data,
  //       approvalBy: ApprovedBy,
  //       dateOfBirth: '27-03-2001'
  //     }
  //     this.MerchantView.FacheckPassportVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);

  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }


  //   else if (Docname == 'Driving License') {
  //     let submitModel: PassPortverification =
  //     {
  //       kycId: id,
  //       docNumber: data,
  //       approvalBy: ApprovedBy,
  //       dateOfBirth: '27-03-2001'
  //     }
  //     this.MerchantView.FacheckLicenseVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);

  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  //   else if (Docname == 'VoterId') {

  //     let submitModel: VoterIdVerify =
  //     {
  //       kycId: id,
  //       docNumber: data,
  //       // approvalBy: ApprovedBy,
  //     }
  //     this.MerchantView.FacheckVoterIdVerification(submitModel).subscribe((res: any) => {
  //       if (res.flag == 1) {
  //         this.toastr.success(res.responseMessage);
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 500);
  //       }
  //       else {
  //         this.toastr.error(res.responseMessage)
  //       }
  //     })
  //   }
  // }
  bankVerification(id: any) {
    let submitModel: Bankverficiation =
    {
      merchantBankId: id
    }
    this.MerchantView.BankVerification(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);


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

  BankVerificationMatch(id: any) {
    this.dialog.open(BankVerificationMatchComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  // KycInfo(id: any, Docname: any) {
  //   this.dialog.open(KycInfoComponent, {
  //     enterAnimationDuration: "1000ms",
  //     exitAnimationDuration: "1000ms",
  //     disableClose: true,
  //     data: {
  //       value: id,
  //       value1: Docname
  //     }
  //   })
  // }

  pgOnboard() {
    let submitmodel: PgOnboard = {
      merchantId: this.id,
    }

    this.MerchantView.PgOnboard(submitmodel).subscribe((res: any) => {
      if (res.response.flag == 1) {
        this.toastr.success(res.response.message);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.response.message)
      }
    })

  }

  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/entitycustomerviewAll/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  Viewqr(id: any) {
    this.router.navigate([`dashboard/entity-qrcode/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  ViewRefund(id: any) {
    this.router.navigate([`dashboard/entity-refund/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }
  Viewautodebit(id: any) {
    this.router.navigate([`dashboard/entity-auto-debit-by-id/${id}`], {
      queryParams: { Alldata: id },
    });
    
  }

  viewsettlement
    (id: any) {
    this.router.navigate([`dashboard/entity-settlement/${id}`], {
      queryParams: { Alldata: id },
    });
    
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

  createmanualPayement() {
    this.dialog.open(CreateManualpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }

  viewmanualtransaction(id: any) {
    
    this.router.navigate([`dashboard/manual-transaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }


  manualPayement(id: any) {
    this.dialog.open(UpdateManualpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  viewOnboardInfo(id: any) {
    this.dialog.open(ViewOnboardinfoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
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
    this.copySuccess = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }



  otherPayement() {
    this.dialog.open(CreateOtherpaymentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }

  viewOthertransaction(id: any) {
    this.payid = id;
    this.router.navigate([`dashboard/otherpay-trans/${this.payid}`], {
      queryParams: { Alldata: this.payid },
    });
  }

  editotherPayment(data: any) {
    this.dialog.open(EditOtherpaymentComponent, {
      disableClose: true,
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: data }
    });
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

  addressProofFrontPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 3 }
    })
  }

  addressProofBackPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 4 }
    })
  }
  signatureProofFrontPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 5 }
    })
  }

  signatureProofBackPath(id: any) {
    this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 6 }
    })
  }


  identityedit(id: any) {
    this.dialog.open(EntityKyceditComponent, {
      width: '30vw',

      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: {
        value: 1,
        value1: id
      }
    })
  }

  addressedits(id: any) {

    this.dialog.open(EntityKyceditComponent, {
      width: '30vw',
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: 2, value1: id }
    })
  }

  signatureedits(id: any) {
    this.dialog.open(EntityKyceditComponent, {
      width: '30vw',
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: 3, value1: id }
    })
  }


  //fa check verification
  kycVerificationsIdentity(id: any, id1: any, id2: any, id3: any, id4: any) {

    if (id2 == "Pancard") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname
      }
      

      this.MerchantView.panVerifysIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })

    }
    if (id2 == "Aadhar Card") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.adharVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "GST") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.gstVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Driving License") {
      let submitModel: Drivingverification =
      {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3

      }
      this.MerchantView.drivingverfiyidentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Passport") {
      let submitModel: Pasportverify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4

      }
      this.MerchantView.passportVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Voter Id Proof") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.voterverifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Cin") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname

      }
      this.MerchantView.cinVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }
  }


  kycVerificationsAddress(id: any, id1: any, id2: any, id3: any, id4: any) {

    if (id2 == "Pancard") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname
      }
      

      this.MerchantView.panverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })

    }
    if (id2 == "Aadhar Card") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.adharverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "GST") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.gstverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Driving License") {
      let submitModel: Drivingverification =
      {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,

      }
      this.MerchantView.drivingverifyaddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Passport") {
      let submitModel: Pasportverify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4


      }
      this.MerchantView.passportVerifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Voter Id Proof") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.voterverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Cin") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname

      }
      this.MerchantView.cinVerifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }
  }


  kycVerificationsSignature(id: any, id1: any, id2: any, id3: any, id4: any) {
    if (id2 == "Pancard") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname
      }
      

      this.MerchantView.panverifysignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })

    }
    if (id2 == "Aadhar Card") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.adharverifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "GST") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.gstverifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Driving License") {
      let submitModel: Drivingverification =
      {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,

      }
      this.MerchantView.drivingverifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Passport") {
      let submitModel: Pasportverify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4

      }
      this.MerchantView.passportVerifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Voter Id Proof") {
      let submitModel: verification =
      {
        kycId: id1,
        facheckDocNumber: id,

      }
      this.MerchantView.voterverifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }

    if (id2 == "Cin") {
      let submitModel: verify =
      {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname

      }
      this.MerchantView.cinverifySignature(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          this.toastr.error(res.responseMessage);
        }
      })
    }
  }


  KycInfo(id: any) {
    this.dialog.open(KycInfoComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }


  KycApproval(id: any) {
    this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id, value1: 1 }
    });
  }

  KycApproval1(id: any) {
    this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id, value1: 2 }
    });
  }


  KycApproval2(id: any) {
    this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id, value1: 3 }
    });
  }


  getdocFrontPath(id: any) {
    this.dialog.open(ImageBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 1 }
    })
  }

  getdocbackPath(id: any) {
    this.dialog.open(ImageBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id, value1: 2 }
    })
  }

  DocComments(id: any) {
    this.dialog.open(CommentBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id }
    })
  }

  docedit(id: any) {
    this.dialog.open(EditBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id }
    })
  }

  docApproval(id: any) {
    this.dialog.open(ApprovalBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id }
    })
  }

  adddoc(id: any) {
    this.dialog.open(AddBussinessdocumentComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id }
    })
  }


  smscreate() {
    this.dialog.open(SmsCreateComponent, {
      disableClose: true,
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: { value: this.id }
    });
  }

  editsms(id: any) {
    this.dialog.open(EditSmsComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
  }

  smsStatus(event: any, id: any) {
    this.merchantsmsId = id;
    this.isChecked = event.checked;
    let submitModel: SmsStatus = {
      smsStatus: this.isChecked ? 1 : 0,
      modifedBy: this.getadminname
    };
    this.MerchantView.smsStatus(this.merchantsmsId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  SmsApproval(id: any) {
    this.dialog.open(SmsApprovalComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }
    })
  }
  ViewMerchantSms(id: any) {
    this.merchantsmsId = id;
    this.dialog.open(SmsHistoryEntityComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
        value1: this.merchantsmsId
      }
    })
  }

}
