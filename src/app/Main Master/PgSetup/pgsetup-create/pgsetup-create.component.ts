import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { pgsetupadd } from '../../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';


@Component({
  selector: 'app-pgsetup-create',
  templateUrl: './pgsetup-create.component.html',
  styleUrl: './pgsetup-create.component.css'
})
export class PgsetupCreateComponent implements OnInit {
  pgsetupform: any = FormGroup;
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  facheckkey: any;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pgsetupform = new FormGroup({
      pgMode: new FormControl('', [Validators.required]),
      apiKey: new FormControl('', [Validators.required]),
      secretKey: new FormControl('', [Validators.required]),
      createdBy: new FormControl(''),
    });
  }
  get pgMode() {
    return this.pgsetupform.get('pgMode');
  }
  get apiKey() {
    return this.pgsetupform.get('apiKey');
  }
  get secretKey() {
    return this.pgsetupform.get('secretKey');
  }

  submit() {
    let submitModel: pgsetupadd = {
      pgMode: this.pgMode.value,
      secretKey: this.secretKey.value.trim(),
      apiKey: this.apiKey.value.trim(),
      createdby: this.adminName,
      creatorRole: this.adminName
    }
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Pgsetupcreate(datamodal).subscribe((res: any) => {
      this.facheckkey = res.response;
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.messageDescription)
      }
    })
  }
}
