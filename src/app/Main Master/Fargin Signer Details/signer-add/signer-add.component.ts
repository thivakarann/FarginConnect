import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Addsigner } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-signer-add',
  templateUrl: './signer-add.component.html',
  styleUrl: './signer-add.component.css',
})
export class SignerAddComponent {
  MyForm!: FormGroup;
  showPassword: boolean = false;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  activeRole: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }

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

  submit() {
    let submitModel: Addsigner = {
      signAdminEmail: this.signAdminEmail?.value.trim(),
      signAdminMobile: this.signAdminMobile?.value,
      signAdminName: this.signAdminName?.value.trim(),
      adminPosition: this.adminPosition?.value.trim(),
      createdBy: this.adminName,
      adminCountry: this.adminCountry?.value.trim(),
      adminState: this.adminState?.value.trim(),
      adminPincode: this.adminPincode?.value.trim(),
      adminAddress: this.adminAddress?.value.trim(),
      adminCity: this.adminCity?.value.trim()
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.signeradd(datamodal).subscribe((res: any) => {
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
