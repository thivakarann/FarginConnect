import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PgMakePayment } from '../../fargin-model/fargin-model.module';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFarginPolicyComponent } from '../customer-fargin-policy/customer-fargin-policy.component';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { FinalPaymentComponent } from '../final-payment/final-payment.component';

@Component({
  selector: 'app-customer-payments-view',
  templateUrl: './customer-payments-view.component.html',
  styleUrl: './customer-payments-view.component.css'
})
export class CustomerPaymentsViewComponent implements OnInit {
  strings = "@";
  currentYear: any;
  MobileNumberss: any;
  DetailsView: any;
  SecretKey: any;
  CustomerPayid: any;
  PaidAmount: any;
  MakePaymentdetails: any;
  Transid: any;
  OrderRefference: any;
  PaymentDetails: any;
  CustomerName: any;
  CustomerEmail: any;
  CustomerMobile: any;
  CustomerStreetName: any;
  Pincode: any;
  StateName: any;
  CityName: any;
  SecureHash: any;
  apikey: any;
  Message: any;
  viewData: boolean = false;
  customerpay: any;
  merchantId = localStorage.getItem('merchantId') || '';
  Termscondition: any = "Terms & conditions";
  Privacypolicy: any = "Privacy policy";
  RefundPolicy: any = "Refund Policy";
  Disclaimer: any = "Disclaimer";

  constructor(
    public PaymentsView: CustServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {




    this.currentYear = new Date().getFullYear();

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumberss = param.Alldata;

    });

    // this.PaymentsView.CustomerPaymentsList(this.MobileNumberss).subscribe((res: any) => {
    //   if (res.flag == 1) {
    //     this.DetailsView = res.response;
    //     this.DetailsView.forEach((item: { logoLink: string }) => {
    //       item.logoLink = this.converttohhttps(item.logoLink);
    //       

    //     });
    //     this.viewData = false;
    //     
    //   }
    //   else {
    //     this.viewData = true;
    //   }
    // });


    this.PaymentsView.CustomerPaymentsList(this.MobileNumberss).subscribe((res: any) => {
      if (res.flag == 1) {
        this.DetailsView = res.response;

        // Process each item in DetailsView
        this.DetailsView.forEach((item: { logoLink: string }) => {
          item.logoLink = this.convertToHttps(item.logoLink);

        });

        this.viewData = false; // Set viewData based on response

      } else {
        this.viewData = true; // Handle case where flag is not 1
      }
    });
  }


  convertToHttps(Url: string): string {
    if (!Url || Url.trim() === '') {
      return 'assets/images/default-logo.png'; // Default image path
    }
    return Url.replace('http:/', 'http://'); // Correct the URL format
  }



  Payments(id: any) {
    this.router.navigate([`customer-payments-info/${id}`], {
      queryParams: { Alldata: id },
    });
    setTimeout(() => {
      window.location.reload()
    }, 100);


  }
  PAYNOW(id1: any) {

    this.dialog.open(FinalPaymentComponent,{
    enterAnimationDuration: "500ms",
    exitAnimationDuration: "800ms",
    disableClose:true,
    data: { value: id1 }
      
    })

    // this.PaymentDetails = id1;
    // this.CustomerPayid = id1.customerPayId;
    // this.PaidAmount = id1.paidAmount;
    // this.apikey = id1.customerId.merchantId.apikey;
    // this.SecretKey = id1.customerId.merchantId.secretkey;
    // this.CustomerName = id1.customerId.customerName;
    // this.CustomerEmail = id1.customerId.emailAddress;
    // this.CustomerMobile = id1.customerId.mobileNumber;
    // this.CustomerStreetName = id1.customerId.streetName;
    // this.Pincode = id1.customerId.pincodeName;
    // this.CityName = id1.customerId.cityName;
    // this.StateName = id1.customerId.stateName;

    // let submitModel: PgMakePayment = {
    //   customerPayId: this.CustomerPayid,
    //   paidAmount: this.PaidAmount
    // }

    // this.PaymentsView.CustomerMakePayments(submitModel).subscribe((res: any) => {
    //   if (res.flag == 1) {
    //     this.Transid = res.transactionId;

    //     this.PaymentsView.CustomerPGCreateOrder(this.Transid).subscribe((res: any) => {
    //       if (res.response.flag == 1) {
    //         this.OrderRefference = res.response.orderReference;


    //         this.PaymentsView.CustomerPGinitiate(this.Transid).subscribe((res: any) => {
    //           this.SecureHash = res.response;

    //         });


    //         onload = function () {
    //           document
    //             .createElement('form')
    //             .submit.call(document.getElementById('FormType'));
    //         };
    //         const myTimeout = setTimeout(onload, 500);
    //       }
    //     });
    //   }

    // })
  }

  Back() {
    this.router.navigateByUrl('mobile-verfication');
  }

  click(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id }
    });
  }


  Terms(id: any, id1: any) {
    this.router.navigate([`customer-fargin-policy/${id}`], {
      queryParams: { Alldata: id, title: id1 },
    });
  }


}
