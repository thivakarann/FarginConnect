import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-payment-success',
  templateUrl: './customer-payment-success.component.html',
  styleUrl: './customer-payment-success.component.css'
})
export class CustomerPaymentSuccessComponent implements OnInit {
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

      this.Paymentsucess.CustomerPaymentdetails(this.PayId).subscribe((res: any) => {
        this.PaymentDetails = res.response
      });
    });
  }

  // click(id:any) {
  //   this.router.navigate([`customer-payments-view/${id}`], {
  //   });
  // }

  click(id: any) {
    this.router.navigate([`customer-payments-view/${id}`], {
      queryParams: { Alldata: id }
    });
  }



}
