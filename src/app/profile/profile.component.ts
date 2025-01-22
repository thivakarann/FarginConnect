import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { Addonetime } from '../fargin-model/fargin-model.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  entityname = localStorage.getItem('entityname') || '';
  // mobilenumber =localStorage.getItem('mobilenumber') || '';
  email = localStorage.getItem('email') || '';  // address=localStorage.getItem('address')  || '';
  // city=localStorage.getItem('city')  || '';
  // pincode=localStorage.getItem('pincode')  || '';
  // stateName=localStorage.getItem('stateName')  || ''
  // technicalPayStatus=localStorage.getItem('technicalPayStatus') || '';
  technicalAmount = localStorage.getItem('technicalTotalAmount') || '';
  merchantId = localStorage.getItem('merchantId') || '';
  adminName = localStorage.getItem('adminName');
  mobilenumber = localStorage.getItem('mobilenumber') || '';
  address = localStorage.getItem('address') || '';
  logoLink = localStorage.getItem('logoLink') || ''
  apikey: any;
  pgModelID: any;
  orderRefernce: any;
  hashKey: any;
  secretKey: any;
  transactionId: any;
  entityName: any;
  contactEmail: any;
  contactMobile: any;
  zipcode: any;
  city: any;
  stateName: any;
  orderReference: any;
  billingAddress: any;
  viewmerchant: any;
  errorMsg: any;
  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private location:Location
  ) { }
  ngOnInit(): void {
    this.service.merchantbyids(this.merchantId).subscribe((res: any) => {
      
      this.viewmerchant = res.response;
      
    });
  }
  OnSubmit() {
    let submitModel: Addonetime = {
      merchantId: this.merchantId,
      paidAmount: this.technicalAmount,
    };
    this.service.addonetimes(submitModel).subscribe((res: any) => {
     
      
      this.transactionId = res.transactionId;
      this.entityName = res.response.Merchant.entityName;
      this.contactEmail = res.response.Merchant.contactEmail;
      this.contactMobile = res.response.Merchant.contactMobile;
      this.billingAddress = res.response.Merchant.billingAddress;
      this.city = res.response.Merchant.city;
      this.stateName = res.response.Merchant.stateName;
      this.zipcode = res.response.Merchant.zipcode;

      
      
      if (res.flag == 1) {
        this.service.pgmodes().subscribe((res: any) => {
          this.apikey = res.response.apiKey;
          this.pgModelID = res.response.pgModeId;
          
          this.service.getCreateCost(this.transactionId, this.pgModelID).subscribe((res: any) => {
            this.orderReference = res.response.orderReference;
            this.service.getinitateCost(this.transactionId, this.pgModelID).subscribe((res: any) => {
              this.hashKey = res.response;
              this.router.navigate(['/dashboard/setup'], {
                queryParams: {
                  hashkey: this.hashKey,
                  apikey: this.apikey,
                  secretKey: this.secretKey,
                  orderReference: this.orderReference,
                  firstAddress: this.billingAddress,
                  typeName: this.entityName,
                  userEmail: this.contactEmail,
                  mobileNo: this.contactMobile,
                  pincodeName: this.zipcode,
                  cityName: this.city,
                  stateName: this.stateName,
                },
              })
            });

          });
        });
      }
      else {
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }
    });
  }

  goback() {
    this.location.back();
  }

  viewQr(){
    this.service.QRImageView(this.merchantId).subscribe((res:any)=>{
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
      var downloadURL = URL.createObjectURL(res);
      window.open(downloadURL);
      }
    })
  }

  viewQrmessage(){
    this.toastr.error('QR not Generated')
  }

  viewreciept(id:any){    
   
    this.service.onetimepaymentinvoice(id).subscribe((res:any)=>{
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
      var downloadURL = URL.createObjectURL(res);
      window.open(downloadURL);
      }
    })
        }
}
