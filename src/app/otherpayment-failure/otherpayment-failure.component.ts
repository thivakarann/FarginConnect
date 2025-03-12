import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';

@Component({
  selector: 'app-otherpayment-failure',
  templateUrl: './otherpayment-failure.component.html',
  styleUrl: './otherpayment-failure.component.css'
})
export class OtherpaymentFailureComponent {
  trackIds: any;
  data: any;
  constructor(private activatedroute: ActivatedRoute,
    public service: FarginServiceService,
    private router: Router)
  {
    
  }
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
