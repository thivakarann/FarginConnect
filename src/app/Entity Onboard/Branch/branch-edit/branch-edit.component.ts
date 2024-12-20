import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branchadd, BranchEdit } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css'
})
export class BranchEditComponent {
  id: any;
  branchid: any;
 
  branchedit!: FormGroup;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  options: any;
  plans: any;
  todayDate: string = '';
  branch:any
  Expirydate: any;
  key:any;
  secret:any;
  code:any;
  bank:any;
  holdername:any;
  number:any;
  accountid:any;
 
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,) { }
 
  ngOnInit(): void {
    this.id = this.data.value;
    this.branchid=this.data.value.branchId
 
    this.branch=this.data.value.branchName
    this.key=this.data.value.apiKey
    this.secret=this.data.value.secretKey
    this.bank=this.data.value.bankName
    this.code=this.data.value.ifscCode
    this.holdername=this.data.value.accountHolderName
    this.holdername=this.data.value.accountNumber
    this.number=this.data.value.accountNumber
    this.accountid=this.data.value.accountId
 
 
 
    this.branchedit = new FormGroup({
      branchName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      accountHolderName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{9,18}$")]),
      ifscCode: new FormControl('', [Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]),
      createdBy: new FormControl(''),
      merchantId: new FormControl(''),
      accountId: new FormControl(''),
    })
 
 
  }
 
 
 
  get branchName() {
    return this.branchedit.get('branchName')
 
  }
 
  get apiKey() {
    return this.branchedit.get('apiKey')
 
  }
 
  get secretKey() {
    return this.branchedit.get('secretKey')
 
  }
 
  get bankName() {
    return this.branchedit.get('bankName')
 
  }
  get accountId() {
    return this.branchedit.get('accountId')
 
  }
 
  get accountHolderName() {
    return this.branchedit.get('accountHolderName')
 
  }
  get accountNumber() {
    return this.branchedit.get('accountNumber')
 
  }
  get ifscCode() {
    return this.branchedit.get('ifscCode')
 
  }
 
 
  Submit() {
 
    let submitModel: BranchEdit = {
      branchName: this.branchName?.value,
      accountId: this.accountId?.value,
      apiKey: this.apiKey?.value,
      secretKey: this.secretKey?.value,
      bankName: this.bankName?.value,
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      ifscCode: this.ifscCode?.value,
      modifiedBy: this.getadminname
    }
 
    this.service.BranchUpdate(this.branchid,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
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