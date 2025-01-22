import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-other-payments-success',
  templateUrl: './other-payments-success.component.html',
  styleUrl: './other-payments-success.component.css'
})
export class OtherPaymentsSuccessComponent {
  data: any;
  trackId: any;
  trackIds: any;
  constructor(
    private activatedroute: ActivatedRoute,
    public service: FarginServiceService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
  this.activatedroute.queryParams.subscribe((params: any) => {
      this.trackIds = params.payId;
      
      
    });
 
    this.service.OtherPaymentSuccessPage(this.trackIds).subscribe((res: any) => {
      this.data = res.response;
    });
  }
  Returnurl() {
    this.router.navigateByUrl(`dashboard/content`);
  }
}
