import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SMSCostAdd, stickeradd } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-add-sticker',
  templateUrl: './add-sticker.component.html',
  styleUrl: './add-sticker.component.css'
})
export class AddStickerComponent  {
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      stickerPerAmount: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*(\\.[0-9]{1,2})?$|^[0]\\.[0-9]{1,2}$')]),
      deliveryDays: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$')]),
      createdBy: new FormControl('')
    });
  }

  get stickerPerAmount() {
    return this.myForm.get('stickerPerAmount')
  }

  get deliveryDays() {
    return this.myForm.get('deliveryDays')
  }

  submit() {
    let submitModel: stickeradd = {
      stickerPerAmount: this.stickerPerAmount?.value,
      deliveryDays: this.deliveryDays?.value,
      createdBy: this.getadminname
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
