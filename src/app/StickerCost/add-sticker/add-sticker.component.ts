import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { stickeradd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-add-sticker',
  templateUrl: './add-sticker.component.html',
  styleUrl: './add-sticker.component.css'
})
export class AddStickerComponent {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
 adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();
  minDate: string;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService:EncyDecySericeService,
  ) {
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      stickerPerAmount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\\.[0-9]{1,2})?$|^[0]\\.[0-9]{1,2}$')]),
      deliveryDays: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      effectiveDate: new FormControl('', [Validators.required])
    });
  }

  get stickerPerAmount() {
    return this.myForm.get('stickerPerAmount')
  }

  get deliveryDays() {
    return this.myForm.get('deliveryDays')
  }

  get effectiveDate() {
    return this.myForm.get('effectiveDate')
  }

  submit() {
    let submitModel: stickeradd = {
      stickerPerAmount: this.stickerPerAmount?.value,
      deliveryDays: this.deliveryDays?.value,
      createdBy: this.adminName,
      effectiveDate: this.effectiveDate?.value
    }
    this.service.StickerCreate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
