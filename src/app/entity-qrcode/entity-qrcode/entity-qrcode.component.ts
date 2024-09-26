import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';

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
  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location

  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
    });
  }
  qrLink(id: any) {
    this.MerchantView.EntityQrGenerate(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.qrCode = res.responseMessage;
        console.log(this.qrCode);
        this.toastr.success(res.responseMessage)
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
  close() {
    this.location.back();
  }

  viewQr(id:any){
    this.MerchantView.QRImageView(id).subscribe((res:any)=>{
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
      var downloadURL = URL.createObjectURL(res);
      window.open(downloadURL);
      }
    })
  }
}
