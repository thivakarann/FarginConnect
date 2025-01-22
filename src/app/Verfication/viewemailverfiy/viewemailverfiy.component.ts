import { Component, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OtpemailverfiyComponent } from '../otpemailverfiy/otpemailverfiy.component';
import { OtpmobileverifyComponent } from '../otpmobileverify/otpmobileverify.component';
import { Router } from '@angular/router';
import { Addonetime } from '../../fargin-model/fargin-model.module';
import { ProfileViewComponent } from '../../profile/profile-view/profile-view.component';


@Component({
  selector: 'app-viewemailverfiy',
  templateUrl: './viewemailverfiy.component.html',
  styleUrl: './viewemailverfiy.component.css'
})
export class ViewemailverfiyComponent {
  // email = localStorage.getItem('email') || '';
  // emailstatus = Number(localStorage.getItem('emailOtpVerificationStatus')) || '';
  // smsstatus =Number(localStorage.getItem('smsOtpVerificationstatus')) || '';
  // mobilenumber= localStorage.getItem('mobilenumber') || '';
  merchantId = localStorage.getItem('merchantId') || '';
  emailverfiy: any;
  errorMsg: any;
  showcategoryData: any;
  viewmerchant: any;
  technicalAmount = localStorage.getItem('technicalTotalAmount') || '';

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
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valueverification: any;
  valuemobileverify: any;
  valueonetime: any;
  roleName = localStorage.getItem('roleName')
  valuepayview: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }
  ngOnInit() {
    this.service.merchantbyids(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewmerchant = res.response;
      } else {
        this.errorMsg = res.responseMessage;
      }
    });
    this.service.merchantbyids(this.merchantId).subscribe((res: any) => {
      this.viewmerchant = res.response;
    });

    if (this.roleName == 'Merchant Super admin') {
      this.valueverification = 'Verification-Email';
      this.valueonetime = 'Verification-Pay';
      this.valuemobileverify = 'Verification-Mobile'
      this.valuepayview = 'Verification-View'
    }
    else
    {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions
  
              if (this.actions == 'Verification-Email') {
                this.valueverification = 'Verification-Email'
              }
              if (this.actions == 'Verification-Pay') {
                this.valueonetime = 'Verification-Pay'
              }
              if (this.actions == 'Verification-Mobile') {
                this.valuemobileverify = 'Verification-Mobile'
              }
              if (this.actions == 'Verification-View') {
                this.valuepayview = 'Verification-View'
              }
            }
          }
        
      })
    }
    

  }
  verfiy() {
    this.dialog.open(OtpemailverfiyComponent, {
      width: '90vw',
      maxWidth: '570px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose:true
    });
  }
  verfiys() {
    this.dialog.open(OtpmobileverifyComponent, {
      width: '90vw',
      maxWidth: '570px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose:true
    });
  }
  goback() {
    this.router.navigateByUrl('/dashboard/content')
  }
  open() {
    this.dialog.open(ProfileViewComponent, {
      disableClose: true,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
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
           
            });
            onload = function () {
              document
                .createElement('form')
                .submit.call(document.getElementById('FormType'));
            };
            const myTimeout = setTimeout(onload, 500);
          });
        });
      }
      else {
        this.toastr.warning(res.responseMessage);
        this.dialog.closeAll()
      }
    });
  }
}
