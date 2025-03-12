import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-returnrewealfailure',
  templateUrl: './returnrewealfailure.component.html',
  styleUrl: './returnrewealfailure.component.css'
})
export class ReturnrewealfailureComponent {
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

    this.service.getonetimesuccess(this.trackIds).subscribe((res: any) => {
      this.data = res.response;
    });
  }
  Returnurl() {
    this.router.navigateByUrl(`dashboard/content`);
 
 
  }
}
