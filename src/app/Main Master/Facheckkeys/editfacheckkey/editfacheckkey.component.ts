import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Updatefacheckkey } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-editfacheckkey',
  templateUrl: './editfacheckkey.component.html',
  styleUrl: './editfacheckkey.component.css',
})
export class EditfacheckkeyComponent {
  facheckkeyFormGroup: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  facheckkey: any;
  facheckKeyId: any;
  apikeys: any;
  secretKeys: any;
  applicationIds: any;
  modes: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { this.facheckKeyId = data.value.facheckKeyId; }

  ngOnInit(): void {
    this.facheckkeyFormGroup = new FormGroup({
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      applicationId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9&\\-\\(\\)#._/]+$'),
      ]),
      mode: new FormControl('', [Validators.required]),
    });

    if (this.data && this.data.value) {
      this.facheckkeyFormGroup.patchValue({
        apiKey: this.data.value.apiKey,
        secretKey: this.data.value.secretKey,
        applicationId: this.data.value.applicationId,
        mode: this.data.value.mode,
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
      modifiedBy: this.adminName,
    };
    this.service.updatefacheck(this.facheckKeyId, submitModel).subscribe((res: any) => {
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
