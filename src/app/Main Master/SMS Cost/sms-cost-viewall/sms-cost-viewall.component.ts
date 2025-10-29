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
import { smscoststatus } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

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
    'createdBy',
    'createdDateTime',
    "View"
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

  constructor(
    public smsdetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,
  ) { }


  ngOnInit(): void {

    this.smsdetails.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuesmsadd = 'SMS Cost-Update';
            this.valuesmsstatus = 'SMS Cost-History'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'SMS Cost-Update') {
                this.valuesmsadd = 'SMS Cost-Update';
              }
              if (this.actions == 'SMS Cost-History') {
                this.valuesmsstatus = 'SMS Cost-History'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.Getall()
  };

  Getall() {
    this.smsdetails.smscostViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  view(id: any) {
    this.router.navigate([`dashboard/sms-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  ActiveStatus(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: smscoststatus = {
      smsStatus: this.isChecked ? 1 : 0,
    };
    this.smsdetails.smscoststatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => { this.Getall() }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    });
  }


}
