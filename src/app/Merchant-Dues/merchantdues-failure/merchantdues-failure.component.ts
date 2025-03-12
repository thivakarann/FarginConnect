import { Component } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchantdues-failure',
  templateUrl: './merchantdues-failure.component.html',
  styleUrl: './merchantdues-failure.component.css'
})
export class MerchantduesFailureComponent {

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

  Home(){
    this.router.navigateByUrl('dashboard/content')
  }
}
