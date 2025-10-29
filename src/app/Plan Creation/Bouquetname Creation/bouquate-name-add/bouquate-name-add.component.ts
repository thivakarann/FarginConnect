import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { addBouquetname } from '../../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-bouquate-name-add',
  templateUrl: './bouquate-name-add.component.html',
  styleUrl: './bouquate-name-add.component.css',
})
export class BouquateNameAddComponent implements OnInit {
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
 adminId: any = this.cryptoService.decrypt(sessionStorage.getItem('Two') || '');

  myForm!: FormGroup;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public Broadcasternameadd: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
    let submitModel: addBouquetname = {
      broardCaste: this.broardCaste?.value.trim(),
      createdBy: this.adminName,
    };
    this.Broadcasternameadd.BouquetAdd(submitModel).subscribe((res: any) => {
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
