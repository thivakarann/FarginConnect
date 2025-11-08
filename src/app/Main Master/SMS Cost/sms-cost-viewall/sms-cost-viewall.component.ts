import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { SMScostAddComponent } from '../smscost-add/smscost-add.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Payload, smscoststatus } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { SmscostUpdateComponent } from '../smscost-update/smscost-update.component';

@Component({
  selector: 'app-sms-cost-viewall',
  templateUrl: './sms-cost-viewall.component.html',
  styleUrl: './sms-cost-viewall.component.css'
})
export class SmsCostViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'smsId',
    'amount',
    'date',
    'smsStatus',
    'Edit',
    "View",
    'createdBy',
    'createdDateTime',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valuesmsadd: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  Emptylist: any = [];
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  smsstatus: any;
  Edit: any;
  Roledetails: any;

  constructor(
    public smsdetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
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
    this.smsdetails.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valuesmsadd = 'SMS Cost-Update';
            this.valuesmsstatus = 'SMS Cost-History';
            this.smsstatus = 'SMS Cost-Status';
            this.Edit = 'SMS Cost-Edit'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'SMS Cost-Update') {
                this.valuesmsadd = 'SMS Cost-Update';
              }
              if (this.actions == 'SMS Cost-History') {
                this.valuesmsstatus = 'SMS Cost-History'
              }
              if (this.actions == 'SMS Cost-Status') {
                this.smsstatus = 'SMS Cost-Status'
              }
              if (this.actions == 'SMS Cost-Edit') {
                this.Edit = 'SMS Cost-Edit'
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
    this.smsdetails.smscostViewall().subscribe((res: any) => {
      this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
      this.dataSource = new MatTableDataSource(this.viewall.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  Addsms() {
    const dialogRef = this.dialog.open(SMScostAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  Updatesms(id: any) {
    const dialogRef = this.dialog.open(SmscostUpdateComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  view(id: any) {
    this.router.navigate([`dashboard/sms-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  ActiveStatus(id: any) {
    let submitModel: smscoststatus = {
      smsCostId: id
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.smsdetails.smscoststatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.Getall() }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
}
