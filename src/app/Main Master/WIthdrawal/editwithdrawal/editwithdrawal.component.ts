import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Editwithdrawal } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editwithdrawal',
  templateUrl: './editwithdrawal.component.html',
  styleUrl: './editwithdrawal.component.css'
})
export class EditwithdrawalComponent {
  withdrawalFormGroup: any = FormGroup;
  amount: any;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  show: any;
  fee: any;
  infee: any;
  withdrawal: any;
  tresholdId: any;
  values: any;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.tresholdId = data.value.tresholdId;
  }

  ngOnInit(): void {
   
    
    this.withdrawalFormGroup = new FormGroup({
      amountRange: new FormControl('', [Validators.required]),
      amountRanges: new FormControl('', [Validators.required]),
      gstInPercentage: new FormControl('', [Validators.required]),
      mode: new FormControl('', [Validators.required]),
      gstType: new FormControl('', [Validators.required]),
      fees: new FormControl('', [Validators.required]),
     
    });
    if (this.data && this.data.value) {
      this.withdrawalFormGroup.patchValue({
        amountRange: this.data.value.amountRange.split('-')[0],
        amountRanges: this.data.value.amountRange.split('-')[1],
        gstInPercentage: this.data.value.gstInPercentage,
        mode: this.data.value.mode,
        fees: this.data.value.baseAmount,
        gstType:this.data.value.gstType,   
      });
      this.values=this.data.value.fees
    } else {
      console.error('Data is not defined');
    }
   
    this.subscribeToFormChanges()
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
    this.withdrawalFormGroup.get('gstType')?.valueChanges.subscribe(() => this.calculate());
    this.withdrawalFormGroup.get('fees')?.valueChanges.subscribe(() => this.calculate());
    this.withdrawalFormGroup.get('gstInPercentage')?.valueChanges.subscribe(() => this.calculate());
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
    if (this.fee !== null && this.gstInPercentage?.value !== null) {
      const gst = this.gstInPercentage?.value || 0;
      let calculatedAmount = this.fee * (1 + gst / 100);
      this.values = parseFloat(calculatedAmount.toFixed(2));
      
    } else {
      // Provide a default value if calculation cannot be performed
      this.values = 0;
    }
  }

  calculateInclusive() {
    if (this.fee !== null && this.gstInPercentage?.value !== null) {
      const gst = this.gstInPercentage?.value || 0;
      let baseAmount = this.fee / (1 + gst / 100);
      this.values = parseFloat(baseAmount.toFixed(2));
      
    } else {
      // Provide a default value if calculation cannot be performed
      this.values = 0;
    }
  }

  submit() {
    const amountRange = `${this.amountRange.value}-${this.amountRanges.value}`;
    let submitModel: Editwithdrawal = {
      amountRange:amountRange,
      mode: this.mode.value,
      gstType: this.gstType.value,
      fees: this.fees.value,
      gstInPercentage: this.gstInPercentage.value,
      modifiedBy: this.createdBy,
    };
    this.service.editwithdrawals(this.tresholdId,submitModel).subscribe((res: any) => {
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
