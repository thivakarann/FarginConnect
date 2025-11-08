import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Updatesigner } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-signer-update',
  templateUrl: './signer-update.component.html',
  styleUrl: './signer-update.component.css'
})
export class SignerUpdateComponent implements OnInit {
  MyForm!: FormGroup;
  @Output() singerDetailsUpdated = new EventEmitter<void>();
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  Id: any;
  Name: any;
  Email: any;
  Number: any;

  constructor(private service: FarginServiceService, private toaster: ToastrService, private router: Router, private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.MyForm = new FormGroup({
      signAdminName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),

      signAdminEmail: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ]),

      signAdminMobile: new FormControl('', [
        Validators.maxLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),

      adminPosition: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]{1,50}$/),
      ]),

      adminCountry: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),

      adminPincode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")

      ]),

      adminState: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),

      adminCity: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),

      adminAddress: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });

    this.MyForm.patchValue({
      signId: this.data.value.signId,
      signAdminEmail: this.data.value.signAdminEmail,
      signAdminMobile: this.data.value.signAdminMobile,
      signAdminName: this.data.value.signAdminName,
      adminPosition: this.data.value.adminPosition,
      adminCountry: this.data.value.adminCountry,
      adminAddress: this.data.value.adminAddress,
      adminPincode: this.data.value.adminPincode,
      adminCity: this.data.value.adminCity,
      adminState: this.data.value.adminState
    });

  }

  get signAdminName() {
    return this.MyForm.get('signAdminName');
  }

  get signAdminEmail() {
    return this.MyForm.get('signAdminEmail');
  }

  get signAdminMobile() {
    return this.MyForm.get('signAdminMobile');
  }

  get adminPosition() {
    return this.MyForm.get('adminPosition');
  }

  get adminCountry() {
    return this.MyForm.get('adminCountry');
  }

  get adminState() {
    return this.MyForm.get('adminState');
  }

  get adminPincode() {
    return this.MyForm.get('adminPincode');
  }

  get adminAddress() {
    return this.MyForm.get('adminAddress');
  }

  get adminCity() {
    return this.MyForm.get('adminCity');
  }

  get signId() {
    return this.MyForm.get('signId');
  }

  submit() {
    let submitModel: Updatesigner = {
      signId: this.data.value.signId,
      signAdminEmail: this.signAdminEmail?.value,
      signAdminMobile: this.signAdminMobile?.value,
      signAdminName: this.signAdminName?.value,
      adminPosition: this.adminPosition?.value,
      modifiedBy: this.adminName,
      adminCountry: this.adminCountry?.value,
      adminState: this.adminState?.value,
      adminPincode: this.adminPincode?.value,
      adminAddress: this.adminAddress?.value,
      adminCity: this.adminCity?.value
    }

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }

    this.service.signerupdate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toaster.success(res.messageDescription);
        this.dialog.closeAll();
        setTimeout(() => { window.location.reload() }, 500);
      }
      else {
        this.toaster.error(res.messageDescription);

      }
    })
  }






}
