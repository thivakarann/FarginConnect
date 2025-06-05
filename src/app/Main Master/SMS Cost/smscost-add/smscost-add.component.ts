import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { SMSCostAdd } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-smscost-add',
  templateUrl: './smscost-add.component.html',
  styleUrl: './smscost-add.component.css'
})
export class SMScostAddComponent {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  minDate: string;

  constructor(
    public addsms: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Moves to tomorrow
    this.minDate = today.toISOString().split("T")[0];
  }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      // amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]),
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
      amount: this.amount?.value.trim(),
      createdBy: this.getadminname,
      effectiveDate: this.effectiveDate?.value
    }

    this.addsms.smscostadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
