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

  // viewQr(id: any) {
  //   this.MerchantView.QRImageView(id).subscribe((res: any) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(res);
  //     reader.onloadend = () => {
  //       var downloadURL = URL.createObjectURL(res);
  //       window.open(downloadURL);
  //     }
  //   })
  // }

  viewQr(id: any, id2: any) {
    this.MerchantView.QRImageView(id).subscribe((res: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;

        // Create HTML content with the image and download link
        const htmlContent = `
        <html>
          <body style="margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
            <img src="${dataUrl}" style="max-width: 100%; max-height: 80vh; object-fit: contain;" />
            <a 
              href="${dataUrl}" 
              download="${id2}.QR.Image.jpg" 
              style="margin-top: 20px; padding: 10px 20px; background: #2196F3; color: white; text-decoration: none; border-radius: 5px;"
            >
              Download QR Code
            </a>
          </body>
        </html>
      `;

        // Create a Blob and open it as a URL
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl); // Image persists even on refresh
      };
      reader.readAsDataURL(res);
    });
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
