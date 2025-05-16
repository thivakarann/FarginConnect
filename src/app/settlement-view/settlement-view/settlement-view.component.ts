import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../../service/fargin-service.service';
import { settlements } from '../../fargin-model/fargin-model.module';
import { Location } from '@angular/common';
@Component({
  selector: 'app-settlement-view',
  templateUrl: './settlement-view.component.html',
  styleUrl: './settlement-view.component.css'
})
export class SettlementViewComponent implements OnInit {
  Viewall: any;
  viewdata: any;
  accountId:any;
  currentPage: any = 1; // The current page number
  itemsPerPage = 5; //
 
  page: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
term: any;
payout:any;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
  private location:Location) { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe((param: any) => {
      this.accountId=param.id
      this.payout=param.id1

      
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
      payoutId:this.payout

    }

    this.service.entitySettleTransaction(submitModel).subscribe((res: any) => {
      
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.data?.content;
      
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.viewdata.filter = filterValue.trim().toLowerCase().toUpperCase();
    
  }
  reload()
  {
    this.postrenewal()
  }
  close()
  {
    this.location.back();
  }
}
