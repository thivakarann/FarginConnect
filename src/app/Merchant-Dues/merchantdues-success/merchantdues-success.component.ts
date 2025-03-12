import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-merchantdues-success',
  templateUrl: './merchantdues-success.component.html',
  styleUrl: './merchantdues-success.component.css'
})
export class MerchantduesSuccessComponent {

  payNumber: any;
  PaymentDetails: any;
  payId: any;
  constructor(
    private activerouter: ActivatedRoute,
    public Paymentsucess: FarginServiceService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.activerouter.queryParams.subscribe((param: any) => {
      this.payId = param.payId;


      this.Paymentsucess.Transactiondues(this.payId).subscribe((res: any) => {
        this.PaymentDetails = res.response
      });
    });
  }

  Home() {
    this.router.navigateByUrl('dashboard/content')
  }
}