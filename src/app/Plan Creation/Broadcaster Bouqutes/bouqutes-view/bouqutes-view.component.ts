import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bouqutes-view',
  templateUrl: './bouqutes-view.component.html',
  styleUrl: './bouqutes-view.component.css'
})
export class BouqutesViewComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  id: any;
  details: any;

  constructor(
    public viewdetails: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    
    this.viewdetails.BroadcasterBoucatebyid(this.id).subscribe((res: any) => {
      this.details = res.response;
    });
  }

  close() {
    this.router.navigateByUrl('dashboard/bouquets-viewall');
  }
}
