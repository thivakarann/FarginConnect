import { Component, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentlinkResendComponent } from '../paymentlink-resend/paymentlink-resend.component';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentlinkDesViewComponent } from './paymentlink-des-view/paymentlink-des-view.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

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
    'Description',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  searchPerformed: boolean = false;
  actions: any;

  isFullPolicyVisible: boolean = false;
  Roledetails: any;


  constructor(
    public location: Location,
    public service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {



    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.Role();
    this.Getall();
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueresendlink = 'Entity View Payment Link-Add';
            this.valuepaymentlink = 'Entity View Payment Link-Link';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
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


  ViewDescription(id: any) {
    this.dialog.open(PaymentlinkDesViewComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
  }


}
