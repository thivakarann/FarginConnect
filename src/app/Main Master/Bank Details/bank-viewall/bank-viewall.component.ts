import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddbankDetailsComponent } from '../addbank-details/addbank-details.component';
import { EditBankDetailsComponent } from '../edit-bank-details/edit-bank-details.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UpdateBankdetailStatus } from '../../../fargin-model/fargin-model.module';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-bank-viewall',
  templateUrl: './bank-viewall.component.html',
  styleUrl: './bank-viewall.component.css'
})
export class BankViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'bankId',
    'bankName',
    'activeStatus',
    'Edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt',
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
  valuebanklistexport: any;
  valuebanklistadd: any;
  valuebankstatus: any;
  valuebankedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  valuetermViews: any;

  constructor(
    public bankdetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.bankdetails.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebanklistadd = 'Bank Details-Add'
            this.valuebanklistexport = 'Bank Details-Export'
            this.valuebankstatus = 'Bank Details-Status'
            this.valuebankedit = 'Bank Details-Edit'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Bank Details-Add') {
                this.valuebanklistadd = 'Bank Details-Add'
              }
              if (this.actions == 'Bank Details-Export') {
                this.valuebanklistexport = 'Bank Details-Export'
              }
              if (this.actions == 'Bank Details-Status') {
                this.valuebankstatus = 'Bank Details-Status'
              }
              if (this.actions == 'Bank Details-Edit') {
                this.valuebankedit = 'Bank Details-Edit'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.bankdetails.bankdetailsViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });


  }

  AddBankDetails() {
    this.dialog.open(AddbankDetailsComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.bankdetails.bankdetailsViewall().subscribe((res: any) => {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      });

    })
  }


  reload() {
    this.bankdetails.bankdetailsViewall().subscribe((res: any) => {
      this.viewall = res.response;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });

  }


  Editbankdetails(id: any) {
    this.dialog.open(EditBankDetailsComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "1000ms",
      data: { value: id },
      disableClose: true
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.bankdetails.bankdetailsViewall().subscribe((res: any) => {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      });

    })
  }

  ActiveStatus(event: MatSlideToggleChange, id: any) {

    this.isChecked = event.checked;

    let submitModel: UpdateBankdetailStatus = {
      bankId: id,
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.bankdetails.activebankdetailsstatus(submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.bankdetails.bankdetailsViewall().subscribe((res: any) => {
            this.viewall = res.response;
            this.viewall.reverse();
            this.dataSource = new MatTableDataSource(this.viewall);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

          });
        }, 500);

      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.bankName);
      if (element?.activeStatus == 1) {
        this.response.push("Active");
      }

      else {
        this.response.push("InActive");
      }
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      if (element?.modifiedAt != null) {
        let moddate = element.modifiedAt;
        this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
        this.response.push(this.date2);
      }
      else {
        this.response.push();
      }



      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Bank Name",
      "Status",
      "Created By",
      "Created Date/Time",
      "Modified By",
      "Modified At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Bank Details');
    // Blank Row
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };


    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },

      }

      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    data.forEach((d: any) => {
      // 

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);






      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }



    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Bank Details.xlsx');
    });
  }



}
