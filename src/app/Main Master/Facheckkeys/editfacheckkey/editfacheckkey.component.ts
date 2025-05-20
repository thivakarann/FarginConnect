import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Updatefacheckkey } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-editfacheckkey',
  templateUrl: './editfacheckkey.component.html',
  styleUrl: './editfacheckkey.component.css'
})
export class EditfacheckkeyComponent {
  facheckkeyFormGroup: any = FormGroup;
  createdBy = JSON.parse(sessionStorage.getItem('adminname') || '');
  facheckkey: any;
  facheckKeyId: any;
  apikeys: any;
  secretKeys: any;
  applicationIds: any;
  modes: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,

  ) {
    this.facheckKeyId = data.value.facheckKeyId;
  }

  ngOnInit(): void {
    this.facheckkeyFormGroup = new FormGroup({
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      applicationId: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/]+$')]),
      mode: new FormControl('', [Validators.required]),
    });
    // this.apikeys=this.data.value.apiKey
    // this.facheckkeyFormGroup.controls['apikey'].value = this.apikeys


    // this.secretKeys=this.data.value.secretKey
    // this.facheckkeyFormGroup.controls['secretKey'].value = this.secretKeys

    // this.applicationIds=this.data.value.applicationId
    // this.facheckkeyFormGroup.controls['applicationId'].value = this.applicationIds

    // this.modes=this.data.value.mode
    // this.facheckkeyFormGroup.controls['mode'].value = this.modes

    if (this.data && this.data.value) {
      this.facheckkeyFormGroup.patchValue({
        apiKey: this.data.value.apiKey,
        secretKey: this.data.value.secretKey,
        applicationId: this.data.value.applicationId,
        mode: this.data.value.mode
      });
    } else {
      console.error('Data is not defined');
    }

  }

  get apiKey() {
    return this.facheckkeyFormGroup.get('apiKey');
  }
  get secretKey() {
    return this.facheckkeyFormGroup.get('secretKey');
  }
  get mode() {
    return this.facheckkeyFormGroup.get('mode');
  }
  get applicationId() {
    return this.facheckkeyFormGroup.get('applicationId');
  }

  submit() {

    let submitModel: Updatefacheckkey = {
      apiKey: this.apiKey.value.trim(),
      secretKey: this.secretKey?.value.trim(),
      applicationId: this.applicationId?.value,
      mode: this.mode?.value,
      modifiedBy: this.createdBy
    }

    this.service.updatefacheck(this.facheckKeyId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
      
      } else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
}
