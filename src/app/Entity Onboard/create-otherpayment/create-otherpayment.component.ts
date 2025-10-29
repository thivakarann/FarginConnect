import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { createOtherPayment } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-create-otherpayment',
  templateUrl: './create-otherpayment.component.html',
  styleUrl: './create-otherpayment.component.css',
})
export class CreateOtherpaymentComponent {
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  id: any;
  myForm!: FormGroup;
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
      paidAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$'),
      ]),

      serviceName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z\\s ]+$'),
        Validators.maxLength(30),
      ]),
      utrnumber: new FormControl(''),
      validitydate: new FormControl(''),
    });
  }

  get paidAmount() {
    return this.myForm.get('paidAmount');
  }

  get serviceName() {
    return this.myForm.get('serviceName');
  }

  submit() {
    let submitModel: createOtherPayment = {
      serviceName: this.serviceName?.value.trim(),
      paidAmount: this.paidAmount?.value.trim(),
      createdBy: this.adminName,
      merchantId: this.id,
    };

    this.Approval.CreateOtherPayment(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.response);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
    });
  }
}
