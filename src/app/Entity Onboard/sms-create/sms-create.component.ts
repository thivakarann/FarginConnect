import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CreateSMS } from '../../fargin-model/fargin-model.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sms-create',
  templateUrl: './sms-create.component.html',
  styleUrl: './sms-create.component.css',
})
export class SmsCreateComponent implements OnInit {
  merchantid: any;
  myForm4!: FormGroup;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  options: any;
  free: any;
  paid: any;
  allSelecteds = false;
  @ViewChild('selectspaid') selectspaid: any = MatSelect;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  merchantId: any;
  freepaid: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.merchantid = this.data.value;
    this.myForm4 = new FormGroup({
      smsFor: new FormControl('', [Validators.required]),
      smsForpaid: new FormControl('', [Validators.required]),
    });
    this.service.SmsDropdownGetAll(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.freepaid = res.response.reverse();
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
      console.log(this.allSelected);
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
    let submitModel: CreateSMS = {
      merchantId: this.merchantid,
      type: this.smsFor?.value,
      createdBy: this.getadminname,
      smsCharge: this.smsForpaid?.value,
    };
    this.service.CreateSMS(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
