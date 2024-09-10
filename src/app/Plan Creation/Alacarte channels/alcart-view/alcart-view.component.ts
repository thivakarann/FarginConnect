import { Component, OnInit } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AlcartLogoViewComponent } from '../alcart-logo-view/alcart-logo-view.component';

@Component({
  selector: 'app-alcart-view',
  templateUrl: './alcart-view.component.html',
  styleUrl: './alcart-view.component.css',
})
export class AlcartViewComponent implements OnInit {
  getadminname = JSON.parse(localStorage.getItem('adminname') || '');
  Adminid = JSON.parse(localStorage.getItem('adminid') || '');
  id: any;
  regiondetails: any;
  alcardsdetails: any;
  regionname: any;
  ChennelName: any;
  BroadCaster: any;
  Generic: any;
  Language: any;
  Type: any;
  amount: any;

  constructor(
    public AlcartView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.AlcartView.Alcardviewbyid(this.id).subscribe((res: any) => {
      this.alcardsdetails = res.response;
    });
  }


  Viewimage(id: any) {
    this.dialog.open(AlcartLogoViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: { value: id }

    })
  }


  close() {
    this.router.navigateByUrl('dashboard/alacarte-viewall');
  }
}