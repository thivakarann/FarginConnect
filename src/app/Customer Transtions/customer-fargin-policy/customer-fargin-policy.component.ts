import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-fargin-policy',
  templateUrl: './customer-fargin-policy.component.html',
  styleUrl: './customer-fargin-policy.component.css'
})
export class CustomerFarginPolicyComponent implements OnInit {
  merchantid: any;
  title: any;
  entitydetails: any;
  strings = "@";
  currentYear: any;




  constructor(
    public service: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog) { }
  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.merchantid = param.Alldata;
      this.title = param.title;



    });

    this.service.viewterm(this.merchantid).subscribe((res: any) => {
      if (res.flag == 1) {

        if (this.title == 'Terms & conditions') {
          this.entitydetails = res.response.EntityModel.termAndCondition;

        }
        else if (this.title == 'Privacy policy') {

          this.entitydetails = res.response.EntityModel.privacyPolicy;
        }
        else if (this.title == 'Refund Policy') {
          this.entitydetails = res.response.EntityModel.refundPolicy;

        }
        else if (this.title == 'Disclaimer') {
          this.entitydetails = res.response.EntityModel.disclaimer;
        }

        // .EntityModel.refundPolicy
      }
    });
  }





}
