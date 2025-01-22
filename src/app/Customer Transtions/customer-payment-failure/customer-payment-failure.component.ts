import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-payment-failure',
  templateUrl: './customer-payment-failure.component.html',
  styleUrl: './customer-payment-failure.component.css'
})
export class CustomerPaymentFailureComponent {
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


  click(id: any) {
    this.router.navigate([`customer-payments-view/${id}`], {
      queryParams: { Alldata: id }
    });
  }
}
