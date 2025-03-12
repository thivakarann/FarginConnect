import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-payments-info',
  templateUrl: './customer-payments-info.component.html', 
  styleUrl: './customer-payments-info.component.css'
})
export class CustomerPaymentsInfoComponent implements OnInit {
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
      
    });

    this.PaymentsViewss.CustomersinglePaymentDetails(this.id).subscribe((res: any) => {
      this.details = res.response
    });
  }


  click(id: any) {
    this.router.navigate([`customer-payments-view/${id}`], {
      queryParams: { Alldata: id }
    });
  }

  
    


}
