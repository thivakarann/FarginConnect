import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ApprovalBank, bankData, bankedit, BankPrimaryStatus, BankStatus, Bankverficiation, EmailTrigger, Facheckverification, KycApproval, PassPortverification, PgOnboard, verification, verify, VoterIdVerify } from '../../fargin-model/fargin-model.module';
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
      this.KYCDetails = res.response.merchantkycdocument;
      this.identityProof = res.response.merchantkycdocument[0].identityProof;
      this.addressProof = res.response.merchantkycdocument[0].addressProof;
      this.signatureProof = res.response.merchantkycdocument[0].signatureProof;
      

      this.businessCategoryId = res.response.merchantpersonal.businessCategoryModel.businessCategoryId;
      console.log('BussinessCategoryId', this.businessCategoryId);
      console.log(this.detaislone);
      console.log(this.bankdetails);
      console.log(this.KYCDetails);


    })

    this.MerchantView.GetManualPay(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.manualDetails = res.response;
      }
    })

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueentitytransaction = 'Entity View Transaction';
            this.valuentitysettlement = 'Entity View Settlement';
            this.valueentityRefund = 'Entity View Refund';
            this.valueEntityqrs = 'Entity View QR';
            this.valueentityCustomers = 'Entity View Customer';
            this.valueentitypaylink = 'Entity View Payment Link';
            this.valueGeneral = 'Entity View General Information';
            this.valuebankinfo = 'Entity View Bank Information';
            this.valuekycdocument = 'Entity View KYC Document';
            this.valuefinalapproval = 'Entity View Final Approval';
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
            this.valuekycadd = 'KYC-add'
            this.valuekyccomment = 'KYC-Comment'
            this.valuekycfile = 'KYC-Image'
            this.valueekycedit = 'KYC-Edit'
            this.valueapproval = 'KYC-Approval'
            this.valuekycverfication = 'KYC-Verification'
            this.valuefinalapprovals = 'Final-Approval'
            this.valuemanualpay = 'Manual Payment-Create'
            this.valuemanualedit = 'Manual Payment-Edit'
            this.valuemanualview = 'Manual Payment-View'
            this.valuefinalcomment = 'Final-Comment'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Entity View Transaction') {
                this.valueentitytransaction = 'Entity View Transaction';
              }
              if (this.actions == 'Entity View Settlement') {
                this.valuentitysettlement = 'Entity View Settlement'
              }
              if (this.actions == 'Entity View Refund') {
                this.valueentityRefund = 'Entity View Refund'
              }
              if (this.actions == 'Entity View QR') {
                this.valueEntityqrs = 'Entity View QR'
              }
              if (this.actions == 'Entity View Customer') {
                this.valueentityCustomers = 'Entity View Customer'
              }
              if (this.actions == 'Entity View Payment Link') {
                this.valueentitypaylink = 'Entity View Payment Link'
              }
              if (this.actions == 'Entity View General Information') {
                this.valueGeneral = 'Entity View General Information'
              }
              if (this.actions == 'Entity View Bank Information') {
                this.valuebankinfo = 'Entity View Bank Information'
              }
              if (this.actions == 'Entity View KYC Document') {
                this.valuekycdocument = 'Entity View KYC Document'
              }
              if (this.actions == 'Entity View Final Approval') {
                this.valuefinalapproval = 'Entity View Final Approval'
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

              if (this.actions == 'KYC-add') {
                this.valuekycadd = 'KYC-add'
              }
              if (this.actions == 'KYC-Comment') {
                this.valuekyccomment = 'KYC-Comment'
              }
              if (this.actions == 'KYC-Image') {
                this.valuekycfile = 'KYC-Image'
              }
              if (this.actions == 'KYC-Edit') {
                this.valueekycedit = 'KYC-Edit'
              }
              if (this.actions == 'KYC-Approval') {
                this.valueapproval = 'KYC-Approval'
              }
              if (this.actions == 'KYC-Verification') {
                this.valuekycverfication = 'KYC-Verification'
              }
              if (this.actions == 'Final-Approval') {
                this.valuefinalapprovals = 'Final-Approval'
              }
              if (this.actions == 'Manual Payment-Create') {
                this.valuemanualpay = 'Manual Payment-Create'
              }
              if (this.actions == 'Manual Payment-Edit') {
                this.valuemanualedit = 'Manual Payment-Edit'
              }
              if (this.actions == 'Manual Payment-View') {
                this.valuemanualview = 'Manual Payment-View'
              }
              if (this.actions == 'Final-Comment') {
                this.valuefinalcomment = 'Final-Comment'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.MerchantView.OtherPayByMerchantId(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.otherDetails = res.response;
      }
    });
 
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
  // FacheckVerification(Docname: any, data: any, id: any, ApprovedBy: any) {
  //   console.log(data)
  //   console.log(ApprovedBy)
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
    console.log(this.id)
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



  otherPayement(){
    this.dialog.open(CreateOtherpaymentComponent ,{
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: this.id,
      }
    })
  }
 
  viewOthertransaction(id: any){
    this.payid=id;
    this.router.navigate([`dashboard/otherpay-trans/${this.payid}`], {
      queryParams: { Alldata: this.payid },
    });
  }

  editotherPayment(data:any){
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
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: 2, value1: id }
    })
  }
 
  signatureedits(id: any) {
    this.dialog.open(EntityKyceditComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: 3, value1: id }
    })
  }


    //fa check verification
    kycVerificationsIdentity(id: any, id1: any, id2: any) {
      console.log(id2, id, id1);
   
   
      if (id2 == "Pancard") {
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
        }
        console.log(submitModel);
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
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
   
   
    kycVerificationsAddress(id: any, id1: any, id2: any) {
      console.log(id2, id, id1);
   
   
      if (id2 == "Pancard") {
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
        }
        console.log(submitModel);
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
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
   
   
    kycVerificationsSignature(id:any,id1:any,id2:any){
      console.log(id2, id, id1);
   
      if (id2 == "Pancard") {
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
        }
        console.log(submitModel);
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
          approvalBy: this.getadminname
   
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
        console.log(id2);
   
        let submitModel: verification =
        {
          kycId: id1,
          docNumber: id,
   
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
        console.log(id2);
   
        let submitModel: verify =
        {
          kycId: id1,
          docNumber: id,
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
        data: { value: id ,value1:1}
      });
    }
   
    KycApproval1(id: any) {
      this.dialog.open(KycApprovalComponent, {
        enterAnimationDuration: "1000ms",
        exitAnimationDuration: "1000ms",
        disableClose: true,
        data: { value: id ,value1:2}
      });
    }
   
   
    KycApproval2(id: any) {
      this.dialog.open(KycApprovalComponent, {
        enterAnimationDuration: "1000ms",
        exitAnimationDuration: "1000ms",
        disableClose: true,
        data: { value: id ,value1:3}
      });
    }


}
