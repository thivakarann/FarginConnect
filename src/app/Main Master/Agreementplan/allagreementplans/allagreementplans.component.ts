import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-allagreementplans',
  templateUrl: './allagreementplans.component.html',
  styleUrl: './allagreementplans.component.css'
})
export class AllagreementplansComponent {
  commercialId: any;
  viewbyagreement: any;
  constructor(private service: FarginServiceService, private location: Location, private toaster: ToastrService, private router: Router, private activaterouter: ActivatedRoute,) {
  }
  ngOnInit(): void {

    this.activaterouter.queryParams.subscribe((param: any) => {
      this.commercialId = param.Alldata;
    });

    this.service.viewbyidagreementplan(this.commercialId).subscribe((res: any) => {
      this.viewbyagreement = res.response;
    })

  }
  close() {
    this.location.back()
  }

}
