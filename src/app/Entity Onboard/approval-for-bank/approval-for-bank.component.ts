import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApprovalBank } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-approval-for-bank',
  templateUrl: './approval-for-bank.component.html',
  styleUrl: './approval-for-bank.component.css',
})
export class ApprovalForBankComponent implements OnInit {
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  id: any;
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.id = this.data.value;

    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
      reMarks: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),

      ]),
    });
  }

  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }

  get reMarks() {
    return this.myForm.get('reMarks');
  }

  submit() {
    let submitModel: ApprovalBank = {
      approvalStatus: this.approvalStatus?.value,
      reMarks: this.reMarks?.value.trim(),
      approvalBy: this.adminName,
    };

    this.Approval.EntityBankApprovals(this.id, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        } else {
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }
}
