import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { AgreementConsent, AgreementlocationTracker } from '../fargin-model/fargin-model.module';
import { AggrementSignerOtpComponent } from '../aggrement-signer-otp/aggrement-signer-otp.component';

@Component({
  selector: 'app-aggrement-location-tracker',
  templateUrl: './aggrement-location-tracker.component.html',
  styleUrl: './aggrement-location-tracker.component.css'
})
export class AggrementLocationTrackerComponent {
  RefferenceCode: any;
  Flag: any;
  Consent: any;
  details: any;
  Location: any;
  ipAddress!: string;
  geoDetails: any;
  LocationCountry: any;
  LocationCountrycode: any;
  LocationRegion: any;
  LocationCity: any
  Locationlatitude: any;
  Locationlongitude: any;
  LocationCountryphone: any;
  Locationtimezone: any;
  mobilenumber: any;
  SignedTime: any;
  LocationRegionCode: any;
  locationforlatlong: any;


  constructor(
    public Service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    this.RefferenceCode = this.data.value;
    this.mobilenumber = this.data.value2;

    
     this.Service.getIpAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log("IPAdress" +this.ipAddress )
      this.getlocationbyid();
    });

    
  }

  Yes() {
    this.Flag = 2;
    this.Consent = true;
    this.Location = true;
    this.LocationAccess();
    this.FinalLocationAccess();
  }

  // No() {
  //   this.Flag = 0;
  //   this.Consent = false;
  //   this.Location = false;
  //   this.LocationAccess();
  //   this.FinalLocationAccess();
  // }


  getlocationbyid (){
    // let submitModel:getiplocation = {
    //   ip: this. ipAddress
    // }

    this.Service.getIpLocation(this.ipAddress).subscribe((res:any)=>{
      this.geoDetails = res;
      this.LocationCountry = res.country;
      this.LocationCountrycode = res.country;
      // this.LocationCountryphone = res.country_phone;
      // this.SignedTime = res.Current_Time;
      this.Locationtimezone = res.timezone;
      this.LocationRegion = res.region;
      this.LocationRegionCode = res.RegionCode
      this.LocationCity = res.city;
      this.locationforlatlong = res["loc"].split(",") 
       this.Locationlatitude = this.locationforlatlong[0]
       this.Locationlongitude = this.locationforlatlong[1]
      
      // this.Locationlatitude = res.Latitude;
      // this.Locationlongitude = res.Longitude;
      console.log("this.geoDetails" + this.geoDetails)
      console.log("this.LocationCountry" + this.LocationCountry)
      console.log("this.LocationCountrycode" + this.LocationCountrycode)
      console.log("this.LocationCountryphone" + this.LocationCountryphone)
      console.log("this.Locationtimezone" + this.Locationtimezone)
      console.log("this.LocationRegion" + this.LocationRegion)
      console.log("this.LocationRegionCode" + this.LocationRegionCode)
      console.log("this.LocationCity" + this.LocationCity)
      console.log("this.Locationlatitude" + this.Locationlatitude)
      console.log("this.Locationlongitude" + this.Locationlongitude)
      console.log("this.ipAddress" + this.ipAddress)
    })
  }






  LocationAccess() {
    let submitmodel: AgreementConsent = {
      referenceCode: this.RefferenceCode,
      flag: this.Flag,
      consent: this.Consent
    }

    this.Service.agreementConcent(submitmodel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = res.response;
        this.dialog.closeAll();
      }
      else {
        window.alert(res.responseMessage)
      }
    });
  }

  ResendOTP() {
    this.Service.AgreementSendOtp(this.RefferenceCode,2).subscribe((res: any) => {
    })
  }

  FinalLocationAccess() {
    let submitModel: AgreementlocationTracker = {
      referenceCode: this.RefferenceCode,
      flag: this.Flag,
      consent: this.Consent,
      getLocation: this.Location,
      ipAddress: this.ipAddress,
      locationStatus: true,
      publicIp: '',
      country: this.LocationCountry,
      city: this.LocationCity,
      zip: '',
      serviceProvider: '',
      timezone: this.Locationtimezone,
      region: this.LocationRegion,
      longitude: this.Locationlongitude,
      latitude: this.Locationlatitude,
      countryCode: this.LocationCountrycode,
      regionCode: '',
      autonomousSystemNumber: ''
    }

    this.Service.agreemntconcentlocation(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = res.response;
        this.dialog.closeAll();
        this.ResendOTP();
        this.dialog.open(AggrementSignerOtpComponent, {
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '1000ms',
          disableClose: true,
          data: { value: this.RefferenceCode, value2: this.mobilenumber }
        });
      }
      // else {
      //   window.alert(res.responseMessage)
      // }
    });
  }
}
