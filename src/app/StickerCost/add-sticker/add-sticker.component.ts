import { Component } from '@angular/core';
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
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  myForm!: FormGroup;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      stickerPerAmount: new FormControl('', [Validators.required]),
      deliveryDays: new FormControl('', [Validators.required]),
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
        this.dialog.closeAll();
       

      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
}
