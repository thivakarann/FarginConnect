import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Othermanualpay } from '../../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-otherpay-manualpayment',
  templateUrl: './otherpay-manualpayment.component.html',
  styleUrl: './otherpay-manualpayment.component.css'
})
export class OtherpayManualpaymentComponent implements OnInit {

  manualpay!: FormGroup;
  payId: any;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {

    this.payId = this.data.value;
    console.log(this.payId)


    this.manualpay = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
      utrNumber: new FormControl('', [Validators.required]),

      technicalPayStatus: new FormControl('', [Validators.required]),
      updatedBy: new FormControl('')
    });

    this.manualpay.get('paymentMode')?.valueChanges.subscribe((value) => { const utrNumberControl = this.manualpay.get('utrNumber'); if (value === 'Cash') { utrNumberControl?.clearValidators(); utrNumberControl?.disable(); } else { utrNumberControl?.setValidators([Validators.required]); utrNumberControl?.enable(); } utrNumberControl?.updateValueAndValidity(); });

  }

  get paymentMode() {
    return this.manualpay.get('paymentMode');
  }

  get utrNumber() {
    return this.manualpay.get('utrNumber');
  }
  get technicalPayStatus() {
    return this.manualpay.get('technicalPayStatus');
  }



  Transactionpay() {
    let submitModel: Othermanualpay = {
      paymentMethod: this.paymentMode?.value,
      paymentStatus: this.technicalPayStatus?.value,
      utrNumber: this.utrNumber?.value || "-",
      updatedBy: this.createdBy
    }

    this.service.OtherpaymentManualpay(this.payId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()

      } else {
        this.toastr.warning(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
      }
    })
  }

}     
