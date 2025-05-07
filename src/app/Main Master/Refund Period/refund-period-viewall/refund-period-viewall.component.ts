import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { RefundPeriodAddComponent } from '../refund-period-add/refund-period-add.component';
import { RefundPeriodEditComponent } from '../refund-period-edit/refund-period-edit.component';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-refund-period-viewall',
  templateUrl: './refund-period-viewall.component.html',
  styleUrl: './refund-period-viewall.component.css'
})
export class RefundPeriodViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'refundDayId',
    'paymentMethod',
    'day',
    'Edit',
    'View',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
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
  roleId: any = sessionStorage.getItem('roleId');
  getdashboard: any[] = [];
  valueexport: any;
  errorMessage: any;
  actions: any;
  valueadd: any;
  valueedit: any;
  searchPerformed: boolean = false;
  History:any;

  constructor(
    public refunddetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.refunddetails.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueexport = 'Refund Period-Export'
            this.valueadd = 'Refund Period-Add'
            this.valueedit = 'Refund Period-Edit'
            this.History = 'Refund Period-History'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Refund Period-Export') {
                this.valueexport = 'Refund Period-Export'
              }
              if (this.actions == 'Refund Period-Add') {
                this.valueadd = 'Refund Period-Add'
              }
              if (this.actions == 'Refund Period-Edit') {
                this.valueedit = 'Refund Period-Edit'
              }

              if (this.actions == 'Refund Period-History') {
                this.History = 'Refund Period-History'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.refunddetails.RefundperiodGetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      else if (res.flag == 2) {
        this.viewall = [];

        this.dataSource = new MatTableDataSource(this.viewall);
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
  Addrefund() {
    const dialogRef = this.dialog.open(RefundPeriodAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchrefund();
    });
  }

  view(id: any) {
    this.router.navigate([`dashboard/refund-period-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  fetchrefund() {
    this.refunddetails.RefundperiodGetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      else if (res.flag == 2) {
        this.viewall = [];

        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  reload() {
    this.refunddetails.RefundperiodGetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      else if (res.flag == 2) {
        this.viewall = [];

        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    });

  }

  Editrefunds(id: any) {
    const dialogRef = this.dialog.open(RefundPeriodEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "1000ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchrefund();
    });
  }

  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.day);
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      if (element?.modifiedDateTime != null) {
        let moddate = element.modifiedDateTime;
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
      "Payment Method",
      "Refund Period",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Refund Period Details');
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
      FileSaver.saveAs(blob, 'Refund Period Details.xlsx');
    });
  }


}
