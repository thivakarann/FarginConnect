import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { QrCodecreation } from '../../fargin-model/fargin-model.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-qrcreation',
  templateUrl: './qrcreation.component.html',
  styleUrl: './qrcreation.component.css',
})
export class QRcreationComponent implements OnInit {
  myForm!: FormGroup;
  myForm2!: FormGroup;
  viewForm: any = false;
  URLName: any;
  Entityurlname: any;
  EntityURLLink: any;
  ViewURL: boolean = false;
  Check: any;
  ADD: boolean = false;
  merchantid: any;
 adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  QRdetaisl: any;
  isCreated: boolean = false;
  @Output() bankDetailsUpdated = new EventEmitter<void>();

  constructor(
    public QRcreation: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.merchantid = this.data.value;

    this.myForm = new FormGroup({
      QRName: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(?!-)(?!.*--)[a-zA-Z0-9-]{1,63}(?<!-)$/),
        Validators.pattern(/^(?!-)(?!.*--)(?=.*[a-zA-Z])[a-zA-Z0-9-]{1,63}(?<!-)$/)

      ])
    });
  }

  selectss(id: any) {
    this.ADD = id;
  }

  // First Form

  get QRName() {
    return this.myForm.get('QRName');
  }

  Submit() {
    this.URLName = this.QRName?.value;
    this.QRcreation.QRCreateurl(this.merchantid, this.URLName).subscribe(
      (res: any) => {
        if (res.flag == 1) {
          this.toastr.success(res.responseMessage);
          this.Entityurlname = res.response.referenceNo;
          this.EntityURLLink = res.response.link;
          this.ViewURL = true;
          this.isCreated = true;
        } else if (res.flag == 2) {
          this.toastr.error(res.responseMessage);
          this.ViewURL = false;
        }
      }
    );
  }

  GenerateQr() {
    let submitmodel: QrCodecreation = {
      merchantId: this.merchantid,
      qrReference: this.Entityurlname,
      qrGenerateLink: this.EntityURLLink,
      qrCreatedBy: this.adminName,
    };
    this.QRcreation.QRURLcreation(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.bankDetailsUpdated.emit();
        this.dialog.closeAll();
        this.QRdetaisl = res.response;
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
