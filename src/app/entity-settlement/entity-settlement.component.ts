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
  valuesettlement: any;
  valuesettlementview: any;
  valuesettlementexport: any;
  errorMessage: any;
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
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  constructor(
    public MerchantView: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private Location: Location
  ) { }
  ngOnInit(): void {

    this.MerchantView.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuesettlementexport = 'Entity View Settlement-Export';
            this.valuesettlementview = 'Entity View Settlement-View'

          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Settlement-Export') {
                this.valuesettlementexport = 'Entity View Settlement-Export'
              }
              if (this.actions == 'Entity View Settlement-View') {
                this.valuesettlementview = 'Entity View Settlement-View'
              }

            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.MerchantView.EntityViewbyid(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.detaislone = res.response.merchantpersonal;
      this.accountid = res.response.merchantpersonal.accountId;
      
      this.postrenewal();
      // 

    })


  }

  reload(){
    window.location.reload()
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
    this.MerchantView.Entitysettlement(submitModel).subscribe((res: any) => {
      this.Viewall = JSON.parse(res?.response);
      this.viewdata = this.Viewall?.data?.content;
      this.dataSource = new MatTableDataSource(this.viewdata?.reverse())
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  viewpayout(id: any) {
    this.router.navigate([`/dashboard/settlement-view/${id}`], {
      queryParams: { value: id },
    });

  }

  close() {
    this.Location.back()
  }

}
