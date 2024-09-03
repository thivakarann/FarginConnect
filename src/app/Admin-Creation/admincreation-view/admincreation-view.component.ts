import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admincreation-view',
  templateUrl: './admincreation-view.component.html',
  styleUrl: './admincreation-view.component.css'
})
export class AdmincreationViewComponent implements OnInit {
  adminuserId: any;
  viewData: any;


  constructor(private service: FarginServiceService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.adminuserId = param.AdminUserId;
      console.log(this.adminuserId)
    })
    this.service.AdminView(this.adminuserId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewData = res.response;
      }
    })
  }


  close() {
    this.router.navigate([`/dashboard/admindetails`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
