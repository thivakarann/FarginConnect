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
    private cryptoService: EncyDecySericeService,
  ) {
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      businessCategoryId: new FormControl(''),
      stickerPerAmount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\\.[0-9]{1,2})?$|^[0]\\.[0-9]{1,2}$')]),
      deliveryDays: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      effectiveDate: new FormControl('', [Validators.required])
    });
  }

  get businessCategoryId() {
    return this.myForm.get('businessCategoryId')
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
      businessCategoryId: 1,
      costPerSticker: this.stickerPerAmount?.value,
      createdBy: this.adminName,
      deliveryDays: this.deliveryDays?.value,
      creatorRole: this.adminName,
      effectiveFrom: this.effectiveDate?.value
    }
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.StickerCreate(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    })
  }
}
