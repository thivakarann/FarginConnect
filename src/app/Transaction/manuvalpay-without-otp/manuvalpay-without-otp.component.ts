import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { manuvalwithoutOTP } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-manuvalpay-without-otp',
  templateUrl: './manuvalpay-without-otp.component.html',
  styleUrl: './manuvalpay-without-otp.component.css'
})
export class ManuvalpayWithoutOtpComponent {
  manualpay!: FormGroup;
  lcopid: any;
  lcop: any;
  plans: any;
  totalAmounts: any;
  prices: any;
  transactionValue: any;
  fullname: any = localStorage.getItem('fullname')

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    
    
    this.transactionValue = this.data.value;


    this.manualpay = new FormGroup({
      paymentMethod: new FormControl('', [Validators.required]),
      utrNumber: new FormControl('', [Validators.required]),

      paymentStatus: new FormControl('', [Validators.required]),
      // otpCode: new FormControl('', [Validators.required])
    });

    this.manualpay.get('paymentMethod')?.valueChanges.subscribe((value) => { const utrNumberControl = this.manualpay.get('utrNumber'); if (value === 'Cash') { utrNumberControl?.clearValidators(); utrNumberControl?.disable(); } else { utrNumberControl?.setValidators([Validators.required]); utrNumberControl?.enable(); } utrNumberControl?.updateValueAndValidity(); });

  }

  get paymentMethod() {
    return this.manualpay.get('paymentMethod');
  }
 
  get utrNumber() {
    return this.manualpay.get('utrNumber');
  }
  get paymentStatus() {
    return this.manualpay.get('paymentStatus');
  }

  Transactionpay(id: any) {
    let submitModel: manuvalwithoutOTP = {
      paymentMethod: this.paymentMethod?.value,
      utrNumber: this.utrNumber?.value || "-",
      paymentStatus: this.paymentStatus?.value,
      updatedBy:this.fullname
    }
 
    this.service.Manuvaltranswithoutotp(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
        
      } else {
        this.toastr.warning(res.responseMessage)
      }
    })
  }


}
