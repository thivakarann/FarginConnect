import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateBouquetname } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-bouquatename-edit',
  templateUrl: './bouquatename-edit.component.html',
  styleUrl: './bouquatename-edit.component.css',
})
export class BouquatenameEditComponent implements OnInit {
  boutuquename: any;
  getadminname = JSON.parse(sessionStorage.getItem('adminname') || '');
  Adminid = JSON.parse(sessionStorage.getItem('adminid') || '');
  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Boutqueedit: FarginServiceService,
    private toastr: ToastrService,
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
      modifiedBy: this.getadminname,
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
