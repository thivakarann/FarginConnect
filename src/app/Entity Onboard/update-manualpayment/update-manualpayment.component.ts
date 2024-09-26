import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { manualPayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-update-manualpayment',
  templateUrl: './update-manualpayment.component.html',
  styleUrl: './update-manualpayment.component.css'
})
export class UpdateManualpaymentComponent {
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
 
  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.data.value
    console.log(this.id);
 
    this.myForm = new FormGroup({
      paidStatus: new FormControl('', [Validators.required,]),
      paymentmode: new FormControl('', [Validators.required,]),
      utrnumber: new FormControl(''),
 
    });
  }
 
  get paidStatus() {
    return this.myForm.get('paidStatus')
 
  }
 
  get paymentmode() {
    return this.myForm.get('paymentmode')
 
  }
  get utrnumber() {
    return this.myForm.get('utrnumber')
 
  }
 
 
  submit() {
    let submitModel: manualPayment = {
      technicalPayStatus: this.paidStatus?.value,
      paymentMode: this.paymentmode?.value,
      utrNumber: this.utrnumber?.value
    }
 
    this.Approval.UpdateManualPayment(this.id,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.response);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);      }
      else {
        this.toastr.error(res.response)
      }
    })
  }
}

