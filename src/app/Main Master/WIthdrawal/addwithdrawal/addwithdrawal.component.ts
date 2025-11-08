import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addwithdrawal } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-addwithdrawal',
  templateUrl: './addwithdrawal.component.html',
  styleUrl: './addwithdrawal.component.css',
})
export class AddwithdrawalComponent {
  withdrawalFormGroup: any = FormGroup;
  amount: any;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  show: any;
  fee: any;
  infee: any;
  withdrawal: any;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.withdrawalFormGroup = new FormGroup({
      amountRange: new FormControl('', [Validators.required]),
      amountRanges: new FormControl('', [Validators.required]),
      gstInPercentage: new FormControl('', [Validators.required]),
      mode: new FormControl('', [Validators.required]),
      gstType: new FormControl('', [Validators.required]),
      fees: new FormControl('', [Validators.required]),
    });
    this.subscribeToFormChanges();
  }

  get amountRange() {
    return this.withdrawalFormGroup.get('amountRange');
  }
  get amountRanges() {
    return this.withdrawalFormGroup.get('amountRanges');
  }
  get gstInPercentage() {
    return this.withdrawalFormGroup.get('gstInPercentage');
  }
  get mode() {
    return this.withdrawalFormGroup.get('mode');
  }
  get gstType() {
    return this.withdrawalFormGroup.get('gstType');
  }
  get fees() {
    return this.withdrawalFormGroup.get('fees');
  }
  subscribeToFormChanges() {
    this.withdrawalFormGroup.get('gstType')?.valueChanges.subscribe(() => {
      this.calculate();
    });

    this.withdrawalFormGroup.get('fees')?.valueChanges.subscribe(() => {
      this.calculate();
    });

    this.withdrawalFormGroup.get('gstInPercentage')?.valueChanges.subscribe(() => {
      this.calculate();
    });
  }
  onFeeChange() {
    const feeValue = this.fees?.value;
    if (feeValue !== null && feeValue !== undefined) {
      this.fee = Number(feeValue);
      this.calculate();
    }
  }
  calculate() {
    if (this.gstType?.value === 'Exclusive') {
      this.calculateExclusive();
    } else if (this.gstType?.value === 'Inclusive') {
      this.calculateInclusive();
    }
  }

  calculateExclusive() {
    if (this.fee !== null) {
      let calculatedAmount =
        this.fee * (this.gstInPercentage?.value / 100) + this.fee;
      this.amount = calculatedAmount.toFixed(2);

    }
  }

  calculateInclusive() {
    if (this.fee !== null) {
      let baseAmount = this.fee / (1 + this.gstInPercentage?.value / 100);

      this.amount = Math.round(baseAmount * 100) / 100;
    }
  }

  submit() {
    const amountRange = `${this.amountRange.value}-${this.amountRanges.value}`;
    let submitModel: Addwithdrawal = {

      amountRange: amountRange,
      mode: this.mode.value,
      gstType: this.gstType.value,
      fees: this.fees.value,
      gstInPercentage: this.gstInPercentage.value,
      createdBy: this.adminName,
    };
    this.service.addwithdrawals(submitModel).subscribe((res: any) => {
      this.withdrawal = res.response;
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
