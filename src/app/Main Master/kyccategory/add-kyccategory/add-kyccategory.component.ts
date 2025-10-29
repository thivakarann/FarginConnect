import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { kycadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-add-kyccategory',
  templateUrl: './add-kyccategory.component.html',
  styleUrl: './add-kyccategory.component.css',
})
export class AddKyccategoryComponent {
  addkyccategory: any = FormGroup;
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private cryptoService:EncyDecySericeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.addkyccategory = new FormGroup({
      kycCategoryName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z&\\-\\(\\)#._/ ]+$'),
        Validators.maxLength(50),
      ]),
    });
  }

  get kycCategoryName() {
    return this.addkyccategory.get('kycCategoryName');
  }

  submit() {
    let submitModel: kycadd = {
      createdBy: this.adminName,
      kycCategoryName: this.kycCategoryName.value.trim(),
    };
    this.service.addkycCategory(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
