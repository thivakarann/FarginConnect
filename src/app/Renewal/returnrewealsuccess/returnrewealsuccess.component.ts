import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-returnrewealsuccess',
  templateUrl: './returnrewealsuccess.component.html',
  styleUrl: './returnrewealsuccess.component.css'
})
export class ReturnrewealsuccessComponent {
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

    this.service.getonetimesuccess(this.trackIds).subscribe((res: any) => {
      this.data = res.response;
    });
  }
  Returnurl() {
    this.router.navigateByUrl(`dashboard/content`);
  }
}
