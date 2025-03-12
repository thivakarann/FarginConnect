import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustServiceService } from '../../../Customer-service/cust-service.service';
import { additonalpay } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-additinal-finalpay',
  templateUrl: './additinal-finalpay.component.html',
  styleUrl: './additinal-finalpay.component.css'
})
export class AdditinalFinalpayComponent implements OnInit {
  alldetails: any;
  Button: boolean = false;
  CustomerPayid: any;
  PaidAmount: any;
  apikey: any;
  SecretKey: any;
  CustomerName: any;
  CustomerEmail: any;
  CustomerMobile: any;
  CustomerStreetName: any;
  Pincode: any;
  CityName: any;
  StateName: any;
  Transid: any;
  OrderRefference: any;
  SecureHash: any;
  MerchantName: any;
  branchstatus: any;
  Branchid: any;




  constructor(
    public PaymentsView: CustServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {





    this.alldetails = this.data.value;
    this.CustomerPayid = this.alldetails.customerpaymentId;
    this.PaidAmount = this.alldetails.paidAmount;
    this.MerchantName = this.alldetails.customerId.merchantId.merchantLegalName
    this.CustomerName = this.alldetails.customerId.customerName;
    this.CustomerEmail = this.alldetails.customerId.merchantId.contactEmail;
    this.CustomerMobile = this.alldetails.customerId.mobileNumber;
    this.CustomerStreetName = this.alldetails.customerId.streetName;
    this.Pincode = this.alldetails.customerId.pincodeName;
    this.CityName = this.alldetails.customerId.cityName;
    this.StateName = this.alldetails.customerId.stateName;
    this.branchstatus = this.alldetails.customerId.branchStatus;
    this.Branchid = this.alldetails.customerId.branchId;

    if (this.branchstatus == "Yes" && this.Branchid != null) {
      this.apikey = this.alldetails.customerId.branchId.apiKey;
      this.SecretKey = this.alldetails.customerId.branchId.secretKey;

    }

    else {
      this.apikey = this.alldetails.customerId.merchantId.apikey;
      this.SecretKey = this.alldetails.customerId.merchantId.secretkey;
    }

    console.log("this.alldetails" + this.alldetails)
    console.log("this.CustomerPayid" + this.CustomerPayid)
    console.log("this.apikey" + this.apikey)
    console.log("this.SecretKey" + this.SecretKey)
    console.log("this.CustomerName" + this.CustomerName)
    console.log("this.CustomerEmail" + this.CustomerEmail)
    console.log("this.CustomerMobile" + this.CustomerMobile)
    console.log("this.CustomerStreetName" + this.CustomerStreetName)
    console.log("this.Pincode" + this.Pincode)
    console.log("this.CityName" + this.CityName)
    console.log("this.StateName" + this.StateName)
    console.log("this.MerchantName" + this.MerchantName)
    console.log("this.branchstatus" + this.branchstatus)
    console.log("this.Branchid" + this.Branchid)

  }



  select(button: any) {
    this.Button;
  }


  Paynow() {

    let submitModel: additonalpay = {
      payId: this.CustomerPayid
    }

    this.PaymentsView.AdditionalPaymentMakepayment(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Transid = res.transactionId;
        console.log(" this.Transid" + this.Transid)

        this.PaymentsView.AdditionalPaymentCreateOrder(this.Transid).subscribe((res: any) => {
          if (res.response.flag == 1) {
            this.OrderRefference = res.response.orderReference;
            console.log(" this.OrderRefference" + this.OrderRefference)

            this.PaymentsView.AdditionalPaymentInitiate(this.Transid).subscribe((res: any) => {
              this.SecureHash = res.response;
              console.log("this.SecureHash" + this.SecureHash)
              this.dialog.closeAll();

            });


            onload = function () {
              document
                .createElement('form')
                .submit.call(document.getElementById('FormType'));
            };
            const myTimeout = setTimeout(onload, 500);
          }
        });
      }

    })
  }

}
