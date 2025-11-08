import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-admin-privacypolicy',
  templateUrl: './admin-privacypolicy.component.html',
  styleUrl: './admin-privacypolicy.component.css',
})
export class AdminPrivacypolicyComponent implements OnInit {

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
