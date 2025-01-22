import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { AggrementLocationTwoTrackerComponent } from '../aggrement-location-two-tracker/aggrement-location-two-tracker.component';
import { AggrementSignerTwoOtpComponent } from '../aggrement-signer-two-otp/aggrement-signer-two-otp.component';

@Component({
  selector: 'app-aggrement-signer-two',
  templateUrl: './aggrement-signer-two.component.html',
  styleUrl: './aggrement-signer-two.component.css'
})
export class AggrementSignerTwoComponent implements OnInit {
  ReferenceCode: any;
  pdfurl1: any;
  Agreementdetails: any;
  AgreementId: any;
  EntityName: any;
  EntityNumber: any;
  EntityEmail: any;
  AdminSignedStatus: any;
  EntotySignedStatus: any;
  Adminsignerdetails: any;
  LocationStatus: any;
  AdminSignedDate: any;
  EntitySignedDate: any;
  Expirystatus: boolean = false;
  strings = "@";


  constructor(
    private activatedroute: ActivatedRoute,
    public service: FarginServiceService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {
    
    this.activatedroute.queryParams.subscribe((params: any) => {
      this.ReferenceCode = params.referenceCode;
      console.log(this.ReferenceCode);
    });
    
    this.service.AggrementViewbyrefferencenumber(this.ReferenceCode).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Expirystatus = false;
        this.Agreementdetails = res.response;
        this.AgreementId = res.response.agreementId;
        console.log(this.AgreementId)
        this.AdminSignedStatus = res.response.adminOtpStatus;
        this.EntotySignedStatus = res.response.merchanOtptStatus
        this.EntityName = res.response.merchantId.entityName;
        this.EntityNumber = res.response.merchantId.contactMobile;
        this.EntityEmail = res.response.merchantId.contactEmail;
        this.LocationStatus = res.response.merchantGetLocation;
        this.AdminSignedDate = res.response.adminVerifiedDate;
        this.EntitySignedDate = res.response.merchantVerifiedDate;
        console.log(this.LocationStatus);
        console.log(this.AdminSignedDate);
        console.log(this.EntitySignedDate);

       

        this.service.viewagreementdoucments(this.AgreementId, 1).subscribe((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            this.pdfurl1 = reader.result as string;
          }
        })

      }

      else if (res.flag == 2) {
        this.Expirystatus = true;
        console.log(this.Expirystatus)
      }



    });
  }


  ResendOTP() {
    this.service.AgreementSendOtp(this.ReferenceCode,1).subscribe((res: any) => {
    })
  }

  Locationaccess() {

    if (this.LocationStatus == false || this.EntotySignedStatus == 0) {
      this.dialog.open(AggrementLocationTwoTrackerComponent, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        data: {value: this.ReferenceCode,value2: this.EntityNumber}
      })
    }

    else if(this.LocationStatus == true || this.EntotySignedStatus == 1){
      this.Signer()
    }

    else  {
      this.dialog.closeAll()
    }

  }



  Signer() {
    this.ResendOTP();
    this.dialog.open(AggrementSignerTwoOtpComponent, {
    enterAnimationDuration: '500ms',
    exitAnimationDuration: '1000ms',
    disableClose: true,
    data: { value: this.ReferenceCode,value2: this.EntityNumber }
    })
  }


}
