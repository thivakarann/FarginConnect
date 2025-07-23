import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { bankData } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-bankadd',
  templateUrl: './entity-bankadd.component.html',
  styleUrl: './entity-bankadd.component.css',
})
export class EntityBankaddComponent implements OnInit {
  BankForm: any = FormGroup;
  categorydetails: any;
  documentname: any;
  documentNumber: any;
  documentfront: any;
  documentback: any;
  merchantid: any;
  BankNames: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.merchantid = this.data.value;

    this.service.activebankdetails().subscribe((res: any) => {
      this.BankNames = res.response.reverse();
    });

    this.BankForm = new FormGroup({
      accountHolderName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      accountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{9,18}$'),
      ]),
      bankName: new FormControl('', [
        Validators.required,

      ]),
      ifscCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
      accountType: new FormControl('', [
        Validators.required,

      ]),
      ledgerId: new FormControl('', [Validators.pattern(/^\d{1,15}$/)]),
      typemode: new FormControl('', [
        Validators.required,

      ]),
    });
  }
  get accountHolderName() {
    return this.BankForm.get('accountHolderName');
  }

  get accountNumber() {
    return this.BankForm.get('accountNumber');
  }
  get bankName() {
    return this.BankForm.get('bankName');
  }

  get ifscCode() {
    return this.BankForm.get('ifscCode');
  }

  get branchName() {
    return this.BankForm.get('branchName');
  }

  get accountType() {
    return this.BankForm.get('accountType');
  }

  get ledgerId() {
    return this.BankForm.get('ledgerId');
  }
  get typemode() {
    return this.BankForm.get('typemode');
  }
  submit() {
    let submitModel: bankData = {
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value.trim(),
      bankId: this.bankName?.value,
      ifscCode: this.ifscCode?.value.trim(),
      branchName: this.branchName?.value.trim(),
      accountType: this.accountType?.value,
      typeMode: this.typemode?.value,
      merchantId: this.merchantid,
      ledgerId: this.ledgerId?.value.trim(),
      createdBy: this.getadminname,
    };

    this.service.EntitybankAdd(submitModel).subscribe((res: any) => {
      if (res.flag === 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
    });
  }
}
