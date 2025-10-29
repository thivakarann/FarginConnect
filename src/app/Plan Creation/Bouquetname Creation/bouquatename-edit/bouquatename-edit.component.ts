import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateBouquetname } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-bouquatename-edit',
  templateUrl: './bouquatename-edit.component.html',
  styleUrl: './bouquatename-edit.component.css',
})
export class BouquatenameEditComponent implements OnInit {
  boutuquename: any;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Boutqueedit: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.Boutqueedit.Bouquetnamebyid(this.data.value).subscribe((res: any) => {
      this.boutuquename = res.response.broadCasterName;
    });
    this.myForm = new FormGroup({
      broardCaste: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(100),
      ]),
    });
  }

  get broardCaste() {
    return this.myForm.get('broardCaste');
  }

  submit() {
    let submitModel: UpdateBouquetname = {
      broardCaste: this.broardCaste?.value.trim(),
      modifiedBy: this.adminName,
      bundleChannelId: this.data.value,
    };
    this.Boutqueedit.BouquetnameUpdate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.errorMessage);
      }
    });
  }
}
