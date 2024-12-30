import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-entity-refund',
  templateUrl: './entity-refund.component.html',
  styleUrl: './entity-refund.component.css'
})
export class EntityRefundComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'customerId',
    // 'Customer Refund',
    'Type',
    'Customer Name',
    'Payment ID',
    'Request ID',
    'Activity ID',
    'Paid Amount',
    'Refund Amount',
    // 'Total Refunded Amount',
    'Refund Status',
    'Refund Date & Time'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  refundValue: any;
  responseDataListnew: any = [];
  date1: any;
  response: any = [];
  searchPerformed: boolean = false;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private Location: Location
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.Entityrefund(this.id).subscribe((res: any) => {

      this.refundValue = res.response;
      this.dataSource = new MatTableDataSource(this.refundValue)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  reload() {
    window.location.reload()
  }


  close() {
    this.Location.back()
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.refundValue.forEach((element: any) => {
      let createdate = element.refundDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.type);
      this.response.push(element?.customerRefundId);
      this.response.push(element?.customerName);
      this.response.push(element?.paymentId);
      this.response.push(element?.requestId);
      this.response.push(element?.activityId);
      this.response.push(element?.paymentModel?.paidAmount);
      this.response.push(element?.refundAmount);
      this.response.push(element?.totalPayableAmount);
      this.response.push(element?.refundStatus);

      this.response.push(element?.date1);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Type',
      'Customer Refund Id',
      'Customer Name',
      'Payment ID',
      'Request ID',
      'Activity ID',
      'Paid Amount',
      'Refund Amount',
      'Total Refunded Amount',
      'Refund Status',
      'Refund Date & Time'
    ]

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Employee');
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
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
      let row = worksheet.addRow(d);

      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Employee.xlsx');
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}