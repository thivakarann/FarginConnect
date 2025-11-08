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
import { Payload, UpdatesignerStatus, Getallstatus } from '../../../fargin-model/fargin-model.module';
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
    'Edit',
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
  totalPages: any;
  totalpage: any;
  currentfilvalShow: boolean = false;
  currentpage: any;
  currentfilval: any;
  Roledetails: any;
  valueSignerDetailsupdate: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();
  };

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
            this.valueSignerDetailscreate = 'Signer Details-Create';
            this.valueSignerDetailsupdate = 'Signer Details-Update';
            this.valueSignerDetailsStatus = 'Signer Details-Status';
            this.valueSignerDetailsHistory = 'Signer Details-History';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Signer Details-Update') {
                this.valueSignerDetailscreate = 'Signer Details-Update'
              }
              if (this.actions == 'Signer Details-Status') {
                this.valueSignerDetailsStatus = 'Signer Details-Status'
              }

              if (this.actions == 'Signer Details-History') {
                this.valueSignerDetailsHistory = 'Signer Details-History'
              }

              if (this.actions == 'Signer Details-Update') {
                this.valueSignerDetailsupdate = 'Signer Details-Update'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  };

  Getall() {
    let submitModel: Getallstatus = {
      pageNumber: 0,
      pageSize: 5,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.signergetall(datamodal).subscribe((res: any) => {
      this.data = JSON.parse(this.cryptoService.decrypt(res.data));
      this.dataSource = new MatTableDataSource(this.data.content);
      this.totalPages = this.data.totalElements;
      this.totalpage = this.data.size;
      this.currentpage = this.data.number;
      this.currentfilvalShow = false;
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
    const dialogRef = this.dialog.open(SignerUpdateComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.singerDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  ActiveStatus(id: string) {
    let submitModel: UpdatesignerStatus = {
      signId: id
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.signerstatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.Getall() }, 200);
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    });
  }



  getData(event: any) {
    let submitModel: Getallstatus = {
      pageNumber: event.pageIndex,
      pageSize: event.pageSize,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.signergetall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.data.content);
        this.totalPages = this.data.totalElements;
        this.totalpage = this.data.size;
        this.currentpage = this.data.number;

      } else {
        this.data = [];
        this.dataSource = new MatTableDataSource(this.data.content);
        this.totalPages = this.data.totalElements;
        this.totalpage = this.data.size;
        this.currentpage = this.data.number;
      }
    });
  }

}

