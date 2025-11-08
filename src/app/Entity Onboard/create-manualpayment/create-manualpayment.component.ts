import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { createManualPayment } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-create-manualpayment',
  templateUrl: './create-manualpayment.component.html',
  styleUrl: './create-manualpayment.component.css',
})
export class CreateManualpaymentComponent implements OnInit {
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  id: any;
  myForm!: FormGroup;
  chequedate: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.id = this.data.value;

    this.myForm = new FormGroup({
      paidStatus: new FormControl('', [Validators.required]),
      paymentmode: new FormControl('', [Validators.required]),
      utrnumber: new FormControl(''),
      validitydate: new FormControl(''),
      manualApprovalBy: new FormControl(''),
    });
  }

  get paidStatus() {
    return this.myForm.get('paidStatus');
  }

  get paymentmode() {
    return this.myForm.get('paymentmode');
  }
  get utrnumber() {
    return this.myForm.get('utrnumber');
  }

  get validitydate() {
    return this.myForm.get('validitydate');
  }

  get manualApprovalBy() {
    return this.myForm.get('manualApprovalBy');
  }

  submit() {
    if (this.paymentmode?.value != 'Cheque') {
      this.chequedate = '-';
    } else {
      this.chequedate = this.validitydate?.value;
    }

    let submitModel: createManualPayment = {
      paymentMethod: this.paymentmode?.value,
      utrNumber: this.utrnumber?.value.trim(),
      paymentStatus: 'Success',
      merchantId: this.id,
      date: this.chequedate,
      manualApprovalBy: this.adminName,
    };

    this.Approval.CreateManualPayment(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
    });
  }
}
