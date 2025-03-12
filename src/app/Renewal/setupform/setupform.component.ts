import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-setupform',
  templateUrl: './setupform.component.html',
  styleUrl: './setupform.component.css'
})
export class SetupformComponent {
  hashkey: any;
  apikey: any;
  secretKey: any;
  addressLine1: any;
  contactMobile: any;
  contactEmail: any;
  city: any;
  zipcode: any;
  entityName: any;
  stateName: any;
  orderReference: any;
  address: any;
  billingAddress: any;
  constructor(public service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog, private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe((res: any) => {
      this.hashkey = res.hashkey
      this.apikey = res.apikey
      this.secretKey = res.secretKey
      this.orderReference = res.orderReference
      this.billingAddress = res.firstAddress
      this.entityName = res.typeName
      this.contactEmail = res.userEmail
      this.contactMobile = res.mobileNo
      this.zipcode = res.pincodeName
      this.city = res.cityName
      this.stateName = res.stateName

    });


  }

  ngOnInit(): void {
    onload = function () {
      document.createElement('form').submit.call(document.getElementById('FormType'));


    }

    const myTimeout = setTimeout(onload, 0);
    
  }
}
