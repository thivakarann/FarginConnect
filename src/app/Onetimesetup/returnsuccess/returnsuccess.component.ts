import { Component } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-returnsuccess',
  templateUrl: './returnsuccess.component.html',
  styleUrl: './returnsuccess.component.css',
})
export class ReturnsuccessComponent {
  data: any;
  trackId: any;
  trackIds: any;
  constructor(
    private activatedroute: ActivatedRoute,
    public service: FarginServiceService,
    private router: Router
  ) { }

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
