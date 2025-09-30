import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-whatapp-bulk-upload-view',
  templateUrl: './whatapp-bulk-upload-view.component.html',
  styleUrl: './whatapp-bulk-upload-view.component.css',
})
export class WhatappBulkUploadViewComponent implements OnInit {
  dataSource: any;
  displayedColumns: any[] = [
    'uploadid',
    'totalRecord',
    'successCount',
    'failedCount',
    'Status',
    'File',
    'Response',
    'Createtime',
    'UploadedBy',
    'UploadedAt',
  ];
  merchantId: any = sessionStorage.getItem('merchantId');
  bulkresponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseData: any;
  responseExcelData: any = [];
  dataPush: any = [];
  valueresponse: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = sessionStorage.getItem('roleId');
  roleName = sessionStorage.getItem('roleName');
  searchPerformed: boolean = false;
  date1: any;
  ValueDownload: any;
  errorMessage: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.getwhatsappbulkgetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.bulkresponse = res.response;

        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueresponse = 'WhatsApp Status-Response';
            this.ValueDownload = 'WhatsApp Status-UploadFile';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'WhatsApp Status-Response') {
                this.valueresponse = 'WhatsApp Status-Response';
              }
              if (this.actions == 'WhatsApp Status-UploadFile') {
                this.ValueDownload = 'WhatsApp Status-UploadFile';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
  }
  pagerefresh() {
    this.service.getwhatsappbulkgetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.bulkresponse = res.response;

        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
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

  reload() {
    this.service.getwhatsappbulkgetall().subscribe((res: any) => {
      if (res.flag == 1) {
        this.bulkresponse = res.response;

        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.bulkresponse.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  responseDownload(uploadId: any) {
    this.service.getwhatsappbulkbyid(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data;
      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.mobileNumber);
          this.dataPush.push(element?.date);
          this.dataPush.push(element?.reason);
          this.dataPush.push(element?.response);
          sno++;
          this.responseExcelData.push(this.dataPush);
        });
        this.responseExcel();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  responseExcel() {
    const header = ['S.No', 'Mobile Number', 'Date', 'Reason', 'Remarks'];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('WhatsApp-Response-Details');

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(header);

    headerRow.font = { bold: true };

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d: any) => {
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);

      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'WhatsApp-Response-Details.csv');
    });
  }

  response(uploadId: any) {
    this.service.getwhatsappbulkbyid(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data;
      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.mobileNumber);
          this.dataPush.push(element?.date);
          this.dataPush.push(element?.reason);
          sno++;
          this.responseExcelData.push(this.dataPush);
        });
        this.responseExcels();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  responseExcels() {
    const header = ['S.No', 'Mobile Number', 'Date', 'Reason'];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('WhatsApp-Uploaded-Details');

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(header);

    headerRow.font = { bold: true };

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d: any) => {
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);

      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'WhatsApp-Uploaded-Details.csv');
    });
  }

}
