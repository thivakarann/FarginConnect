import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-admincreation-view',
  templateUrl: './admincreation-view.component.html',
  styleUrl: './admincreation-view.component.css',
})
export class AdmincreationViewComponent implements OnInit {
  adminuserId: any;
  viewData: any;

  constructor(
    private service: FarginServiceService,
    private activeRouter: ActivatedRoute,
    private cryptoService: EncyDecySericeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((param: any) => {
      this.adminuserId = param.AdminUserId;
    });

    this.Details();

  }

  Details() {
    const payload = {
      userId: this.adminuserId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.AdminView(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewData = JSON.parse(this.cryptoService.decrypt(res.data));;
      }
    });
  }

  close() {
    this.router.navigate([`/dashboard/admindetails`], {
    });
  }
}
