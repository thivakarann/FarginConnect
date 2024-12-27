import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { settlements } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-settlement-view',
  templateUrl: './settlement-view.component.html',
  styleUrl: './settlement-view.component.css'
})
export class SettlementViewComponent implements OnInit {
  Viewall: any;
  viewdata: any;
  accountId:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe((param: any) => {
      this.accountId=param.id
      
    })
    this.postrenewal()

  }

  postrenewal() {
    let submitModel: settlements = {
      pageNo: "",
      size: "",
      query: "",
      dateRange: "",
      status: "",
      accountId:this.accountId,
      payoutId:'217'

    }

    this.MerchantView.entitySettleTransaction(submitModel).subscribe((res: any) => {
      
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.data?.content;
      
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.viewdata.filter = filterValue.trim().toLowerCase().toUpperCase();
    
  }
}
