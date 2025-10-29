import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { policyApproval } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-policy-approval',
  templateUrl: './policy-approval.component.html',
  styleUrl: './policy-approval.component.css'
})
export class PolicyApprovalComponent {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  myForm!: FormGroup;
  id: any;
  approval: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private cryptoService:EncyDecySericeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.id = this.data.value
    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required]),
    })
  }

  get approvalStatus() {
    return this.myForm.get('approvalStatus');
  }

  submit() {
    let submitModel: policyApproval = {
      approvedStatus: this.approvalStatus?.value,
      approvedBy: this.adminName,
    };
    this.service.ApprovalForPolicy(this.id, submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toaster.error(res.responseMessage);
      }
    },);
  }
}
