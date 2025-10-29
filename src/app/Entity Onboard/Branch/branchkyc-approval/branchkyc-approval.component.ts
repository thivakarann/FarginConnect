import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  KycApproval,
  addressbranchapprove,
  identitybranchapprove,
  signaturebranchapprove,
} from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-branchkyc-approval',
  templateUrl: './branchkyc-approval.component.html',
  styleUrl: './branchkyc-approval.component.css',
})
export class BranchkycApprovalComponent {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  myForm!: FormGroup;
  id: any;
  approval: any;
  @Output() dataApproval = new EventEmitter<KycApproval>();
  value: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = this.data.value.branchProofId;
    this.value = this.data.value1;

    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    });
  }

  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }
  get remarks() {
    return this.myForm.get('remarks');
  }

  submit() {
    if (this.value == 1) {
      let submitModel: identitybranchapprove = {
        branchProofId: this.id,
        identityAdminComments: this.remarks?.value.trim(),
        identityAdminApprovalStatus: this.approvalStatus?.value,
        identityAdminApprovedBy: this.adminName,
      };

      this.service.identitybranchApproval(submitModel).subscribe((res: any) => {
        if (res.flag === 1) {
          this.toaster.success(res.responseMessage);
          this.dialog.closeAll();
        } else {
          this.dialog.closeAll();
          this.toaster.error(res.responseMessage);
        }
      });
    }

    if (this.value == 2) {
      let submitModel: addressbranchapprove = {
        branchProofId: this.id,
        addressAdminComments: this.remarks?.value,
        addressAdminApprovalStatus: this.approvalStatus?.value,
        addressAdminApprovedBy: this.adminName,
      };

      this.service.addressbranchApproval(submitModel).subscribe((res: any) => {
        if (res.flag === 1) {
          this.toaster.success(res.responseMessage);
          this.dialog.closeAll();
        } else {
          this.dialog.closeAll();
          this.toaster.error(res.responseMessage);
        }
      });
    }

    if (this.value == 3) {
      let submitModel: signaturebranchapprove = {
        branchProofId: this.id,
        signatureAdminComments: this.remarks?.value,
        signatureAdminApprovalStatus: this.approvalStatus?.value,
        signatureAdminApprovedBy: this.adminName,
      };

      this.service.signbranchApproval(submitModel).subscribe((res: any) => {
        if (res.flag === 1) {
          this.toaster.success(res.responseMessage);
          this.dialog.closeAll();
        } else if (res.flag == 2) {
          this.toaster.error(res.responseMessage);
          this.dialog.closeAll();
        }
      });
    }
  }
}
