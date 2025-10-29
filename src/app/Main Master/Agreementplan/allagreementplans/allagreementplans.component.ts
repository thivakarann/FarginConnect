import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-allagreementplans',
  templateUrl: './allagreementplans.component.html',
  styleUrl: './allagreementplans.component.css',
})
export class AllagreementplansComponent {
  commercialId: any;
  viewbyagreement: any;

  constructor(
    private service: FarginServiceService,
    private location: Location,
    private activaterouter: ActivatedRoute
  ) { }
  ngOnInit(): void {

    this.activaterouter.queryParams.subscribe((param: any) => {
      this.commercialId = param.Alldata;
    });

    this.service.viewbyidagreementplan(this.commercialId).subscribe((res: any) => {
      this.viewbyagreement = res.response;
    });
  }
  close() {
    this.location.back();
  }
}
