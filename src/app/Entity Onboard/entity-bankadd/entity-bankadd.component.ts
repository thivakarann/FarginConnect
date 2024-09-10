import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { bankData } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-bankadd',
  templateUrl: './entity-bankadd.component.html',
  styleUrl: './entity-bankadd.component.css'
})

export class EntityBankaddComponent implements OnInit {



  BankForm: any = FormGroup;
  categorydetails: any;
  documentname: any;
  documentNumber: any;
  documentfront: any;
  documentback: any;
  merchantid: any;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.merchantid = this.data.value;
    console.log(this.merchantid);

    this.BankForm = new FormGroup({
      accountHolderName: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      bankName: new FormControl(null, Validators.required),
      ifscCode: new FormControl(null, Validators.required),
      branchName: new FormControl(null, Validators.required),
      accountType: new FormControl(null, Validators.required),
    })
  }
  get accountHolderName() {
    return this.BankForm.get('accountHolderName')
  }

  get accountNumber() {
    return this.BankForm.get('accountNumber')
  }
  get bankName() {
    return this.BankForm.get('bankName')
  }

  get ifscCode() {
    return this.BankForm.get('ifscCode')
  }

  get branchName() {
    return this.BankForm.get('branchName')
  }

  get accountType() {
    return this.BankForm.get('accountType')
  }

  submit() {
    let submitModel: bankData = {
      accountHolderName: this.accountHolderName?.value,
      accountNumber: this.accountNumber?.value,
      bankName: this.bankName?.value,
      ifscCode: this.ifscCode?.value,
      branchName: this.branchName?.value,
      accountType: this.accountType?.value,
      merchantId: this.merchantid
    }
    this.service.EntitybankAdd(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        this.toastr.error(res.responseMessage);
      }

      console.log(res);
    })
  }


}
