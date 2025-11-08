import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { ToastrService } from 'ngx-toastr';
import { stickeredit } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-edit-sticker',
  templateUrl: './edit-sticker.component.html',
  styleUrl: './edit-sticker.component.css'
})
export class EditStickerComponent implements OnInit {
  @Output() stickerDetailsUpdated = new EventEmitter<void>();
  businessCategoryId: any;
  editmyForm: any = FormGroup;
  minDate: string;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0];
  }


  ngOnInit(): void {
    this.editmyForm = this.fb.group({
      businessCategoryId: new FormControl(''),
      stickerPerAmount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*(\\.[0-9]{1,2})?$|^[0]\\.[0-9]{1,2}$')]),
      deliveryDays: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      effectiveDate: new FormControl('', [Validators.required])
    });

    this.editmyForm.patchValue({
      stickerId: this.data?.value.stickerId,
      stickerPerAmount: this.data?.value.costPerSticker.toFixed(2),
      deliveryDays: this.data?.value.deliveryDays,
      effectiveDate: this.data?.value.effectiveFrom
    })
  }



  get stickerPerAmount() {
    return this.editmyForm.get('stickerPerAmount')
  }

  get deliveryDays() {
    return this.editmyForm.get('deliveryDays')
  }

  get effectiveDate() {
    return this.editmyForm.get('effectiveDate')
  }

  Update() {
    let submitModel: stickeredit = {
      businessCategoryId: 2,
      costPerSticker: this.stickerPerAmount?.value,
      modifiedBy: this.adminName,
      deliveryDays: this.deliveryDays?.value,
      modifierRole: this.adminName,
      effectiveFrom: this.effectiveDate?.value,
      stickerId: this.data?.value.stickerId
    }
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Stickeredit(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.stickerDetailsUpdated.emit();
        this.dialog.closeAll();
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    })

  }



}
