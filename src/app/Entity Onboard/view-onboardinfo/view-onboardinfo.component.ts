import { Component, Inject, OnInit } from '@angular/core';
import { KeysUpdateComponent } from '../keys-update/keys-update.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-view-onboardinfo',
  templateUrl: './view-onboardinfo.component.html',
  styleUrl: './view-onboardinfo.component.css'
})
export class ViewOnboardinfoComponent implements OnInit {
  merchantId: any;
  detaislone: any;
  copySuccess: boolean = false;
  copySuccesss: boolean = false;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService) {

  }
  ngOnInit(): void {


    this.merchantId = this.data.value
    console.log(this.merchantId);

    this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
      this.detaislone = res.response.merchantpersonal;
    })
  }
  editKeys(id: any) {
    this.dialog.open(KeysUpdateComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",

      disableClose: true,
      data: {
        value: id,
      }
    })

  }

  copyText(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccess = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }

  copyText1(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copySuccesss = true;
    setTimeout(() => this.copySuccess = false, 2000);
  }
}
