import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { KycbranchImageComponent } from '../kycbranch-image/kycbranch-image.component';
import { BranchkycEditComponent } from '../branchkyc-edit/branchkyc-edit.component';
import { BranchkycInfoComponent } from '../branchkyc-info/branchkyc-info.component';
import { BranchkycApprovalComponent } from '../branchkyc-approval/branchkyc-approval.component';
import { BranchkycCommetsComponent } from '../branchkyc-commets/branchkyc-commets.component';
import {
  branchDrivingverification,
  branchPasportverify,
  branchverify,
} from '../../../fargin-model/fargin-model.module';
import { BranchkycExtraComponent } from '../branchkyc-extra/branchkyc-extra.component';

@Component({
  selector: 'app-branch-kyc',
  templateUrl: './branch-kyc.component.html',
  styleUrl: './branch-kyc.component.css',
})
export class BranchKycComponent {
  id: any;
  kycbranchdetails: any;
  merchantId: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  errorMessage: any;
  getdashboard: any[] = [];
  valuebranchkycadd: any;
  valuebranchkycdocimage: any;
  valuebranchkycedit: any;
  valuebranchkycverification: any;
  valuebranchkycApproval: any;
  valuebranchkycComments: any;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuebranchkycadd = 'Entity View BranchKYC-Add';
            this.valuebranchkycdocimage = 'Entity View BranchKYC-DocumentImage';
            this.valuebranchkycedit = 'Entity View BranchKYC-Edit';
            this.valuebranchkycverification =
              'Entity View BranchKYC-Verification';
            this.valuebranchkycApproval = 'Entity View BranchKYC-Approval';
            this.valuebranchkycComments = 'Entity View BranchKYC-Comments';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View BranchKYC-Add') {
                this.valuebranchkycadd = 'Entity View BranchKYC-Add';
              }
              if (this.actions == 'Entity View BranchKYC-DocumentImage') {
                this.valuebranchkycdocimage =
                  'Entity View BranchKYC-DocumentImage';
              }
              if (this.actions == 'Entity View BranchKYC-Edit') {
                this.valuebranchkycedit = 'Entity View BranchKYC-Edit';
              }
              if (this.actions == 'Entity View BranchKYC-Verification') {
                this.valuebranchkycverification =
                  'Entity View BranchKYC-Verification';
              }
              if (this.actions == 'Entity View BranchKYC-Approval') {
                this.valuebranchkycApproval = 'Entity View BranchKYC-Approval';
              }
              if (this.actions == 'Entity View BranchKYC-Comments') {
                this.valuebranchkycComments = 'Entity View BranchKYC-Comments';
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
      this.merchantId = param.All;
    });

    this.Getall();
  }

  Getall() {
    this.service.branchkycview(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.kycbranchdetails = res.response;
      } else {
        this.kycbranchdetails = res.responseMessage;
      }
    });
  }

  getFrontPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 1 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }
  getBackPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 2 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  addressProofFrontPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 3 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  addressProofBackPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 4 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }
  signatureProofFrontPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 5 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  signatureProofBackPath(id: any) {
    this.dialog.open(KycbranchImageComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 6 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  identityedit(id: any) {
    this.dialog.open(BranchkycEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: 1,
        value1: id,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  addressedits(id: any) {
    this.dialog.open(BranchkycEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: 2, value1: id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  signatureedits(id: any) {
    this.dialog.open(BranchkycEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: 3, value1: id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  KycInfo(id: any, id1: any) {
    this.dialog.open(BranchkycInfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
        value1: id1,
      },
    });
  }

  KycApproval(id: any) {
    this.dialog.open(BranchkycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 1 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  addKycdocuments(id: any, id1: any) {
    this.dialog.open(BranchkycExtraComponent, {
      width: '50vw',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
        value2: id1,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  KycApproval1(id: any) {
    this.dialog.open(BranchkycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 2 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  KycApproval2(id: any) {
    this.dialog.open(BranchkycApprovalComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, value1: 3 },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.Getall();
    });
  }

  KYCComments(id: any) {
    this.dialog.open(BranchkycCommetsComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id },
    });
  }

  //fa check verification

  kycVerificationsIdentity(id: any, id1: any, id2: any, id3: any, id4: any) {
    if (id2 == 'Pancard') {
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.service
        .panbranchVerifyIdentity(submitModel)
        .subscribe((res: any) => {
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
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service
        .adharbranchVerifyIdentity(submitModel)
        .subscribe((res: any) => {
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
      let submitModel: branchDrivingverification = {
        branchProofId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
        approvalBy: this.getadminname,
      };
      this.service
        .drivingbranchVerifyIdentity(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Passport') {
      let submitModel: branchPasportverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.service
        .passportbranchVerifyIdentity(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Voter Id Proof') {
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service
        .voterbranchVerifyIdentity(submitModel)
        .subscribe((res: any) => {
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
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.service.panbranchVerifyAddress(submitModel).subscribe((res: any) => {
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
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service
        .adharbranchVerifyAddress(submitModel)
        .subscribe((res: any) => {
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
      let submitModel: branchDrivingverification = {
        branchProofId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
        approvalBy: this.getadminname,
      };
      this.service
        .drivingbranchVerifyAddress(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Passport') {
      let submitModel: branchPasportverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.service
        .passportbranchVerifyAddress(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Voter Id Proof') {
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service
        .voterbranchVerifyAddress(submitModel)
        .subscribe((res: any) => {
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
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };

      this.service.panbranchVerifySigns(submitModel).subscribe((res: any) => {
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
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service.adharbranchVerifySigns(submitModel).subscribe((res: any) => {
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
      let submitModel: branchDrivingverification = {
        branchProofId: id1,
        facheckDocNumber: id,
        dateOfBirth: id3,
        approvalBy: this.getadminname,
      };
      this.service
        .drivingbranchVerifySigns(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Passport') {
      let submitModel: branchPasportverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
        dateOfBirth: id4,
      };
      this.service
        .passportbranchVerifySigns(submitModel)
        .subscribe((res: any) => {
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

    if (id2 == 'Voter Id Proof') {
      let submitModel: branchverify = {
        branchProofId: id1,
        facheckDocNumber: id,
        approvalBy: this.getadminname,
      };
      this.service.voterbranchVerifySigns(submitModel).subscribe((res: any) => {
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
  
  close() {
    this.location.back();
  }
}
