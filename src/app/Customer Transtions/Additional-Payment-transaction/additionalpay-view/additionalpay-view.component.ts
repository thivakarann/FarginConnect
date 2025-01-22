import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdditionaLTransactionhistoryComponent } from '../additional-transactionhistory/additiona-l-transactionhistory.component';
import { AdditinalFinalpayComponent } from '../additinal-finalpay/additinal-finalpay.component';
import { CustServiceService } from '../../../Customer-service/cust-service.service';

@Component({
  selector: 'app-additionalpay-view',
  templateUrl: './additionalpay-view.component.html',
  styleUrl: './additionalpay-view.component.css'
})
export class AdditionalpayViewComponent implements OnInit {
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

    this.PaymentsView.CustomerPaymentsdetail(this.MobileNumberss).subscribe((res: any) => {
      if (res.flag == 1) {
        this.DetailsView = res.response;

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
    this.router.navigate([`Additional-customerpay-info/${id}`], {
      queryParams: { Alldata: id },
    });

    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  PAYNOW(id1: any) {
    this.dialog.open(AdditinalFinalpayComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id1 }
    })
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
