import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pgsetupedit, Updatefacheckkey } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-pgsetup-edit',
  templateUrl: './pgsetup-edit.component.html',
  styleUrl: './pgsetup-edit.component.css'
})
export class PgsetupEditComponent implements OnInit {

  pgsetupformedit: any = FormGroup;
  createdBy = JSON.parse(localStorage.getItem('adminname') || '');
  facheckkey: any;
  pgModeId: any;
  apikeys: any;
  secretKeys: any;
  applicationIds: any;
  pgModes: any;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,

  ) {
    this.pgModeId = data.value.pgModeId;
  }

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

    // if (this.data && this.data.value) {
    //   this.pgsetupformedit.patchValue({
    //     apiKey: this.data.value.apiKey,
    //     secretKey: this.data.value.secretKey,
    //     applicationId: this.data.value.applicationId,
    //     mode: this.data.value.mode
    //   });
    // } else {
    //   console.error('Data is not defined');
    // }

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
      secretKey: this.secretKey.value,
      apiKey: this.apiKey.value,
      modifiedBy: this.createdBy
    }

    this.service.PgsetupUpdate(this.pgModeId, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        window.location.reload()
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
