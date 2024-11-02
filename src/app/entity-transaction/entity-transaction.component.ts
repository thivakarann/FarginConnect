import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-transaction',
  templateUrl: './entity-transaction.component.html',
  styleUrl: './entity-transaction.component.css',
})
export class EntityTransactionComponent {
  valuetransaction: any;
  valuetransactionExport: any;
  valuetransactionview: any;

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
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId');
  actions: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuetransactionExport = 'Entity View Transaction-Export';
            this.valuetransactionview = 'Entity View Transaction-View';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Transaction-Export') {
                this.valuetransactionExport = 'Entity View Transaction-Export';
              }
              if (this.actions == 'Entity View Transaction-View') {
                this.valuetransactionview = 'Entity View Transaction-View';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.EntityTraansaction(this.id).subscribe((res: any) => {
      this.details = res.response;

      this.dataSource = new MatTableDataSource(this.details.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  close() {
    this.location.back();
  }
}
