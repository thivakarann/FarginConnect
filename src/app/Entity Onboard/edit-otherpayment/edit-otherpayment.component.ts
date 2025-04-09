import { Component, Inject } from '@angular/core';
import { updateOtherPayment } from '../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-edit-otherpayment',
  templateUrl: './edit-otherpayment.component.html',
  styleUrl: './edit-otherpayment.component.css'
})
export class EditOtherpaymentComponent {
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  payId: any;
  servicename: any;
  paidamount: any;

  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.data.value
    this.payId = this.data.value.payId;
    this.servicename = this.data.value.serviceName;
    this.paidamount = this.data.value.paidAmount;


    this.myForm = new FormGroup({
      paidAmount: new FormControl('', [Validators.required,]),
      serviceName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(30) 
      ]),
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
    let submitModel: updateOtherPayment = {
      serviceName: this.serviceName?.value.trim(),
      paidAmount: this.paidAmount?.value.trim(),
      modifiedBy: this.getadminname
    }

    this.Approval.OtherPaymentUpdate(this.payId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
      
      }
      else {
        this.toastr.error(res.response)
      }
    })
  }
}
