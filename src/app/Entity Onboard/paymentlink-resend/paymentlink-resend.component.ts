import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EmailTrigger } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-paymentlink-resend',
  templateUrl: './paymentlink-resend.component.html',
  styleUrl: './paymentlink-resend.component.css'
})
export class PaymentlinkResendComponent {
  addcategory: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  merchantid: any;
  minDate: any = Date;
  maxDate: any = Date;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {
    this.merchantid = this.data.value
    
    this.addcategory = new FormGroup({
      expiryDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      Url: new FormControl('', [
        Validators.required,
        Validators.pattern("((http|https)://)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+(/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?")
      ]),
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]

    const nextMonth = new Date(today.setMonth(today.getMonth() + 1))
    this.maxDate = nextMonth.toISOString().split('T')[0]

  }
  get expiryDate() {
    return this.addcategory.get('expiryDate');
  }

  get description() {
    return this.addcategory.get('description');
  }
  get Url() {
    return this.addcategory.get('Url');
  }

  submit() {
    let submitModel: EmailTrigger = {
      merchantId: this.merchantid,
      linkExpiry: this.expiryDate?.value,
      description: this.description?.value,
      returnUrl: this.Url?.value
    }
    this.service.EmailTrigger(submitModel).subscribe((res: any) => {
      if (res.response.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
       
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
