import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustServiceService } from '../../Customer-service/cust-service.service';

@Component({
  selector: 'app-customer-verify-view',
  templateUrl: './customer-verify-view.component.html', 
  styleUrl: './customer-verify-view.component.css' 
}) 
export class CustomerVerifyViewComponent implements OnInit{
  Transactionhistory:any;
  MobileNumber:any;
  strings="@";
  currentYear:any;
 
  constructor(
    public service: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute
  ) { }
 
 
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
      
    });
 
 
   
  }
 
  Viewdata(id:any){
    this.router.navigate([`customer-transactionviews/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  Customerinfo(id:any){
    this.router.navigate([`customer-payments-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  Customerraise(id:any){
    this.router.navigate([`custickets-viewall/${id}`], {
      queryParams: { Alldata: id },
    });
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }


  Customersurvey(id:any){
    this.router.navigate([`customer-survey-view/${id}`], {
      queryParams: { Alldata: id },
    });
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }
 
 
  AdditionalPay(id:any){
    this.router.navigate([`Additional-pay/${id}`], {
      queryParams: { Alldata: id },  
    });
  }
 
  Additionaltransaction(id:any){
    this.router.navigate([`Additional-transactionhistory/${id}`], {
      queryParams: { Alldata: id },  
    });
  }
 
 
}



