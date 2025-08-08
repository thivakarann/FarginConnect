import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { whatappserviceApproval } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-whatsapp-approval',
  templateUrl: './whatsapp-approval.component.html',
  styleUrl: './whatsapp-approval.component.css'
})
export class WhatsappApprovalComponent implements OnInit {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.myForm = new FormGroup({
      smsApprovalStatus: new FormControl('', [Validators.required]),
    });
  }

  get smsApprovalStatus() {
    return this.myForm.get('smsApprovalStatus');
  }

  Submit() {
    let submitModel: whatappserviceApproval = {
      merchantWhatsAppId: this.data?.value,
      smsApprovalStatus: this.smsApprovalStatus?.value,
      smsApprovedBy: this.getadminname
    }
    this.Approval.MerchatWhatappServiceApproval(submitModel).subscribe((res: any) => {
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
