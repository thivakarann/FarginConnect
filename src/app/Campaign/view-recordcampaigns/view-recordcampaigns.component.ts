import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-recordcampaigns',
  templateUrl: './view-recordcampaigns.component.html',
  styleUrl: './view-recordcampaigns.component.css'
})
export class ViewRecordcampaignsComponent {
  displayedColumns: any[] = [
    'uploadid',
    'totalRecord',
    'successCount',
    'failedCount',
    'UploadedAt',
    'Response',
  ];
  dataSource: any;

  viewBulk: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseExcelData: any = [];
  dataPush: any = [];
  responseData: any;
  valueresponse: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = sessionStorage.getItem('roleId');
  roleName = sessionStorage.getItem('roleName');
  valueRouteStatusresponse: any;
  searchPerformed: boolean = false;
  id: any;
  errorMessage: any;
  valueEmails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private activated: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.activated.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueEmails = 'Campaign-EmailsList';

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Campaign-EmailsList') {
                this.valueEmails = 'Campaign-EmailsList'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.service.viewrecordcampaigns(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewBulk = res.response;

        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewBulk.reverse());
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
    window.location.reload();
  }
  responseDownload(uploadId: any) {
    this.service.viewresponsecampaigns(uploadId).subscribe((res: any) => {
      this.responseData = res.response.data;

      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.email);
          this.dataPush.push(element?.message);
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
    const header = ['S.No', 'Email Address', 'Remarks'];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Email-Details');

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
      // let qty3 = row.getCell(4);


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
      // qty3.border = {
      //   top: { style: 'thin' },
      //   left: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   right: { style: 'thin' },
      // };

    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Email-Details.csv');
    });
  }
  close() {
    this.location.back()
  }
}
