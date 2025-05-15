import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BranchEdit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css',
})
export class BranchEditComponent {
  id: any;
  branchid: any;
  branchedit!: FormGroup;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  options: any;
  plans: any;
  todayDate: string = '';
  branch: any;
  Expirydate: any;
  key: any;
  secret: any;
  code: any;
  bank: any;
  holdername: any;
  number: any;
  accountid: any;
  smsmerchantNames: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.id = this.data.value;
    this.branchid = this.data.value.branchId;
    this.branch = this.data.value.branchName;
    this.key = this.data.value.apiKey;
    this.secret = this.data.value.secretKey;
    this.bank = this.data.value.bankName;
    this.code = this.data.value.ifscCode;
    this.holdername = this.data.value.accountHolderName;
    this.number = this.data.value.accountNumber;
    this.accountid = this.data.value.accountId;
    this.smsmerchantNames = this.data.value.smsMerchantName;

    this.branchedit = new FormGroup({
      branchName: new FormControl('', [
        Validators.required,
       Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [
        Validators.required,
      Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      accountHolderName: new FormControl('', [
        Validators.required,
      Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      accountNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9,18}$'),
      ]),
      ifscCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
      ]),
      accountId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,10}$/),
      ]),
      smsmerchantname: new FormControl('', [
        Validators.required,
       Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),

        Validators.maxLength(25),
      ]),
    });
  }

  get branchName() {
    return this.branchedit.get('branchName');
  }

  get apiKey() {
    return this.branchedit.get('apiKey');
  }

  get secretKey() {
    return this.branchedit.get('secretKey');
  }

  get bankName() {
    return this.branchedit.get('bankName');
  }
  get accountId() {
    return this.branchedit.get('accountId');
  }

  get accountHolderName() {
    return this.branchedit.get('accountHolderName');
  }
  get accountNumber() {
    return this.branchedit.get('accountNumber');
  }
  get ifscCode() {
    return this.branchedit.get('ifscCode');
  }

  get smsmerchantname() {
    return this.branchedit.get('smsmerchantname');
  }
  Submit() {
 
    let submitModel: BranchEdit = {
      branchName: this.branchName?.value.trim(),
      accountId: this.accountId?.value,
      apiKey: this.apiKey?.value.trim(),
      secretKey: this.secretKey?.value.trim(),
      bankName: this.bankName?.value.trim(),
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value,
      ifscCode: this.ifscCode?.value,
      smsMerchantName:this.smsmerchantname?.value.trim(),
      modifiedBy: this.getadminname
    }
 
    this.service.BranchUpdate(this.branchid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
