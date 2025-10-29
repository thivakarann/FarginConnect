import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { pgsetupedit } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-pgsetup-edit',
  templateUrl: './pgsetup-edit.component.html',
  styleUrl: './pgsetup-edit.component.css'
})
export class PgsetupEditComponent implements OnInit {

  pgsetupformedit: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  facheckkey: any;
  pgModeId: any;
  apikeys: any;
  secretKeys: any;
  applicationIds: any;
  pgModes: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { this.pgModeId = data.value.pgModeId; }

  ngOnInit(): void {
    this.pgsetupformedit = new FormGroup({
      pgMode: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      apiKey: new FormControl('', [Validators.required]),
      modifiedBy: new FormControl(''),
    });
    this.apikeys = this.data.value.apiKey
    this.pgsetupformedit.controls['apiKey'].value = this.apikeys
    this.secretKeys = this.data.value.secretKey
    this.pgsetupformedit.controls['secretKey'].value = this.secretKeys
    this.pgModes = this.data.value.pgMode
    this.pgsetupformedit.controls['pgMode'].value = this.pgModes
  }
  get pgMode() {
    return this.pgsetupformedit.get('pgMode');
  }
  get secretKey() {
    return this.pgsetupformedit.get('secretKey');
  }
  get apiKey() {
    return this.pgsetupformedit.get('apiKey');
  }
  submit() {
    let submitModel: pgsetupedit = {
      pgMode: this.pgMode.value,
      secretKey: this.secretKey.value.trim(),
      apiKey: this.apiKey.value.trim(),
      modifiedBy: this.adminName
    }
    this.service.PgsetupUpdate(this.pgModeId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
