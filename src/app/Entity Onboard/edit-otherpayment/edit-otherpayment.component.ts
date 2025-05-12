import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {customizepay,updateOtherPayment,} from '../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-edit-otherpayment',
  templateUrl: './edit-otherpayment.component.html',
  styleUrl: './edit-otherpayment.component.css',
})
export class EditOtherpaymentComponent {
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  payId: any;
  servicename: any;
  paidamount: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  Status: any;
  paymentStatus: any;
  value: boolean = false;
  value2: boolean = false;

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.id = this.data.value;
    this.payId = this.data.value.payId;
    this.servicename = this.data.value.serviceName;
    this.paidamount = this.data.value.paidAmount;
    this.paymentStatus = this.data.value.paymentStatus;

    this.Check();

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

  Check() {
    if (this.paymentStatus == 'Initiated') {
      this.value = true;
      this.value2 = false;
    } else {
      this.value = false;
    }
  }

  Trackapi() {
    let submitModel: customizepay = {
      payId: this.payId,
    };

    this.Approval.Customizepay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success('Payment has been Completed');
        this.value = true;
        this.value2 = true;
        this.bankDetailsUpdated.emit();
        console.log('this.value' + this.value);
        console.log('this.value' + this.value2);
      } else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.value = false;
        this.value2 = false;
        this.bankDetailsUpdated.emit();
        console.log('this.value' + this.value);
        console.log('this.value' + this.value2);
      }
    });
  }
  submit() {
    let submitModel: updateOtherPayment = {
      serviceName: this.serviceName?.value.trim(),
      paidAmount: this.paidAmount?.value.trim(),
      modifiedBy: this.getadminname,
    };

    this.Approval.OtherPaymentUpdate(this.payId, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.response);
        }
      }
    );
  }
  close() {
    this.dialog.closeAll();
  }
}
