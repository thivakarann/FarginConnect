import { Component } from '@angular/core';
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
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;

  constructor(
    public addsms: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]),

    });
  }

  get amount() {
    return this.myForm.get('amount')

  }

  submit() {
    let submitModel: SMSCostAdd = {
      amount: this.amount?.value,
      createdBy: this.getadminname
    }

    this.addsms.smscostadd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
