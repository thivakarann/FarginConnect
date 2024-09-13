import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-entity-qrcode',
  templateUrl: './entity-qrcode.component.html',
  styleUrl: './entity-qrcode.component.css'
})
export class EntityQrcodeComponent  implements OnInit{
  id: any;
  qrCode: any;
  details: any;
  detaislone: any;
  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
  
    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;});
  }



  qrLink(id: any) {

    this.MerchantView.EntityQrGenerate(this.id).subscribe((res: any) => {
      this.qrCode = res.responseMessage;
      console.log(this.qrCode);
      if (res.responseMessage) {
        this.toastr.success('Link Generated Successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      else {
        this.toastr.error('Failed To Generate Link!')
      }
    })
  }
}
