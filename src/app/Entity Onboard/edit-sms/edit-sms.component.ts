import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { SmsUpdate } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-sms',
  templateUrl: './edit-sms.component.html',
  styleUrl: './edit-sms.component.css'
})
export class EditSmsComponent {
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  id: any;
  myForm!: FormGroup;
  payId: any;
 
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
 
  merchantsmsId: any;
  options: any;
  Smsdetails: any;
  smsCharge: any;
  paid: any;
  free: any;
  freepaid: any;
  merchantid: any;
  smstitle: any;
  smsTempId: any;
 
  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.merchantid = this.data.value.merchantId?.merchantId;
    this.Smsdetails = this.data.value
 
    this.smsTempId=this.data.value.type?.smsTempId
    console.log(this.smsTempId)
    this.merchantsmsId=this.data.value.merchantSmsId;
    this.smsCharge=this.data.value.type.smsCharge
   
    this.myForm = new FormGroup({
      smsFor: new FormControl(this.Smsdetails?.type?.smsTitle),
      smsForpaid: new FormControl('', [Validators.required,]),
      modifedBy:new FormControl(this.getadminname),
      // selected: new FormControl(''),
    });
 
    this.Approval.SmsDropdownGetAll(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.freepaid = res.response;
      }
    });
 
    this.Approval.smsfreepaiddropdowns(0).subscribe((res: any) => {
      if (res.flag == 1) {
        this.free = res.response;
      }
    });
    this.Approval.smsfreepaiddropdowns(1).subscribe((res: any) => {
      if (res.flag == 1) {
        this.paid = res.response;
      }
    });
   
   
 
   
  }
 
  get smsFor() {
    return this.myForm.get('smsFor')
 
  }
  get smsForpaid() {
    return this.myForm.get('smsForpaid')
 
  }
 
 
 
  submit() {
    let submitModel: SmsUpdate = {
      smsCharge:this.smsForpaid?.value,
      smsType: this.smsTempId,
      modifedBy: this.getadminname,
     
    }
    this.Approval.smsUpdate(this.merchantsmsId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);  
           }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  toggleAllSelection(){
    if (this.allSelected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }

}