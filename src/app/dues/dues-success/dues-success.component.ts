import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-dues-success',
  templateUrl: './dues-success.component.html',
  styleUrl: './dues-success.component.css'
})
export class DuesSuccessComponent {
  payId: any;
  data: any;
  constructor(private activatedroute:ActivatedRoute,public service:FarginServiceService,private router:Router){
    this.activatedroute.queryParams.subscribe((params:any)=>{
          this.payId=params.payId
    })
  }


  ngOnInit(): void {
    this.service.getonetimesuccess(this.payId).subscribe((res:any)=>{
        this.data=res.response
    })
  }
  Returnurl() {
    this.router.navigateByUrl(`/dashboard/dues`);
  }
}
