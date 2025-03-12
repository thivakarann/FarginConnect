import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-plan-details',
  templateUrl: './profile-plan-details.component.html',
  styleUrl: './profile-plan-details.component.css'
})
export class ProfilePlanDetailsComponent implements OnInit{

  merchantId = localStorage.getItem('merchantId') || '';
  profileview:any;

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
      this.profileview = res.response.merchantpersonal.merchantPlanModel;

      
    });
  }


}
