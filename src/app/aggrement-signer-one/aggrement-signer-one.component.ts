import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';
import { AggrementSignerOtpComponent } from '../aggrement-signer-otp/aggrement-signer-otp.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AgreementConsent } from '../fargin-model/fargin-model.module';
import { AggrementLocationTrackerComponent } from '../aggrement-location-tracker/aggrement-location-tracker.component';


@Component({
  selector: 'app-aggrement-signer-one',
  templateUrl: './aggrement-signer-one.component.html',
  styleUrl: './aggrement-signer-one.component.css'
})
export class AggrementSignerOneComponent implements OnInit {
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
  AdminSignerName: any;
  AdminSignerEmail: any;
  AdminSignerMobile: any;
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
      console.log(this.ReferenceCode)
    });
    
    
    this.service.AggrementViewbyrefferencenumber(this.ReferenceCode).subscribe((res: any) => {

      if (res.flag == 1) {
        this.Expirystatus = false;
        this.Agreementdetails = res.response;
        this.AgreementId = res.response.agreementId;
        console.log(this.AgreementId);
        this.AdminSignedStatus = res.response.adminOtpStatus;
        this.EntotySignedStatus = res.response.merchanOtptStatus
        this.EntityName = res.response.merchantId.entityName;
        this.EntityNumber = res.response.merchantId.contactMobile;
        this.EntityEmail = res.response.merchantId.contactEmail;
        this.LocationStatus = res.response.adminGetLocation;
        this.AdminSignedDate = res.response.adminVerifiedDate;
        this.EntitySignedDate = res.response.merchantVerifiedDate;
        console.log(this.LocationStatus);
        console.log(this.AdminSignedDate);
        console.log(this.EntitySignedDate);

        this.Locationaccess()

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


    this.service.signerwithouttoken().subscribe((res: any) => {
      this.Adminsignerdetails = res.response[0];
      this.AdminSignerName = res.response[0].signAdminName;
      this.AdminSignerEmail = res.response[0].signAdminEmail;
      this.AdminSignerMobile = res.response[0].signAdminMobile
    });
  }




  Locationaccess() {

    if (this.LocationStatus == false) {
      this.dialog.open(AggrementLocationTrackerComponent, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        data: { value: this.ReferenceCode ,value2:this.EntityNumber }
      })
    }

    else {
      this.dialog.closeAll()
    }

  }

  ResendOTP() {
    this.service.AgreementSendOtp(this.ReferenceCode, 2).subscribe((res: any) => {
    })
  }

  Signer(id: any) {
    this.ResendOTP();
    this.dialog.open(AggrementSignerOtpComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id ,value2:this.EntityNumber}
    })
  }










}
