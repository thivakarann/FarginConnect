import { Component, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentlinkResendComponent } from '../paymentlink-resend/paymentlink-resend.component';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paymentlink-view',
  templateUrl: './paymentlink-view.component.html',
  styleUrl: './paymentlink-view.component.css',
})
export class PaymentlinkViewComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'paymentId',
    'paymentlink',
    'reference',
    'expiry',
    'generatedat',
  ];
  id: any;
  paymentValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  valueresendlink: any;
  valuepaymentlink: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId');
  searchPerformed: boolean = false;
  actions: any;

  constructor(
    public location: Location,
    public service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueresendlink = 'Entity View Payment Link-Add';
            this.valuepaymentlink = 'Entity View Payment Link-Link';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Payment Link-Add') {
                this.valueresendlink = 'Entity View Payment Link-Add';
              }
              if (this.actions == 'Entity View Payment Link-Link') {
                this.valuepaymentlink = 'Entity View Payment Link-Link';
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

    this.Getall();




  }

  Getall() {
    this.service.paymentLinkview(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.paymentValue = res.response;
        this.dataSource = new MatTableDataSource(this.paymentValue?.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else if (res.flag == 2) {
        this.paymentValue = [];
        this.dataSource = new MatTableDataSource(this.paymentValue?.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resendLink(id: any) {
    const dialogRef = this.dialog.open(PaymentlinkResendComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: this.id,
      },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  close() {
    this.location.back();
  }
}
