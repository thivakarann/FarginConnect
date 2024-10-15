import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-info',
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.css'
})
export class KycInfoComponent {
  details: any;
  detaislone: any;
  approval1: any;
  bankdetails: any;
  KYCDetails: any;
  businessCategoryId: any;
  ResponseId: any;
  bankverifyres: any;
  Docname: any;
  message: any;
  showData!: boolean;
  kycres: any;
  jsonResponse: any;
  fullName: any;
  category: any;
  panNumber: any;
  referenceId: any;
  status: any;
  responseTime: any;
  Response: any
  constructor(private service: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router
  ) { }
  ngOnInit(): void {
 
    this.Response = this.data.value;
    console.log(this.Response);
 
    this.ResponseId = this.data.value.identityKycId || this.data.value.addressKycId || this.data.value.signatureKycId
 
 
    this.service.facheckgetbyId(this.ResponseId).subscribe((res: any) => {
      console.log(res);
 
      if (res.statusCode == 200) {
        this.kycres = res.response.response;
        this.jsonResponse = JSON.parse(this.kycres)
        this.fullName = this.jsonResponse.validated_data.full_name;
        this.category = this.jsonResponse.validated_data.category;
        this.panNumber = this.jsonResponse.validated_data.pan_number;
        this.referenceId = this.jsonResponse.reference_id;
        this.status = this.jsonResponse.status;
        this.message = this.jsonResponse.messsage; // Note: "messsage" has a typo
        this.responseTime = this.jsonResponse.response_time;
        console.log(this.jsonResponse)
      }
    })
  }
}
