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
import { map, startWith, pairwise, filter } from 'rxjs/operators';

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
  noDataFound = false;
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
      templateType: new FormControl('', [Validators.required]),
      tempLanguage: new FormControl('', [Validators.required]),
    });

    this.myForm4.valueChanges.pipe(
      map(val => ({
        templateType: val.templateType,
        tempLanguage: val.tempLanguage
      })),
      startWith({ templateType: null, tempLanguage: null }),
      pairwise(),
      filter(([prev, curr]) =>
      (prev.templateType !== curr.templateType ||
        prev.tempLanguage !== curr.tempLanguage)
      ),
      filter(([_, curr]) =>
        curr.templateType && curr.tempLanguage
      )
    ).subscribe(() => {
      const { templateType, tempLanguage } = this.myForm4.value;
      this.GetMessageTemplate(templateType, tempLanguage);
    });


  };

  GetMessageTemplate(templateType: string, tempLanguage: string) {
    this.service.NewSMSDropdown(this.data.value,templateType,tempLanguage)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.freepaid = res.response;
        }
        else {
          // Clear previous data and optionally show a message
          this.freepaid = [];
          // Optionally set a flag to show "No data found" in the UI
          this.noDataFound = true;
        }
      });
  }



  get smsFor() {
    return this.myForm4.get('smsFor');
  }

  get smsForpaid() {
    return this.myForm4.get('smsForpaid');
  }

  get templateType() {
    return this.myForm4.get('templateType');
  }
  get tempLanguage() {
    return this.myForm4.get('tempLanguage');
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
