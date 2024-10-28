import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { createOtherPayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-create-otherpayment',
  templateUrl: './create-otherpayment.component.html',
  styleUrl: './create-otherpayment.component.css'
})
export class CreateOtherpaymentComponent {
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;

  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.data.value
    

    this.myForm = new FormGroup({
      paidAmount: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$')]),
      serviceName: new FormControl('', [Validators.required,]),
      utrnumber: new FormControl(''),
      validitydate: new FormControl(''),

    });
  }

  get paidAmount() {
    return this.myForm.get('paidAmount')

  }

  get serviceName() {
    return this.myForm.get('serviceName')

  }

  submit() {
    let submitModel: createOtherPayment = {
      serviceName: this.serviceName?.value,
      paidAmount: this.paidAmount?.value,
      createdBy: this.getadminname,
      merchantId: this.id
    }

    this.Approval.CreateOtherPayment(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.response)
      }
    })
  }
}
