import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { KeysUpdate } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-keys-update',
  templateUrl: './keys-update.component.html',
  styleUrl: './keys-update.component.css'
})
export class KeysUpdateComponent {
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  myForm!: FormGroup;
  merchantId: any;
  approval: any;
  detaislone: any;
  selectedOption: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();


  constructor(private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.merchantId = this.data.value

    this.myForm = new FormGroup({
      accountId: new FormControl('', [Validators.required]),
      apikey: new FormControl('', [Validators.required]),
      secretkey: new FormControl('', [Validators.required]),
    })

    this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
      this.detaislone = res.response.merchantpersonal;
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
        this.toaster.error(res.responseMessage)
      }
    })
  }
}
