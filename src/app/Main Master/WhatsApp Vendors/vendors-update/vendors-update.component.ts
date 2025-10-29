import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VendorsUpdate } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-vendors-update',
  templateUrl: './vendors-update.component.html',
  styleUrl: './vendors-update.component.css'
})
export class VendorsUpdateComponent {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
 adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  showPassword: boolean = false;

  constructor(
    public service: FarginServiceService,
    private dialog: MatDialog,
    private cryptoService:EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService
  ) { }
  ngOnInit(): void {

    this.myForm = new FormGroup({
      vendorName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(60),
      ]),

      vendorMobile: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[6-9]\\d{9}$')
      ]),

      vendorAddress: new FormControl('',),

      vendorGst: new FormControl('', [
        Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$'),
      ]),

      smsAmount: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?!0+(\\.0{1,2})?$)\\d+(\\.\\d{1,2})?$")]),

      userName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(60),
      ]),
      password: new FormControl('', [
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[\\w@$!%*?&]{8,}$')
      ]),
      token: new FormControl('',),
    });

    this.myForm.patchValue({
      vendorName: this.data?.value?.vendorName,
      vendorMobile: this.data?.value?.vendorMobile,
      vendorAddress: this.data?.value?.vendorAddress,
      vendorGst: this.data?.value?.vendorGst,
      smsAmount: this.data?.value?.smsAmount.toFixed(2),
      userName: this.data?.value?.userName,
      password: this.data?.value?.password,
      token: this.data?.value?.token
    })
  };

  get vendorName() {
    return this.myForm.get('vendorName');
  }
  get vendorMobile() {
    return this.myForm.get('vendorMobile');
  }
  get vendorAddress() {
    return this.myForm.get('vendorAddress');
  }
  get vendorGst() {
    return this.myForm.get('vendorGst');
  }
  get smsAmount() {
    return this.myForm.get('smsAmount');
  }
  get userName() {
    return this.myForm.get('userName');
  }
  get password() {
    return this.myForm.get('password');
  }
  get token() {
    return this.myForm.get('token');
  };

  togglePasswordVisibility(passwordInput: { type: string; }) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  Update() {
    let submitModel: VendorsUpdate = {
      vendorName: this.vendorName?.value,
      vendorMobile: this.vendorMobile?.value,
      vendorAddress: this.vendorAddress?.value,
      vendorGst: this.vendorGst?.value,
      smsAmount: this.smsAmount?.value,
      userName: this.userName?.value,
      password: this.password?.value,
      token: this.token?.value,
      modifiedBy: this.adminName
    }
    this.service.VendorsUpdate(this.data?.value?.vendorAdminId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toaster.error(res.responseMessage);
      }
    })
  }

}
