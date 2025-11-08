import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { SmsUpdate } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-edit-sms',
  templateUrl: './edit-sms.component.html',
  styleUrl: './edit-sms.component.css',
})
export class EditSmsComponent {
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  id: any;
  myForm!: FormGroup;
  payId: any;
  @ViewChild('selects') selects: any = MatSelect;
  allSelected = false;
  options: any;
  smsCharge: any;
  paid: any;
  free: any;
  freepaid: any;
  merchantid: any;
  smstitle: any;
  smsTempId: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private Approval: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.merchantid = this.data.value.merchantId?.merchantId;

    this.myForm = new FormGroup({
      smsFor: new FormControl('', [Validators.required]),
      smsForpaid: new FormControl('', [Validators.required]),
      templateType: new FormControl('', [Validators.required]),
      tempLanguage: new FormControl('', [Validators.required]),
      modifedBy: new FormControl(this.adminName),
    });

    this.myForm.patchValue({
      smsFor: this.data?.value?.type?.smsTitle,
      smsForpaid: this.data?.value?.smsCharge,
      templateType: this.data?.value?.type?.templateType,
      tempLanguage: this.data?.value?.type?.templateLanguage
    });
  }

  get smsFor() {
    return this.myForm.get('smsFor');
  }
  get smsForpaid() {
    return this.myForm.get('smsForpaid');
  }

  get templateType() {
    return this.myForm.get('templateType');
  }
  get tempLanguage() {
    return this.myForm.get('tempLanguage');
  }

  submit() {
    let submitModel: SmsUpdate = {
      smsCharge: this.smsForpaid?.value,
      smsType: this.data?.value?.type.smsTempId,
      modifedBy: this.adminName,
    };
    this.Approval.smsUpdate(this.data?.value?.merchantSmsId, submitModel).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.bankDetailsUpdated.emit();
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.responseMessage);
        }
      }
    );
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.selects.options.forEach((item: MatOption) => item.select());
    } else {
      this.selects.options.forEach((item: MatOption) => item.deselect());
    }
  }
}
