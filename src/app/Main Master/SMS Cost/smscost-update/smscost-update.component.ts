import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Payload } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-smscost-update',
  templateUrl: './smscost-update.component.html',
  styleUrl: './smscost-update.component.css'
})
export class SmscostUpdateComponent {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  minDate: string;
  details: any;

  constructor(
    public Updatesms: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0\\.([0-9]{2}|[0-9]{1}))?$')
      ]),
      effectiveDate: new FormControl('', [Validators.required])
    });
    this.myForm.patchValue({
      amount: this.data?.value?.costPerSms.toFixed(2),
      effectiveDate: this.data?.value?.effectiveFrom
    })
  }

  get amount() {
    return this.myForm.get('amount')
  }

  get effectiveDate() {
    return this.myForm.get('effectiveDate')
  }



  submit() {
    const payload = {
      smsCostId: this.data?.value.smsCostId,
      costPerSms: this.amount?.value,
      modifiedBy: this.adminName,
      effectiveFrom: this.effectiveDate?.value
    }
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.Updatesms.smsupdate(datamodal).subscribe((res: any) => {
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
