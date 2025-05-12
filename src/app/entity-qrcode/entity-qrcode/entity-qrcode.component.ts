import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QRcreationComponent } from '../qrcreation/qrcreation.component';

@Component({
  selector: 'app-entity-qrcode',
  templateUrl: './entity-qrcode.component.html',
  styleUrl: './entity-qrcode.component.css'
})
export class EntityQrcodeComponent implements OnInit {
  id: any;
  qrCode: any;
  details: any;
  detaislone: any;
  qrgenerate: boolean = false;
  valueqrgenerator: any;
  valueqrview: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueqredit: any;

  constructor(
    public MerchantView: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueqrgenerator = 'Entity View QR-Generate';
            this.valueqrview = 'Entity View QR-View';
            this.valueqredit = 'Entity View QR-Edit'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View QR-Generate') {
                this.valueqrgenerator = 'Entity View QR-Generate'
              }
              if (this.actions == 'Entity View QR-View') {
                this.valueqrview = 'Entity View QR-View'
              }
              if (this.actions == 'Entity View QR-Edit') {
                this.valueqredit = 'Entity View QR-Edit'
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.Getall();

  };


  Getall() {
    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
    });
  }

  viewQr(id: any) {
    this.MerchantView.QRImageView(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  QRlink(id: any) {
    const dialogRef = this.dialog.open(QRcreationComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id }
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  close() {
    this.location.back();
  }



  // qrLink(id: any) {
  //   this.MerchantView.EntityQrGenerate(this.id).subscribe((res: any) => {
  //     if (res.flag == 1) {
  //       this.qrCode = res.responseMessage;
  //       
  //       this.toastr.success(res.responseMessage)

  //     }
  //     else {
  //       this.toastr.error(res.responseMessage)
  //     }
  //   })
  // }

}
