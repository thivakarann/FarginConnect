import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addressapprove, identityapprove, KycApproval, signatureapprove } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc-approval',
  templateUrl: './kyc-approval.component.html',
  styleUrl: './kyc-approval.component.css'
})
export class KycApprovalComponent implements OnInit{

  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
 
  myForm!: FormGroup;
  id: any;
  approval: any;
  @Output() dataApproval = new EventEmitter<KycApproval>();
  value: any;
 
  constructor(private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialog,
  ) {
 
  }
  ngOnInit(): void {
 
    this.id = this.data.value.proofId
    this.value = this.data.value1
 
 
    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    })
  }
 
 
  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }
  get remarks() {
    return this.myForm.get('remarks');
  }
 
 
 
  submit() {
 
   if(this.value==1) {
    let submitModel: identityapprove = {
      proofId: this.id,
      identityAdminComments: this.remarks?.value.trim(),
      identityAdminApprovalStatus: this.approvalStatus?.value,
      identityAdminApprovedBy: this.createdBy
    };
 
    this.service.identityApproval(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();  // Close the dialog
       
      } else {
        this.dialog.closeAll();
        this.toaster.error(res.responseMessage);
      
      }
    });
  }
 
  if(this.value==2) {
    let submitModel: addressapprove = {
      proofId: this.id,
      addressAdminComments: this.remarks?.value,
      addressAdminApprovalStatus: this.approvalStatus?.value,
      addressAdminApprovedBy: this.createdBy
    };
 
    this.service.addressApproval(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();  // Close the dialog
      
      } else {
        this.dialog.closeAll();
        this.toaster.error(res.responseMessage);
      }
    });
  }
 
  if(this.value==3) {
    let submitModel: signatureapprove = {
      proofId: this.id,
      signatureAdminComments: this.remarks?.value,
      signatureAdminApprovalStatus: this.approvalStatus?.value,
      signatureAdminApprovedBy: this.createdBy
    };
 
    this.service.signatureApproval(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.dialog.closeAll();  // Close the dialog
       
      } else if(res.flag==2) {
        this.toaster.error(res.responseMessage);
        this.dialog.closeAll();  // Close the dialog
        
      }
    });
  }
}
  
}
