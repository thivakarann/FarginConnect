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

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.merchantid = this.data.value;

    this.service.SmsDropdownGetAll().subscribe((res: any) => {
      if (res.flag == 1) {
        this.options = res.response;
      }
    })
    this.myForm4 = new FormGroup({
      smsFor: new FormControl('', [
        Validators.required,

      ]),



    })
  }


  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;

  merchantId: any;


  get smsFor() {
    return this.myForm4.get('smsFor')

  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }

  smsSubmit() {
    let submitModel: CreateSMS = {
      merchantId: this.merchantid,
      type: this.smsFor?.value,
      createdBy: this.getadminname
    }

    this.service.CreateSMS(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
