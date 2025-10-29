import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FarginBankAddComponent } from '../fargin-bank-add/fargin-bank-add.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { farginstatus } from '../../../fargin-model/fargin-model.module';
import { FarginBankEditComponent } from '../fargin-bank-edit/fargin-bank-edit.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-fargin-bankview',
  templateUrl: './fargin-bankview.component.html',
  styleUrl: './fargin-bankview.component.css'
})
export class FarginBankviewComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountHolderName',
    'accountNumber',
    'type',
    'bankName',
    'ifscCode',
    'branchName',
    'ledgerId',
    'status',
    'Edit',
    'View',
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
  valueEntityAdd: any;
  valueEntityExport: any;
  valueEntityStatus: any;
  valueEntityView: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  unblockvalue: any;
  valueEntityUnblock: any;
  adminBankId: any;
  data: any;
  valuefarginadd: any;
  valuefarginexport: any;
  valuefarginstatus: any;
  valuefarginedit: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cryptoService:EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.fetchfarginbankview();
  };

  fetchfarginbankview() {
    this.service.Farginview().subscribe((res: any) => {
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

  AddBankDetails() {
    const dialogRef = this.dialog.open(FarginBankAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
  };

  Edit(id: any) {
    const dialogRef = this.dialog.open(FarginBankEditComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id },
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchfarginbankview();
    });
  }

  view(id: any) {
    this.router.navigate([`dashboard/fargin-bank-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.isChecked = event.checked;
    let submitModel: farginstatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.Farginstatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.responseMessage);
        setTimeout(() => { this.fetchfarginbankview(); }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }
}
