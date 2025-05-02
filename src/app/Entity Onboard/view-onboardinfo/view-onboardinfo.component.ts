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
  valueonboardadd: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: FarginServiceService) {

  }
  ngOnInit(): void {


    this.merchantId = this.data.value
    

    this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
      this.detaislone = res.response.merchantpersonal;
    })

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueonboardadd = 'Entity View-Onboard Information-Add'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View-Onboard Information-Add') {
                this.valueonboardadd = 'Entity View-Onboard Information-Add'
              }

            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })
  }
  editKeys(id: any) {
    const dialogRef =this.dialog.open(KeysUpdateComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",

      disableClose: true,
      data: {
        value: id,
      }
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });


  }
fetch()
{
  this.service.EntityViewbyid(this.merchantId).subscribe((res: any) => {
    this.detaislone = res.response.merchantpersonal;
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
