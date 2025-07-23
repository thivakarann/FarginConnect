import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { KeysUpdateComponent } from '../keys-update/keys-update.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeysUpdate } from '../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-onboardinfo',
  templateUrl: './view-onboardinfo.component.html',
  styleUrl: './view-onboardinfo.component.css'
})
export class ViewOnboardinfoComponent implements OnInit {
  merchantId: any;
  detaislone: any;
  copySuccess: boolean = false;
  copySuccesss: boolean = false;
  valueonboardadd: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  details: any;
  bankdetails: any;
  KYCDetails: any;
  bussinessdoc: any;
  identityProof: any;
  addressProof: any;
  signatureProof: any;
  businessCategoryId: any;
  approval: any;
  isEditing: boolean = false;
  selectedOption: any;
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService, private toaster: ToastrService,
  ) {

  }
  ngOnInit(): void {


    this.merchantId = this.data.value


    this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
      this.detaislone = res.response.merchantpersonal;
    })

    this.merchantId = this.data.value

    this.myForm = new FormGroup({
      accountId: new FormControl('', [Validators.required]),
      apikey: new FormControl('', [Validators.required]),
      secretkey: new FormControl('', [Validators.required]),
    })

    this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
      this.detaislone = res.response.merchantpersonal;
    })
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueonboardadd = 'Entity View-Onboard Information-Add'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View-Onboard Information-Add') {
                this.valueonboardadd = 'Entity View-Onboard Information-Add'
              }

            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })
  }

  get accountId() {
    return this.myForm.get('accountId');
  }
  get apikey() {
    return this.myForm.get('apikey');
  }
  get secretkey() {
    return this.myForm.get('secretkey');
  }


  submit() {
    let submitModel: KeysUpdate = {
      accountId: this.accountId?.value,
      merchantId: this.merchantId,
      apikey: this.apikey?.value,
      secretkey: this.secretkey?.value
    }
    this.service.KeysUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.approval = res.response;
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();

      }
      else if (res.flag == 2) {
        this.toaster.error(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
    })
  }
  editKeys() {
    this.isEditing = true;
  }

  copyText(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccess = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }

  copyText1(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccesss = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }
}
