import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Addfacheckkey } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-addfacheckkey',
  templateUrl: './addfacheckkey.component.html',
  styleUrl: './addfacheckkey.component.css',
})
export class AddfacheckkeyComponent {
  facheckkeyFormGroup: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  facheckkey: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private cryptoService: EncyDecySericeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

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
    let submitModel: Addfacheckkey = {
      apiKey: this.apiKey.value.trim(),
      secretKey: this.secretKey?.value.trim(),
      applicationId: this.applicationId?.value,
      mode: this.mode?.value,
      createdBy: this.adminName,
    };
    this.service.addfacheck(submitModel).subscribe((res: any) => {
      this.facheckkey = res.response;
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
