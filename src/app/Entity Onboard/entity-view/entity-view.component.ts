import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  AgreementLinkExpiry,
  BankPrimaryStatus,
  Bankverficiation,
  Branchstatus,
  Drivingverification,
  EmailTrigger,
  Pasportverify,
  PgOnboard,
  settopStatus,
  SmsStatus,
  verification,
  verify,
} from '../../fargin-model/fargin-model.module';
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
import { KycInfoComponent } from '../kyc-info/kyc-info.component';
import { UpdateManualpaymentComponent } from '../update-manualpayment/update-manualpayment.component';
import { MerchantLogoComponent } from '../merchant-logo/merchant-logo.component';
import { CreateManualpaymentComponent } from '../create-manualpayment/create-manualpayment.component';
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
import { AddAgreementsComponent } from '../add-agreements/add-agreements.component';
import { AgreementsLinkExtentComponent } from '../agreements-link-extent/agreements-link-extent.component';
import { BranchEditComponent } from '../Branch/branch-edit/branch-edit.component';
import {
  manuvalduecreation,
  Manuvelduesforcloudfee,
} from '../../Fargin Model/fargin-model/fargin-model.module';
import { SmsDescriptionComponent } from '../sms-description/sms-description.component';
import { OtherpayManualpaymentComponent } from '../../Fargin Transtions/Other Payments/otherpay-manualpayment/otherpay-manualpayment.component';
import { BranchInactivenbranchComponent } from '../Branch/branch-inactivenbranch/branch-inactivenbranch.component';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrl: './entity-view.component.css',
})
export class EntityViewComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();
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
  copy1: number = -1;
  copy2: number = -1;
  RenewelFee: any;;
  CopieedSucess: boolean = false;
  items: any[] = [];
  currentPage: any = 1;
  itemsPerPage = 3;
  selected: any;
  selecteded: string = '5';
  currentPagebusniess: any = 1;
  currentonetime: any = 1;
  currentcustomized: any = 1;
  currentsms: any = 1;
  currentagreement: any = 1;
  currentbranch: any = 1;
  alltransactions: any;
  searchText: any;
  searchTextbusnniess: any;
  searchTextOneTime: any;
  searchTextcustomixed: any;
  searchTextsms: any;
  searchTextargeement: any;
  searchTextbranch: any;
  valuesmssetting: any;
  navbarEventEmitter: any;
  isDropdownOpen = false;
  searchTexts: any;
  copiedIndex: number = -1;
  copiedIndex2: number = -1;
  Daterange!: string;
  data: any;
  term: any;
  Viewall: any;
  content: any;
  getallData: any;
  serviceid: any;
  ToDateRange: any;
  FromDateRange: any;
  showData: boolean = true;
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
  roleId: any = sessionStorage.getItem('roleId');
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
  valuesmsedit: any;
  valueentityautodebit: any;
  entitypermission: any[] = [];
  roles: any;
  paymentStatus: any;
  paymentMethod: any;
  onBoardStatus: any;
  chargepersms: any;
  agreementdetails: any;
  valueagreementcreate: any;
  valueagreementView: any;
  valueagreementAgreement: any;
  valueagreementAgreementSigned: any;
  valueagreementlinkdate: any;
  valueagreementlinkstatus: any;
  valueagreementlink: any;
  valueagreement: any;
  branchget: any;
  valuentityOffline: any;
  valuebranch: any;
  valuebranchcreate: any;
  valuebranchCustomerview: any;
  valuebranchStatus: any;
  valuebranchAction: any;
  paymentutrnumber: any;
  copiedapikey: any;
  copiedsecretkey: any;
  valueentityterminal: any;
  valuebranchterminal: any;
  valuebranchKYCview: any;
  valuebranchonlineview: any;
  valuebranchkyc: any;
  valuebranchTerminal: any;
  valueplandetails: any;
  valuefee: any;
  valuedues: any;
  valueonetime: any;
  valueterminal: any;
  valuesms: any;
  valueCustomizedmanual: any;
  branchtrans: any;
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
    private ActivateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          this.entitypermission = res.response?.permission;
          this.getpermissionValue();
          if (this.roleId == 1) {
            this.valueplatform = 'Entity View Platform Payment';
            this.valuelogo = 'Entity View-LOGO';
            this.valueeditentity = 'Entity View-Edit';
            this.valuesms = 'Monthly SMS Details';
            this.valueviewonboard = 'Entity View-Onboard Information';
            this.valueentityonboard = 'Entity View-Onboard';
            this.valuelevelcomment = 'Entity View-Comment';
            this.valueapproval = 'Entity View-Approval';
            this.valuebankadd = 'Bank-Add';
            this.valuebanksts = 'Bank-Status';
            this.valueprimarysts = 'Bank Primary-Status';
            this.valuebankapproval = 'Bank-Approval';
            this.valuebankcomment = 'Bank-comment';
            this.valuebankedit = 'Bank-Edit';
            this.valuebankverify = 'Bank-Verification';
            this.valuebankapprovalsts = 'Bank-Approval Status';
            this.valuekyccomment = 'Entity View KYC Document-comments';
            this.valuekycimage = 'Entity View KYC Document-Image';
            this.valuekycedit = 'Entity View KYC Document-Edit';
            this.valuekycapproval = 'Entity View KYC Document-Approval';
            this.valuekycverification = 'Entity View KYC Document-Verification';
            this.valuefinalapprovals = 'Final-Approval';
            this.valuemanualpay = 'Entity View One Time Setup Payment-Create';
            this.valuemanualedit = 'Entity View One Time Setup Payment-Edit';
            this.valuemanualview = 'Entity View One Time Setup Payment-View';
            this.valuefinalcomment = 'Final-Comment';
            this.valuebussinessAdd = 'Entity View Bussiness Document-Add';
            this.valuebussinessapproval =
              'Entity View Bussiness Document-Approval';
            this.valuebussinesscomment =
              'Entity View Bussiness Document-Comments';
            this.valuebussinessImage = 'Entity View Bussiness Document-Image';
            this.valuebussinessedit = 'Entity View Bussiness Document-Edit';
            this.valueCustomizedadd = 'Entity View Customized Payment-Add';
            this.valueCustomizededit = 'Entity View Customized Payment-Edit';
            this.valueCustomizedview = 'Entity View Customized Payment-View';
            this.valueCustomizedmanual =
              'Entity View Customized Manual Payment';
            this.valuesmsadd = 'Sms Setting-Add';
            this.valuesmsapproval = 'Sms Setting-Approval';
            this.valuesmsedit = 'Sms Setting-Edit';
            this.valuesmsview = 'Sms Setting-View';
            this.valuesmsstatus = 'Sms Setting-Status';
            this.valuekycadd = 'Entity View KYC Document-add';
            this.valueagreementcreate = 'Entity View Agreement-Add';
            this.valueagreementView = 'Entity View Agreement-Plan Overview';
            this.valueagreementAgreement = 'Entity View Agreement-Agreement';
            this.valueagreementAgreementSigned =
              'Entity View Agreement-Agreement Signed Copy';
            this.valueagreementlinkdate =
              'Entity View Agreement-Link Expiry Date';
            this.valueagreementlinkstatus =
              'Entity View Agreement-Link Expiry Status';
            this.valueagreementlink =
              'Entity View Agreement-Entity Agreement Link';
            this.valuebranchcreate = 'Entity View Branch-Add';
            this.valuebranchCustomerview = 'Entity View Branch-Customer View';
            this.valuebranchStatus = 'Entity View Branch-Status';
            this.valuebranchAction = 'Entity View Branch-Action';
            this.valueentityterminal = 'Entity View Entity-Terminal';
            this.valuebranchterminal = 'Entity View Branch-Terminal';
            this.valuebranchKYCview = 'Entity View Branch-KYC View';
            this.valuebranchonlineview = 'Entity View Branch-Due Transactions View';
            this.valuebranchkyc = 'Entity View Branch-KYC';
            this.valuebranchTerminal = 'Entity View Branch-Terminal';
            this.valuebranch = 'Entity View Branch';
            this.branchtrans = 'Entity View-Branch-Transactions';
            this.valueplandetails = 'Entity Plan Details';
            this.valuefee = 'Generate Cloud Fee';
            this.valuedues = 'Generate Customer Dues';
            this.valueterminal = 'Entity Terminal View';
            this.valueentityautodebit = 'Entity View Cloud Fee AutoDebit';
            this.RenewelFee = 'Entity View Renewal Fee AutoDebit';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View KYC Document-add') {
                this.valuekycadd = 'Entity View KYC Document-add';
              }
              if (this.actions == 'Sms Setting-Edit') {
                this.valuesmsedit = 'Sms Setting-Edit';
              }
              if (this.actions == 'Sms Setting-Add') {
                this.valuesmsadd = 'Sms Setting-Add';
              }
              if (this.actions == 'Sms Setting-Approval') {
                this.valuesmsapproval = 'Sms Setting-Approval';
              }
              if (this.actions == 'Sms Setting-View') {
                this.valuesmsview = 'Sms Setting-View';
              }
              if (this.actions == 'Sms Setting-Status') {
                this.valuesmsstatus = 'Sms Setting-Status';
              }
              if (this.actions == 'Entity View Platform Payment') {
                this.valueplatform = 'Entity View Platform Payment';
              }
              if (this.actions == 'Entity View-LOGO') {
                this.valuelogo = 'Entity View-LOGO';
              }
              if (this.actions == 'Entity View-Edit') {
                this.valueeditentity = 'Entity View-Edit';
              }
              if (this.actions == 'Entity View-Onboard Information') {
                this.valueviewonboard = 'Entity View-Onboard Information';
              }
              if (this.actions == 'Entity View-Onboard') {
                this.valueentityonboard = 'Entity View-Onboard';
              }
              if (this.actions == 'Entity View-Comment') {
                this.valuelevelcomment = 'Entity View-Comment';
              }
              if (this.actions == 'Entity View-Approval') {
                this.valueapproval = 'Entity View-Approval';
              }
              if (this.actions == 'Bank-Add') {
                this.valuebankadd = 'Bank-Add';
              }
              if (this.actions == 'Bank-Status') {
                this.valuebanksts = 'Bank-Status';
              }

              if (this.actions == 'Bank Primary-Status') {
                this.valueprimarysts = 'Bank Primary-Status';
              }
              if (this.actions == 'Bank-Approval') {
                this.valuebankapproval = 'Bank-Approval';
              }
              if (this.actions == 'Bank-comment') {
                this.valuebankcomment = 'Bank-comment';
              }
              if (this.actions == 'Bank-Edit') {
                this.valuebankedit = 'Bank-Edit';
              }
              if (this.actions == 'Bank-Verification') {
                this.valuebankverify = 'Bank-Verification';
              }
              if (this.actions == 'Bank-Approval Status') {
                this.valuebankapprovalsts = 'Bank-Approval Status';
              }

              if (this.actions == 'Entity View KYC Document-comments') {
                this.valuekyccomment = 'Entity View KYC Document-comments';
              }
              if (this.actions == 'Entity View KYC Document-Image') {
                this.valuekycimage = 'Entity View KYC Document-Image';
              }
              if (this.actions == 'Entity View KYC Document-Edit') {
                this.valuekycedit = 'Entity View KYC Document-Edit';
              }
              if (this.actions == 'Entity View KYC Document-Approval') {
                this.valuekycapproval = 'Entity View KYC Document-Approval';
              }
              if (this.actions == 'Entity View KYC Document-Verification') {
                this.valuekycverification =
                  'Entity View KYC Document-Verification';
              }
              if (this.actions == 'Final-Approval') {
                this.valuefinalapprovals = 'Final-Approval';
              }
              if (this.actions == 'Entity View One Time Setup Payment-Create') {
                this.valuemanualpay =
                  'Entity View One Time Setup Payment-Create';
              }
              if (this.actions == 'Entity View One Time Setup Payment-Edit') {
                this.valuemanualedit =
                  'Entity View One Time Setup Payment-Edit';
              }
              if (this.actions == 'Entity View One Time Setup Payment-View') {
                this.valuemanualview =
                  'Entity View One Time Setup Payment-View';
              }
              if (this.actions == 'Final-Comment') {
                this.valuefinalcomment = 'Final-Comment';
              }
              if (this.actions == 'Entity View Bussiness Document') {
                this.valuebussinessdocument = 'Entity View Bussiness Document';
              }
              if (this.actions == 'Entity View Bussiness Document-Add') {
                this.valuebussinessAdd = 'Entity View Bussiness Document-Add';
              }
              if (this.actions == 'Entity View Bussiness Document-Edit') {
                this.valuebussinessedit = 'Entity View Bussiness Document-Edit';
              }
              if (this.actions == 'Entity View Bussiness Document-Image') {
                this.valuebussinessImage =
                  'Entity View Bussiness Document-Image';
              }
              if (this.actions == 'Entity View Bussiness Document-Comments') {
                this.valuebussinesscomment =
                  'Entity View Bussiness Document-Comments';
              }

              if (this.actions == 'Entity View Bussiness Document-Approval') {
                this.valuebussinessapproval =
                  'Entity View Bussiness Document-Approval';
              }

              if (this.actions == 'Entity View Customized Payment-Add') {
                this.valueCustomizedadd = 'Entity View Customized Payment-Add';
              }
              if (this.actions == 'Entity View Customized Payment-Edit') {
                this.valueCustomizededit =
                  'Entity View Customized Payment-Edit';
              }
              if (this.actions == 'Entity View Customized Payment-View') {
                this.valueCustomizedview =
                  'Entity View Customized Payment-View';
              }
              if (this.actions == 'Entity View Customized Manual Payment') {
                this.valueCustomizedmanual =
                  'Entity View Customized Manual Payment';
              }
              if (
                this.actions == 'Entity View Agreement-Entity Agreement Link'
              ) {
                this.valueagreementlink =
                  'Entity View Agreement-Entity Agreement Link';
              }
              if (this.actions == 'Entity View Agreement-Link Expiry Status') {
                this.valueagreementlinkstatus =
                  'Entity View Agreement-Link Expiry Status';
              }
              if (this.actions == 'Entity View Agreement-Link Expiry Date') {
                this.valueagreementlinkdate =
                  'Entity View Agreement-Link Expiry Date';
              }
              if (this.actions == 'Entity View Agreement-Add') {
                this.valueagreementcreate = 'Entity View Agreement-Add';
              }
              if (this.actions == 'Entity View Agreement-Plan Overview') {
                this.valueagreementView = 'Entity View Agreement-Plan Overview';
              }
              if (this.actions == 'Entity View Agreement-Agreement') {
                this.valueagreementAgreement =
                  'Entity View Agreement-Agreement';
              }
              if (
                this.actions == 'Entity View Agreement-Agreement Signed Copy'
              ) {
                this.valueagreementAgreementSigned =
                  'Entity View Agreement-Agreement Signed Copy';
              }
              if (this.actions == 'Entity View Branch-Add') {
                this.valuebranchcreate = 'Entity View Branch-Add';
              }

              if (this.actions == 'Entity View Branch') {
                this.valuebranch = 'Entity View Branch';
              }
              if (this.actions == 'Entity View Branch-Customer View') {
                this.valuebranchCustomerview =
                  'Entity View Branch-Customer View';
              }
              if (this.actions == 'Entity View Branch-Status') {
                this.valuebranchStatus = 'Entity View Branch-Status';
              }
              if (this.actions == 'Entity View Branch-Action') {
                this.valuebranchAction = 'Entity View Branch-Action';
              }
              if (this.actions == 'Entity View Entity-Terminal') {
                this.valueentityterminal = 'Entity View Entity-Terminal';
              }
              if (this.actions == 'Entity View Branch-Terminal') {
                this.valuebranchterminal = 'Entity View Branch-Terminal';
              }
              if (this.actions == 'Entity View Branch-KYC View') {
                this.valuebranchKYCview = 'Entity View Branch-KYC View';
              }

              if (this.actions == 'Entity View Branch-Due Transactions View') {
                this.valuebranchonlineview = 'Entity View Branch-Due Transactions View';
              }

              if (this.actions == 'Entity View Branch-KYC') {
                this.valuebranchkyc = 'Entity View Branch-KYC';
              }

              if (this.actions == 'Entity View Branch-Terminal') {
                this.valuebranchTerminal = 'Entity View Branch-Terminal';
              }
              if (this.actions == 'Entity Plan Details') {
                this.valueplandetails = 'Entity Plan Details';
              }
              if (this.actions == 'Generate Cloud Fee') {
                this.valuefee = 'Generate Cloud Fee';
              }
              if (this.actions == 'Generate Customer Dues') {
                this.valuedues = 'Generate Customer Dues';
              }
              if (this.actions == 'Entity Terminal View') {
                this.valueterminal = 'Entity Terminal View';
              }
              if (this.actions == 'Entity View Cloud Fee AutoDebit') {
                this.valueentityautodebit = 'Entity View Cloud Fee AutoDebit';
              }
              if (this.actions == 'Entity View Renewal Fee AutoDebit') {
                this.RenewelFee = 'Entity View Renewal Fee AutoDebit';
              }

              if (this.actions == 'Monthly SMS Details') {
                this.valuesms = 'Monthly SMS Details';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.agrrmentview();
    this.Getall();

    this.MerchantView.GetManualPay(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.manualDetails = res.response;
        this.manualDetails.forEach((item: any) => {
          this.paymentStatus = item.paymentStatus;
          this.paymentMethod = item.paymentMethod;
        });
        this.manualDetails.reverse();
      }
    });

    this.MerchantView.OtherPayByMerchantId(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.otherDetails = res.response;
        this.otherDetails.reverse();
      }
    });

    this.MerchantView.BranchGet(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchget = res.response.reverse();
      }
    });

    this.MerchantView.SMSViewById(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsDetails = res.response;
      }
    });
    this.MerchantView.smscostViewall().subscribe((res: any) => {
      this.chargepersms = res.response[0]?.amount;
    });

  }

  getpermissionValue() {
    if (this.roleId == 1) {
      this.valueentitytransaction = 'Entity View Due Transactions';
      this.valueentityautodebit = 'Entity View Cloud Fee AutoDebit';
      this.valuentitysettlement = 'Entity View Settlement';
      this.valueentityRefund = 'Entity View Refund';
      this.valueEntityqrs = 'Entity View QR';
      this.valueentityCustomers = 'Entity View Customer';
      this.valueentitypaylink = 'Entity View Payment Link';
      this.valueGeneral = 'Entity View General Information';
      this.valuebankinfo = 'Entity View Bank Information';
      this.valuekycdocument = 'Entity View KYC Document';
      this.valuefinalapproval = 'Entity View Final Approval';
      this.valuebussinessdocument = 'Entity View Bussiness Document';
      this.valuemanualpayment = 'Entity View One Time Setup Payment';
      this.valueCustomized = 'Entity View Customized Payment';
      this.valuesmssetting = 'Entity View-SMS Settings';
      this.valueagreement = 'Entity View Agreement';
      this.valuentityOffline = 'Entity View Offline';
      this.valuebranch = 'Entity View Branch';
      this.valuebranchkyc = 'Entity View Branch-KYC';
      this.valuebranchTerminal = 'Entity View Branch-Terminal';
      this.valuesms = 'Monthly SMS Details';
      // this.valueplandetails = 'Entity Plan Details';
      // this.valuedues = 'Generate Customer Dues';
      this.valueonetime = 'Entity View One Time Setup Payment';
    }
    else {
      for (let data of this.entitypermission) {
        this.roles = data.permission;

        if (this.roles == 'Entity View Due Transactions') {
          this.valueentitytransaction = 'Entity View Due Transactions';
        }
        if (this.roles == 'Entity View Settlement') {
          this.valuentitysettlement = 'Entity View Settlement';
        }
        if (this.roles == 'Entity View Refund') {
          this.valueentityRefund = 'Entity View Refund';
        }
        if (this.roles == 'Entity View One Time Setup Payment-Create') {
          this.valuemanualpay = 'Entity View One Time Setup Payment-Create';
        }
        if (this.roles == 'Entity View QR') {
          this.valueEntityqrs = 'Entity View QR';
        }
        if (this.roles == 'Entity View Customer') {
          this.valueentityCustomers = 'Entity View Customer';
        }
        if (this.roles == 'Entity View Payment Link') {
          this.valueentitypaylink = 'Entity View Payment Link';
        }
        if (this.roles == 'Entity View Cloud Fee AutoDebit') {
          this.valueentityautodebit = 'Entity View Cloud Fee AutoDebit';
        }
        if (this.roles == 'Entity View Bussiness Document') {
          this.valuebussinessdocument = 'Entity View Bussiness Document';
        }
        if (this.roles == 'Entity View One Time Setup Payment') {
          this.valuemanualpayment = 'Entity View One Time Setup Payment';
        }
        if (this.roles == 'Entity View General Information') {
          this.valueGeneral = 'Entity View General Information';
        }
        if (this.roles == 'Entity View Bank Information') {
          this.valuebankinfo = 'Entity View Bank Information';
        }
        if (this.roles == 'Entity View KYC Document') {
          this.valuekycdocument = 'Entity View KYC Document';
        }
        if (this.roles == 'Entity View Final Approval') {
          this.valuefinalapproval = 'Entity View Final Approval';
        }
        if (this.roles == 'Entity View Customized Payment') {
          this.valueCustomized = 'Entity View Customized Payment';
        }
        if (this.roles == 'Entity View-SMS Settings') {
          this.valuesmssetting = 'Entity View-SMS Settings';
        }
        if (this.roles == 'Entity View Agreement') {
          this.valueagreement = 'Entity View Agreement';
        }
        if (this.roles == 'Entity View Offline') {
          this.valuentityOffline = 'Entity View Offline';
        }
        if (this.roles == 'Entity View Branch') {
          this.valuebranch = 'Entity View Branch';
        }
        if (this.roles == 'Entity View Branch-KYC') {
          this.valuebranchkyc = 'Entity View Branch-KYC';
        }

        if (this.roles == 'Entity View Branch-Terminal') {
          this.valuebranchTerminal = 'Entity View Branch-Terminal';
        }

        if (this.roles == 'Entity View-Branch-Transactions') {
          this.branchtrans = 'Entity View-Branch-Transactions';
        }
        // if (this.roles == 'Entity Plan Details') {
        //   this.valueplandetails = 'Entity Plan Details'
        // }
        // if (this.roles == 'Generate Customer Dues') {
        //   this.valuedues = 'Generate Customer Dues'
        // }
        if (this.roles == 'Entity View One Time Setup Payment') {
          this.valueonetime = 'Entity View One Time Setup Payment';
        }
        if (this.roles == 'Monthly SMS Details') {
          this.valuesms = 'Monthly SMS Details';
        }
      }
    }
  };

  Getall() {
    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.onBoardStatus = res.response.merchantpersonal?.onBoardStatus;
      this.bankdetails = res.response.merchantbank.reverse();
      this.KYCDetails = res.response.merchantkycdocument;
      this.bussinessdoc = res.response.merchantbusinessdocument.reverse();
      this.identityProof = res.response.merchantkycdocument[0].identityProof;
      this.addressProof = res.response.merchantkycdocument[0].addressProof;
      this.signatureProof = res.response.merchantkycdocument[0].signatureProof;
      this.businessCategoryId =
        res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
    });
  }


  view(id: any) {
    this.router.navigate([`/allagreementplan/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  viewpaymentLink(id: any) {
    this.router.navigate([`dashboard/paymentlink-view/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/entitycustomerviewAll/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  EntityTerminal(id: any) {
    this.router.navigate([`dashboard/EntityTerminal/${id}`], {
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
  Viewrenewalautodebit(id: any) {
    this.router.navigate([`dashboard/entity-renewalautodebit/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  viewbranch(id: any) {
    this.router.navigate([`dashboard/branch-wiseenitytransaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  viewsettlement(id: any) {
    this.router.navigate([`dashboard/entity-settlement/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  editpersonalInfo(id: any) {
    this.router.navigate([`dashboard/edit-personal/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  entityTransaction(id: any) {
    this.router.navigate([`dashboard/entity-transaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Entityplan() {
    this.router.navigate([`dashboard/entity-plan-history/${this.id}`], {
      queryParams: { Alldata: this.id },
    });
  }

  Viewcustomerbranch(id: any) {
    this.router.navigate([`dashboard/branch-customer-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  Viewonlinecustomerbranch(id: any) {
    this.router.navigate([`dashboard/branch-onlinetransactions/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Viewoffline(id: any, dta: any) {
    this.router.navigate([`dashboard/offline-transactions/${id}`], {
      queryParams: {
        Alldata: id,
        Alldata1: dta,
      },
    });
  }



  close() {
    this.router.navigate([`dashboard/entity-viewall`], {
    });
  };




  pgOnboard() {
    let submitmodel: PgOnboard = {
      merchantId: this.id,
    };

    this.MerchantView.PgOnboard(submitmodel).subscribe((res: any) => {
      if (res.response.flag == 1) {
        this.toastr.success(res.response.message);
        this.dialog.closeAll();
        setTimeout(() => {
          this.Getall();
        }, 500);
      } else {
        this.toastr.error(res.response.message);
      }
    });
  }

  viewOnboardInfo(id: any) {
    const dialogRef = this.dialog.open(ViewOnboardinfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  emailtrigger() {
    let submitModel: EmailTrigger = {
      merchantId: this.id,
      linkExpiry: '2024-09-20',
      description: 'Testt',
      returnUrl: 'https://ess.pockethrms.com/Home/Dashboard?Menu=DashBoard',
    };
    this.MerchantView.EmailTrigger(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  levelOneApproval(id: any) {
    const dialogRef = this.dialog.open(LevelOneApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      maxHeight: '500px',
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  levelTwoApproval(id: any) {
    const dialogRef = this.dialog.open(LevelTwoApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      maxHeight: '500px',
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  leveloneComments(comment: any) {
    const dialogRef = this.dialog.open(CommentsforApprovaloneComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: comment,
      },
    });
  }

  levelTwoComments(commentL2: any) {
    this.dialog.open(CommentsforApprovaltwoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: commentL2,
      },
    });
  }

  viewlogo(id: any, Link: any) {
    const dialogRef = this.dialog.open(MerchantLogoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
        value1: Link,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  copyText(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccess = true;
    setTimeout(() => (this.copySuccess = false), 2000);
  }

  copyApikey(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedapikey = index;
    setTimeout(() => (this.copiedapikey = -1), 2000);
  }

  copySecretkey(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedsecretkey = index;
    setTimeout(() => (this.copiedsecretkey = -1), 2000);
  }

  copyText1(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex = index;
    setTimeout(() => (this.copiedIndex = -1), 2000);
  }

  copyText2(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex2 = index;
    setTimeout(() => (this.copiedIndex2 = -1), 2000);
  }


  Manuvelduesforcloudfee() {
    let submitModel: Manuvelduesforcloudfee = {
      merchantId: this.id,
    };

    this.MerchantView.MaintenancedueManuvelgenerate(submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
        } else {
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }

  Manuvalduesforcustomer() {
    let submitModel: manuvalduecreation = {
      merchantId: this.id,
    };
    this.MerchantView.CustomerManuvalDusegenrate(submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
        } else {
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }

  CustomerQRcreation() {
    this.MerchantView.CustomerQRCreation(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      }
      else {
        this.toastr.error(res.responseMessage);

      }
    })
  }

  createmanualPayement() {
    const dialogRef = this.dialog.open(CreateManualpaymentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: this.id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchgetmanualpay();
    });
  }

  Manuvalpayments(id: any) {
    const dialogRef = this.dialog.open(OtherpayManualpaymentComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchcustomizedpay();
    });
  }

  fetchgetmanualpay() {
    this.MerchantView.GetManualPay(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.manualDetails = res.response;

        this.manualDetails.forEach((item: any) => {
          this.paymentStatus = item.paymentStatus;
          this.paymentMethod = item.paymentMethod;
        });
        this.manualDetails.reverse();
      }
    });
  }

  viewmanualtransaction(id: any) {
    this.router.navigate([`dashboard/manual-transaction/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  manualPayement(id: any) {
    const dialogRef = this.dialog.open(UpdateManualpaymentComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchgetmanualpay();
    });
  }

  otherPayement() {
    const dialogRef = this.dialog.open(CreateOtherpaymentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: this.id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchcustomizedpay();
    });
  }

  fetchcustomizedpay() {
    this.MerchantView.OtherPayByMerchantId(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.otherDetails = res.response.reverse();
      }
    });
  }

  viewOthertransaction(id: any) {
    this.payid = id;
    this.router.navigate([`dashboard/otherpay-trans/${this.payid}`], {
      queryParams: { Alldata: this.payid },
    });
  }

  editotherPayment(data: any) {
    const dialogRef = this.dialog.open(EditOtherpaymentComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: data },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchcustomizedpay();
    });
  }

  agreementcreate() {
    const dialogRef = this.dialog.open(AddAgreementsComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: this.id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchviewidplans();
    });
  }

  fetchviewidplans() {
    this.MerchantView.viewbyidplans(this.id).subscribe((res: any) => {
      this.agreementdetails = res.response.reverse();
    });
  }

  // agremmentlink() {
  //   this.dialog.open(AgreementlinkComponent, {
  //     disableClose: true,
  //     enterAnimationDuration: '500ms',
  //     exitAnimationDuration: '1000ms',
  //     data: { value: this.id },
  //   });
  // }

  agrrmentview() {
    this.MerchantView.viewbyidplans(this.id).subscribe((res: any) => {
      this.agreementdetails = res?.response?.reverse();
    });
  }

  viewagreementdoc(id: any) {
    this.MerchantView.viewagreementdoucments(id, 1).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      };
    });
  }

  viewsignedagreementdoc(id: any) {
    this.MerchantView.viewagreementdoucments(id, 2).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      };
    });
  }

  ExtendLinkDate(id: any, id1: any) {
    const dialogRef = this.dialog.open(AgreementsLinkExtentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      data: { value: id, value2: id1 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.agrrmentview();
    });
  }

  LinkExpirystatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: AgreementLinkExpiry = {
      expiryLinkStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.agreementlinkexpiry(id, submitModel).subscribe(
      (res: any) => {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.MerchantView.viewbyidplans(this.id).subscribe((res: any) => {
            this.agreementdetails = res.response.reverse();
          });
        }, 500);
      }
    );
  };


  Entitybanksearch(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.MerchantView.EntityBanksearch(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.bankdetails = res.response; // Set bankdetails to the API response
          this.showData = true; // Set showData to true after data is available
        } else if (res.flag === 2) {
          this.bankdetails = []; // Clear bankdetails if no data found
          this.showData = true;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      },
    });
  }

  addbank(id: any) {
    const dialogRef = this.dialog.open(EntityBankaddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  editbank(id: any) {
    const dialogRef = this.dialog.open(EntityBankeditComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  bankStatus(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: settopStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankActiveStatus(id, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall()
          }, 500);
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: BankPrimaryStatus = {
      primaryAccountStatus: this.isChecked ? 1 : 0,
    };
    this.MerchantView.BankprimaryStatus(id, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        }
      }
    );
  };

  BankApproval(id: any) {
    const dialogRef = this.dialog.open(ApprovalForBankComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id },
    });

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  BankComments(id: any) {
    this.dialog.open(CommentsForApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  }

  bankVerification(id: any) {
    let submitModel: Bankverficiation = {
      merchantBankId: id,
    };
    this.MerchantView.BankVerification(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall();
        }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  bankInfo(id: any) {
    this.dialog.open(BankInfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
  }

  BankVerificationMatch(id: any) {
    this.dialog.open(BankVerificationMatchComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
  }


  addKycdocuments(id: any) {
    const dialogRef = this.dialog.open(AddKycdocumentComponent, {
      width: '50vw',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  editKycDocuments(id: any, data: any) {
    this.dialog.open(EditKycdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: {
        value: id,
        value1: this.businessCategoryId,
        value2: data,
      },
    });
  }

  KycApproval(id: any) {
    const dialogRef = this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id, value1: 1 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  KycApproval1(id: any) {
    const dialogRef = this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id, value1: 2 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  KycApproval2(id: any) {
    const dialogRef = this.dialog.open(KycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id, value1: 3 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  KYCComments(id: any) {
    this.dialog.open(KycCommentsComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  }

  getFrontPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      // disableClose: true,
      data: { value: id, value1: 1 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  getBackPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 2 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  addressProofFrontPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id, value1: 3 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  addressProofBackPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 4 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  signatureProofFrontPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 5 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  signatureProofBackPath(id: any) {
    const dialogRef = this.dialog.open(KycdocumentViewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 6 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  identityedit(id: any) {
    const dialogRef = this.dialog.open(EntityKyceditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: 1,
        value1: id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  addressedits(id: any) {
    const dialogRef = this.dialog.open(EntityKyceditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: 2, value1: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  signatureedits(id: any) {
    const dialogRef = this.dialog.open(EntityKyceditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: 3, value1: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  //fa check verification

  KycInfo(id: any, id1: any) {
    this.dialog.open(KycInfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
        value1: id1,
      },
    });
  }

  kycVerificationsIdentity(id: any, id1: any, id2: any, id3: any, id4: any) {
    if (id2 == 'Pancard') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.MerchantView.panVerifysIdentity(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }
    if (id2 == 'Aadhar Card') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.adharVerifyIdentity(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'GST') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.gstVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      });
    }

    if (id2 == 'Driving License') {
      let submitModel: Drivingverification = {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
      };
      this.MerchantView.drivingverfiyidentity(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Passport') {
      let submitModel: Pasportverify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.MerchantView.passportVerifyIdentity(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Voter Id Proof') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.voterverifyIdentity(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Cin') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.MerchantView.cinVerifyIdentity(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      });
    }
  }

  kycVerificationsAddress(id: any, id1: any, id2: any, id3: any, id4: any) {
    if (id2 == 'Pancard') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.MerchantView.panverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      });
    }
    if (id2 == 'Aadhar Card') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.adharverifyAddress(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'GST') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.gstverifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      });
    }

    if (id2 == 'Driving License') {
      let submitModel: Drivingverification = {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
      };
      this.MerchantView.drivingverifyaddress(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Passport') {
      let submitModel: Pasportverify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.MerchantView.passportVerifyAddress(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Voter Id Proof') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.voterverifyAddress(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Cin') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.MerchantView.cinVerifyAddress(submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.Getall();
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
        }
      });
    }
  }

  kycVerificationsSignature(id: any, id1: any, id2: any, id3: any, id4: any) {
    if (id2 == 'Pancard') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.MerchantView.panverifysignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }
    if (id2 == 'Aadhar Card') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.adharverifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'GST') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.gstverifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Driving License') {
      let submitModel: Drivingverification = {
        kycId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
      };
      this.MerchantView.drivingverifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Passport') {
      let submitModel: Pasportverify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.MerchantView.passportVerifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Voter Id Proof') {
      let submitModel: verification = {
        kycId: id1,
        facheckDocNumber: id,
      };
      this.MerchantView.voterverifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }

    if (id2 == 'Cin') {
      let submitModel: verify = {
        kycId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.MerchantView.cinverifySignature(submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.Getall();
            }, 500);
          } else {
            this.toastr.error(res.responseMessage);
          }
        }
      );
    }
  }

  adddoc(id: any, id2: any) {
    const dialogRef = this.dialog.open(AddBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value2: id2 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  docedit(id: any) {
    const dialogRef = this.dialog.open(EditBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  docApproval(id: any) {
    const dialogRef = this.dialog.open(ApprovalBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  DocComments(id: any) {
    this.dialog.open(CommentBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id },
    });
  }

  getdocFrontPath(id: any) {
    const dialogRef = this.dialog.open(ImageBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      // disableClose: true,
      data: { value: id, value1: 1 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  getdocbackPath(id: any) {
    const dialogRef = this.dialog.open(ImageBussinessdocumentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 2 },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }


  smscreate() {
    const dialogRef = this.dialog.open(SmsCreateComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: this.id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchSMSViewById();
    });
  }

  fetchSMSViewById() {
    this.MerchantView.SMSViewById(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsDetails = res.response;
      }
    });
  }

  editsms(id: any) {
    const dialogRef = this.dialog.open(EditSmsComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchSMSViewById();
    });
  }

  smsStatus(event: any, id: any) {
    this.merchantsmsId = id;
    this.isChecked = event.checked;
    let submitModel: SmsStatus = {
      smsStatus: this.isChecked ? 1 : 0,
      modifedBy: this.getadminname,
    };
    this.MerchantView.smsStatus(this.merchantsmsId, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          setTimeout(() => {
            this.MerchantView.SMSViewById(this.id).subscribe((res: any) => {
              if (res.flag == 1) {
                this.smsDetails = res.response;
              }
            });
          }, 500);
        } else {
          this.toastr.error(res.responseMessage);
          setTimeout(() => {
            this.MerchantView.SMSViewById(this.id).subscribe((res: any) => {
              if (res.flag == 1) {
                this.smsDetails = res.response;
              }
            });
          }, 500);
        }
      }
    );
  }

  SmsApproval(id: any) {
    const dialogRef = this.dialog.open(SmsApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      maxHeight: '500px',
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchSMSViewById();
    });
  }

  ViewMerchantSms(id: any) {
    this.merchantsmsId = id;
    this.dialog.open(SmsHistoryEntityComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: this.id,
        value1: this.merchantsmsId,
      },
    });
  }

  Smsdescription(id: any) {
    this.dialog.open(SmsDescriptionComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
    });
  }

  monthlysmsdetails() {
    this.router.navigate([`dashboard/merchat-smstrigger/${this.id}`], {
      queryParams: { Alldata: this.id }
    })
  }




  branchcreate(id: any) {
    this.router.navigate([`dashboard/branch-add/${id}`], {
      queryParams: { Alldata: id },
    });
  }


  branchedit(id: any) {
    const dialogRef = this.dialog.open(BranchEditComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchBranch();
    });
  }

  fetchBranch() {
    this.MerchantView.BranchGet(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchget = res.response.reverse();
      }
    });
  }

  Viewkycbranch(id: any, id1: any) {
    this.router.navigate([`dashboard/branch-kyc/${id}/${id1}`], {
      queryParams: { Alldata: id, All: id1 },
    });
  }

  ViewTerminal(id: any, id1: any) {
    this.router.navigate([`dashboard/Terminalview/${id}/${id1}`], {
      queryParams: { Alldata: id, All: id1 },
    });
  }

  status(event: MatSlideToggleChange, branchid: any) {
    this.isChecked = event.checked;
    console.log(this.isChecked);
    if (this.isChecked == false) {
      this.dialog.open(BranchInactivenbranchComponent, {
        disableClose: true,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        width: '600px',

        height: 'auto',
        data: { value: branchid, value1: this.id },
      });
      this.dialog.afterAllClosed.subscribe(() => {
        this.MerchantView.BranchGet(this.id).subscribe((res: any) => {
          if (res.flag == 1) {
            this.branchget = res.response.reverse();
          }
        });
      });
    } else {
      let submitModel: Branchstatus = {
        accountStatus: this.isChecked ? 1 : 0,
      };

      this.MerchantView.BranchStatus(branchid, submitModel).subscribe(
        (res: any) => {
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            setTimeout(() => {
              this.MerchantView.BranchGet(this.id).subscribe((res: any) => {
                if (res.flag == 1) {
                  this.branchget = res.response.reverse();
                }
              });
            }, 500);
          }
        }
      );
    }
  }

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter((item) =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }


  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }
  onSearchTextBusiness(): void {
    // Reset to the first page whenever the search text changes
    this.currentPagebusniess = 1;
  }
  onSearchTextonetime(): void {
    // Reset to the first page whenever the search text changes
    this.currentonetime = 1;
  }
  onSearchTextcustomized(): void {
    // Reset to the first page whenever the search text changes
    this.currentcustomized = 1;
  }
  onSearchTextsms(): void {
    // Reset to the first page whenever the search text changes
    this.currentsms = 1;
  }
  onSearchTextagreement(): void {
    // Reset to the first page whenever the search text changes
    this.currentagreement = 1;
  }
  onSearchTextbranch(): void {
    // Reset to the first page whenever the search text changes
    this.currentbranch = 1;
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


  copyTextbranch(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copy1 = index;
    setTimeout(() => (this.copy1 = -1), 2000);
  }
  copyText1Branch(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copy2 = index;
    setTimeout(() => (this.copy2 = -1), 2000);
  }
}
