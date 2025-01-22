import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustServiceService } from '../../../Customer-service/cust-service.service';

@Component({
  selector: 'app-additional-customerpayinfo',
  templateUrl: './additional-customerpayinfo.component.html',
  styleUrl: './additional-customerpayinfo.component.css'
})
export class AdditionalCustomerpayinfoComponent implements OnInit {
  strings = "@";
  id: any;
  details: any;
  currentYear:any;

  constructor(
    public PaymentsViewss: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
      console.log(this.id)

    });

    this.PaymentsViewss.AdditionalPaymentcustomerview(this.id).subscribe((res: any) => {
      this.details = res.response
    });
  }


  click(id: any) {
    this.router.navigate([`Additional-pay/${id}`], {
      queryParams: { Alldata: id }
    });
  }

}
