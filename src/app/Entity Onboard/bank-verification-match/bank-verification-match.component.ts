import { Component, Inject, OnInit } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-verification-match',
  templateUrl: './bank-verification-match.component.html',
  styleUrl: './bank-verification-match.component.css',
})
export class BankVerificationMatchComponent implements OnInit {
  Bankdetails: any;
  verid: any;
  bankverifyres: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.Bankdetails = this.data.value;
    this.verid = this.Bankdetails.bavId;

    this.service.BankVerificationResponse(this.verid).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.bankverifyres = res.response;
      }
    });
  }
}
