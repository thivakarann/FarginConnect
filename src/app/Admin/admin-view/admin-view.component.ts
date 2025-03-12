import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent {
  merchantAdminIds:any
  viewData: any;
  constructor(private service: FarginServiceService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
    
      
      this.merchantAdminIds = param.AdminUserId;
      
    })
    this.service.viewbymerchantadminId(this.merchantAdminIds).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewData = res.response;
        console.log(this.viewData);
        
      }
    })
  }
  close() {
    this.router.navigate([`/dashboard/view-admin`], {
      // queryParams: { blockId:  this.blockId},
    });
  }
}
