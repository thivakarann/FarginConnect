import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { settlement } from '../fargin-model/fargin-model.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-settlement',
  templateUrl: './entity-settlement.component.html',
  styleUrl: './entity-settlement.component.css'
})
export class EntitySettlementComponent {
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  exportexcel() {
    throw new Error('Method not implemented.');
  }
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'settlementId',
    'payoutId',
    'amount',
    'reference',
    'txnItem',
    'createdAt',
    'View',

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;

  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private Location:Location
  ) { }
  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.accountid = res.response.merchantpersonal.accountId;
      console.log(this.accountid);
      this.postrenewal();
      // console.log(this.details);

    })
  }


  postrenewal() {
    let submitModel: settlement = {
      accountId: this.accountid,
      pageNo: "",
      size: "",
      query: "",
      dateRange: "",
      status: "",
    }
    console.log(submitModel);

    this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
      console.log(res);
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.data?.content;
      this.dataSource = new MatTableDataSource(this.viewdata?.reverse())
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      console.log(this.viewdata);
    })
  }

  viewpayout(id: any) {
    console.log(id);
    this.router.navigate([`/dashboard/settlement-view/${id}`], {
      queryParams: { value: id },
    });

  }

  close(){
    this.Location.back()
   }
    
}
