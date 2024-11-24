import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { AgreementConsent, AgreementlocationTracker } from '../fargin-model/fargin-model.module';

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


  constructor(
    public Service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    this.RefferenceCode = this.data.value;
  }

  Yes() {
    this.Flag = 2;
    this.Consent = true;
    this.Location = true;
    this.LocationAccess();
    this.FinalLocationAccess();
  }

  No() {
    this.Flag = 0;
    this.Consent = false;
    this.Location = false;
    this.LocationAccess();
   this.FinalLocationAccess();
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

  FinalLocationAccess() {
    let submitModel: AgreementlocationTracker = {
      referenceCode: this.RefferenceCode,
      flag: this.Flag,
      consent: this.Consent,
      getLocation: this.Location
    }

    this.Service.agreemntconcentlocation(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = res.response;
        this.dialog.closeAll();
      }
      // else {
      //   window.alert(res.responseMessage)
      // }
    });
  }
}
