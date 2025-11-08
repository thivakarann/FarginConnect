import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Payload, SMSCostAdd } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-smscost-add',
  templateUrl: './smscost-add.component.html',
  styleUrl: './smscost-add.component.css'
})
export class SMScostAddComponent {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  minDate: string;
  details: any;

  constructor(
    public addsms: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
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
  }


  get amount() {
    return this.myForm.get('amount')
  }

  get effectiveDate() {
    return this.myForm.get('effectiveDate')
  }



  submit() {
    let submitModel: SMSCostAdd = {
      costPerSms: this.amount?.value.trim(),
      createdby: this.adminName,
      effectiveFrom: this.effectiveDate?.value
    }
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.addsms.smscostadd(datamodal).subscribe((res: any) => {
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
