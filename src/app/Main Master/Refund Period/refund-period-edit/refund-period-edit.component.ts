import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { RefundPeriodUpdate } from '../../../Fargin Model/fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-refund-period-edit',
  templateUrl: './refund-period-edit.component.html',
  styleUrl: './refund-period-edit.component.css'
})
export class RefundPeriodEditComponent implements OnInit {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  id: any;
  details: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public refundupdate: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      paymentMethod: new FormControl('', Validators.required),
      refundPeriods: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[1-9][0-9]*$")
      ]),
    });
    this.myForm.patchValue({
      refundPeriods: this.data?.value?.refundPeriods,
      paymentMethod: this.data?.value?.paymentMethod,
    })
  }

  get paymentMethod() {
    return this.myForm.get('paymentMethod')

  }
  get refundPeriods() {
    return this.myForm.get('refundPeriods')
  }

  get refundPeriodId() {
    return this.myForm.get('refundPeriodId')
  }

  Edit() {
    let submitModel: RefundPeriodUpdate = {
      refundPeriodId: this.refundPeriodId?.value,
      paymentMethod: this.paymentMethod?.value,
      refundPeriods: this.refundPeriods?.value,
      modifiedBy: this.adminName,
    }
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.refundupdate.RefundPeriodUpdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    })
  }
}
