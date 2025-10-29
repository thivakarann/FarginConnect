import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { SignerAddComponent } from '../signer-add/signer-add.component';
import { SignerUpdateComponent } from '../signer-update/signer-update.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UpdatesignerStatus } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-signer-getall',
  templateUrl: './signer-getall.component.html',
  styleUrl: './signer-getall.component.css'
})
export class SignerGetallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'signAdminName',
    'signAdminEmail',
    'signAdminMobile',
    'status',
    'adminCountry',
    'adminState',
    'adminCity',
    'adminPincode',
    'adminAddress',
    'createdBy',
    'createdAt',
    "View"
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  actions: any;
  errorMessage: any;
  data: any;
  valueSignerDetailsStatus: any;
  valueSignerDetailscreate: any;
  getdashboard: any;
  valueSignerDetailsHistory: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
  ) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueSignerDetailscreate = 'Signer Details-Update';
            this.valueSignerDetailsStatus = 'Signer Details-Status';
            this.valueSignerDetailsHistory = 'Signer Details-History';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Signer Details-Update') {
                this.valueSignerDetailscreate = 'Signer Details-Update'
              }
              if (this.actions == 'Signer Details-Status') {
                this.valueSignerDetailsStatus = 'Signer Details-Status'
              }

              if (this.actions == 'Signer Details-History') {
                this.valueSignerDetailsHistory = 'Signer Details-History'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.Getall();
  };

  Getall() {
    this.service.signergetall().subscribe((res: any) => {
      this.data = res.response;
      this.data.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  view(id: any) {
    this.router.navigate([`dashboard/signer-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  AddsignerDetails() {
    const dialogRef = this.dialog.open(SignerAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  Edit(id: any) {
    this.dialog.open(SignerUpdateComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id },
    })
  }

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: UpdatesignerStatus = {
      activeStatus: this.isChecked ? 1 : 0,
      signId: id
    };
    this.service.signerstatus(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall()
        }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
