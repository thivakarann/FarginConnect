import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-admin-disclaimer',
  templateUrl: './admin-disclaimer.component.html',
  styleUrl: './admin-disclaimer.component.css',
})
export class AdminDisclaimerComponent implements OnInit {

  businesscategory: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.service.Policiesgetbyid(this.data.value).subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategory = res.response;
      }
    });
  }
}
