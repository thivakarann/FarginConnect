import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QrCodecreation } from '../../fargin-model/fargin-model.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-qrcreation',
  templateUrl: './qrcreation.component.html',
  styleUrl: './qrcreation.component.css'
})
export class QRcreationComponent implements OnInit {
  myForm!: FormGroup;
  myForm2!: FormGroup;
  viewForm: any = false
  URLName: any;
  Entityurlname: any;
  EntityURLLink: any;
  ViewURL: boolean = false;
  Check: any;
  ADD: boolean = false;
  merchantid: any;
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  QRdetaisl: any;

  constructor(
    public QRcreation: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {

    this.merchantid = this.data.value

    this.myForm = new FormGroup({
      QRName: new FormControl(null, Validators.required),
    });
  };



  // showToggle() {
  //   this.viewForm = !this.viewForm;
  // }

  selectss(id: any) {
    this.ADD = id
    
  }

  // First Form

  get QRName() {
    return this.myForm.get('QRName')
  }

  Submit() {


    this.URLName = this.QRName?.value;
    

    this.QRcreation.QRCreateurl(this.URLName).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.Entityurlname = res.response.referenceNo;
        this.EntityURLLink = res.response.link;
        this.ViewURL = true;
        
        
      }

      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.ViewURL = false;

      }


    })





  }

  GenerateQr() {
    let submitmodel: QrCodecreation = {
      merchantId: this.merchantid,
      qrReference: this.Entityurlname,
      qrGenerateLink: this.EntityURLLink,
      qrCreatedBy: this.getadminname
    }
    this.QRcreation.QRURLcreation(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        setTimeout(() => {
          window.location.reload()
        }, 500);


        this.QRdetaisl = res.response;
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    })
  }
}
