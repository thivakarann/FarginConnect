import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { farginUpdate } from '../../../fargin-model/fargin-model.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-fargin-bank-edit',
  templateUrl: './fargin-bank-edit.component.html',
  styleUrl: './fargin-bank-edit.component.css',
})
export class FarginBankEditComponent {
  BankFormedit!: FormGroup;
  showPassword: boolean = false;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || ''); activeRole: any;
  farginbank: any;
  adminBankId: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.adminBankId = this.data.value.adminBankId; }

  ngOnInit(): void {
    this.BankFormedit = new FormGroup({
      accountHolderName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z. ]+$'),
        Validators.maxLength(50),
      ]),
      accountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{9,18}$")
      ]),

      bankName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),
      typemode: new FormControl('', [Validators.required]),
      ifscCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),
      ledgerId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,10}$/),
      ]),
    });

    if (this.data && this.data.value) {
      this.BankFormedit.patchValue({
        accountHolderName: this.data.value.accountHolderName,
        accountNumber: this.data.value.accountNumber,
        bankName: this.data.value.bankName,
        ifscCode: this.data.value.ifscCode,
        branchName: this.data.value.branchName,
        ledgerId: this.data.value.ledgerId,
        typemode: this.data.value.typeMode,
      });
    }
  }
  get accountHolderName() {
    return this.BankFormedit.get('accountHolderName');
  }
  get accountNumber() {
    return this.BankFormedit.get('accountNumber');
  }
  get bankName() {
    return this.BankFormedit.get('bankName');
  }

  get ifscCode() {
    return this.BankFormedit.get('ifscCode');
  }
  get branchName() {
    return this.BankFormedit.get('branchName');
  }
  get ledgerId() {
    return this.BankFormedit.get('ledgerId');
  }

  get typemode() {
    return this.BankFormedit.get('typemode');
  }

  submit() {
    let submitmodel: farginUpdate = {
      accountHolderName: this.accountHolderName?.value.trim(),
      accountNumber: this.accountNumber?.value.trim(),
      bankName: this.bankName?.value.trim(),
      ifscCode: this.ifscCode?.value.trim(),
      branchName: this.branchName?.value.trim(),
      ledgerId: this.ledgerId?.value.trim(),
      modifiedBy: this.adminName,
      typeMode: this.typemode?.value,
      adminBankId: this.adminBankId,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitmodel))
    }
    this.service.FarginUpdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toaster.error(res.messageDescription);
      }
    });
  }
}
