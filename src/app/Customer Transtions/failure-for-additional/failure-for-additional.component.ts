import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-failure-for-additional',
  templateUrl: './failure-for-additional.component.html',
  styleUrl: './failure-for-additional.component.css'
})
export class FailureForAdditionalComponent implements OnInit{

    PayId: any;
    PaymentDetails: any;
    constructor(
      private activerouter: ActivatedRoute,
      public Paymentsucess: CustServiceService,
      private router: Router
    ) { }
    ngOnInit(): void {
   
      this.activerouter.queryParams.subscribe((param: any) => {
        this.PayId = param.payId;
   
        this.Paymentsucess.AdditionalPaymentsuccessfail(this.PayId).subscribe((res: any) => {
          this.PaymentDetails = res.response
        });
      });
    }
   
   
    click(id: any) {
      this.router.navigate([`Additional-pay/${id}`], {
        queryParams: { Alldata: id }
      });
    }
  }
 

