import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CreateSMS } from '../../fargin-model/fargin-model.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sms-create',
  templateUrl: './sms-create.component.html',
  styleUrl: './sms-create.component.css'
})
export class SmsCreateComponent implements OnInit {
  merchantid: any;
  myForm4!: FormGroup;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  options: any;
  free: any;
  paid: any;
  allSelecteds = false;
  @ViewChild('selectspaid') selectspaid: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
 
  merchantId: any;
  freepaid: any;
 
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 
  ngOnInit(): void {
    this.merchantid = this.data.value;
    this.myForm4 = new FormGroup({
      smsFor: new FormControl('', [Validators.required]),
      smsForpaid: new FormControl('', [Validators.required]),
    });
    this.service.SmsDropdownGetAll(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.freepaid = res.response;

      }
    });
    this.service.smsfreepaiddropdowns(0).subscribe((res: any) => {
      if (res.flag == 1) {
        this.free = res.response;
      }
    });
    this.service.smsfreepaiddropdowns(1).subscribe((res: any) => {
      if (res.flag == 1) {
        this.paid = res.response;
      }
    });
  }
 
  get smsFor() {
    return this.myForm4.get('smsFor');
  }
 
  get smsForpaid() {
    return this.myForm4.get('smsForpaid');
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAll() {
    if (this.allSelecteds) {
      this.selectspaid.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectspaid.options.forEach((item: MatOption) => item.deselect());
    }
  }
  smsSubmit() {
    // const smsFor = this.smsFor?.value || [];
    // const smsForpaid = this.smsForpaid?.value || [];
    // const combinedSmsFor = [...smsFor, ...smsForpaid];
    let submitModel: CreateSMS = {
      merchantId: this.merchantid,
      type: this.smsFor?.value,
      createdBy: this.getadminname,
      smsCharge:this.smsForpaid?.value
    };
    this.service.CreateSMS(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}