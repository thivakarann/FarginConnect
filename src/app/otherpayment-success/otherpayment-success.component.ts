import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-otherpayment-success',
  templateUrl: './otherpayment-success.component.html',
  styleUrl: './otherpayment-success.component.css'
})
export class OtherpaymentSuccessComponent {
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
      this.trackIds = params.trackId;
      
      
    });

    this.service.OtherPaymentSuccessPage(this.trackIds).subscribe((res: any) => {
      this.data = res.response;
    });
  }
  Returnurl() {
    this.router.navigateByUrl(`/login-page`);
  }
}

