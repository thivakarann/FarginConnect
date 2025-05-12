import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SMSApproval, } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-sms-approval',
  templateUrl: './sms-approval.component.html',
  styleUrl: './sms-approval.component.css',
})
export class SmsApprovalComponent implements OnInit {
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.id = this.data.value;

    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
    });
  }

  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }

  submit() {
    let submitModel: SMSApproval = {
      smsApprovalStatus: this.approvalStatus?.value,
      smsApprovedBy: this.getadminname,
    };
    this.Approval.SmsApproval(this.id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
