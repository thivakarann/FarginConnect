import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-returnfailure',
  templateUrl: './returnfailure.component.html',
  styleUrl: './returnfailure.component.css'
})
export class ReturnfailureComponent {
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
    this.router.navigateByUrl(`/admin/login`);
 
 
  }

}
