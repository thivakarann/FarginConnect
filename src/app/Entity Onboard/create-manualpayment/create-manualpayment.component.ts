import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { createManualPayment, manualPayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-create-manualpayment',
  templateUrl: './create-manualpayment.component.html',
  styleUrl: './create-manualpayment.component.css'
})
export class CreateManualpaymentComponent implements OnInit {
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  chequedate: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.data.value
   
 
    this.myForm = new FormGroup({
      paidStatus: new FormControl('', [Validators.required,]),
      paymentmode: new FormControl('', [Validators.required,]),
      utrnumber: new FormControl(''),
      validitydate:new FormControl(''),
      manualApprovalBy:new FormControl('')
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
 
  get validitydate() {
    return this.myForm.get('validitydate')
  }
 
  get manualApprovalBy() {
    return this.myForm.get('manualApprovalBy')
  }
 
 
  submit() {
    if(this.paymentmode?.value !='Cheque'){
      this.chequedate = '-';
console.log(this.chequedate)
  }
 
  else {
    this.chequedate = this.validitydate?.value
console.log(this.chequedate)
  }

    let submitModel: createManualPayment = {
      paymentMethod: this.paymentmode?.value,
      utrNumber: this.utrnumber?.value.trim(),
      paymentStatus:'Success',
      merchantId: this.id,
      date: this.chequedate,
      manualApprovalBy: this.getadminname
    }
 
    this.Approval.CreateManualPayment(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
        
       }
      else {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll();
      }
    })
  }
}
