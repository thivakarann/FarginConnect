import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdditionalPaycreate } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-create-additional',
  templateUrl: './create-additional.component.html',
  styleUrl: './create-additional.component.css'
})
export class CreateAdditionalComponent {
  pincodeformGroup: any = FormGroup;
  boxnumber: any;
  entityname: any = localStorage.getItem('entityname')
  serviceValue: any;
  regionValue: any;
  serviceIds: any;
  merchantId: any = localStorage.getItem('merchantId')
  customerid: any;
  categoryview: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {

    this.customerid = this.data.value;

    console.log("this.afj" + this.customerid)


    this.pincodeformGroup = this.fb.group({
      servicename: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*(\.[0-9]{1,2})?$')]],

    });

    this.service.CategoryGetallActive(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.categoryview = res.response;
      }
    })

  }

  get servicename() {
    return this.pincodeformGroup.get('servicename')
  }
  get amount() {
    return this.pincodeformGroup.get('amount')
  }

  submit() {

    let submitModel: AdditionalPaycreate = {
      customerId: this.customerid,
      additionalCategoryId: this.servicename?.value,
      createdBy: this.entityname,
      paidAmount: this.amount?.value
    }
    this.service.CreateAdditionalPayments(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
