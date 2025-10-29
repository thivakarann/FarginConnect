import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-alacarte-bulkresponse',
  templateUrl: './alacarte-bulkresponse.component.html',
  styleUrl: './alacarte-bulkresponse.component.css',
})
export class AlacarteBulkresponseComponent {
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
  dataSource: any;
  merchantId: any = sessionStorage.getItem('merchantId');
  viewBulk: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseExcelData: any = [];
  dataPush: any = [];
  responseData: any;
  valueresponse: any;
  getdashboard: any[] = [];
  actions: any;
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  roleName = sessionStorage.getItem('roleName');
  searchPerformed: boolean = false;
  valueFile: any;
  UploaddFile: any;
  Response: any;
  errorMessage: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private location:Location,
    private cryptoService:EncyDecySericeService,

  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.UploaddFile = 'A-LA-CARTE Uploded-File';
            this.Response = 'A-LA-CARTE Uploded-Response';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'A-LA-CARTE Uploded-File') {
                this.UploaddFile = 'A-LA-CARTE Uploded-File';
              }
              if (this.actions == 'A-LA-CARTE Uploded-Response') {
                this.Response = 'A-LA-CARTE Uploded-Response';
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.Alcartbulkresponse().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewBulk = res.response;
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  pagerefresh() {
    this.service.Alcartbulkresponse().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewBulk = res.response;
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

    close() {
    this.location.back()
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
    this.service.Alcartbulkresponse().subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewBulk = res.response;
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  responseDownload(uploadId: any) {
    this.service.Alcartuploadid(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data;

      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.channelName);

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
    const header = ['S.No', 'Channel Name', 'Remarks'];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('A-LA-CARTE Uploaded Details');

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
      // qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'A-LA-CARTE Uploaded Details.csv');
    });
  }

  responses(uploadId: any) {
    this.service.Alcartuploadid(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data;

      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.broadCasterName);
          this.dataPush.push(element?.serviceProviderName);
          this.dataPush.push(element?.regionName);
          this.dataPush.push(element?.channelName);
          this.dataPush.push(element?.channelNumber);
          this.dataPush.push(element?.generic);
          this.dataPush.push(element?.language);
          if (element?.type == '1') {
            this.dataPush.push('Paid');
          } else if (element?.type == '0') {
            this.dataPush.push('Free');
          }

          this.dataPush.push(element?.price);

          sno++;
          this.responseExcelData.push(this.dataPush);
        });
        this.response();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  response() {
    const header = [
      'S.No',
      'Broadcaster Name',
      'Service Provider Name',
      'Region',
      'Channel Name',
      'Channel Number',
      'Generic',
      'Language',
      'Channel Type',
      'Price',
    ];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('A-LA-CARTE Uploaded File');

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
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);

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
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
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

      FileSaver.saveAs(blob, 'A-LA-CARTE Uploaded File.csv');
    });
  }
}
