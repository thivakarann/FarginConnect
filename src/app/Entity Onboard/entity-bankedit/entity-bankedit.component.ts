import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { bankedit } from '../../fargin-model/fargin-model.module';


@Component({
  selector: 'app-entity-bankedit',
  templateUrl: './entity-bankedit.component.html',
  styleUrl: './entity-bankedit.component.css'
})
export class EntityBankeditComponent implements OnInit {
  BankForm: any = FormGroup;
  categorydetails: any;
  documentname: any;
  documentNumber: any;
  documentfront: any;
  documentback: any;
  merchantid: any;
  merchantBankId: any;
  bankData: any;
  BankNames: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.bankData = this.data.value;
    
    

    this.merchantBankId = this.data.value.merchantBankId;

    this.service.activebankdetails().subscribe((res:any)=>{
      this.BankNames = res.response;
    });


    this.BankForm = new FormGroup({
      accountHolderName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      accountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{9,18}$")
      ]),
      bankName: new FormControl("", [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      ifscCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      accountType: new FormControl("", [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),

      ledgerId: new FormControl("",),
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

  get ledgerId() {
    return this.BankForm.get('ledgerId')
  }

  submit() {
    let submitModel: bankedit = {
      accountHolderName: this.accountHolderName.value.trim(),
      accountNumber: this.accountNumber.value.trim(),
      bankId: this.bankName.value,
      ifscCode: this.ifscCode.value.trim(),
      branchName: this.branchName.value.trim(),
      accountType: this.accountType.value,
      ledgerId:this.ledgerId?.value.trim()
    }
    this.service.EntitybankEdit(this.merchantBankId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll();  // Close the dialog
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
