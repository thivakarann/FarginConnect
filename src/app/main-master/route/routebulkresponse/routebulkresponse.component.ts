import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-routebulkresponse',
  templateUrl: './routebulkresponse.component.html',
  styleUrl: './routebulkresponse.component.css',
})
export class RoutebulkresponseComponent {
  displayedColumns: any[] = [
    'uploadid',
    'totalRecord',
    'successCount',
    'failedCount',
    'UploadedBy',
    'UploadedAt',
    'Response',
  ];
  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  viewBulk: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseExcelData: any = [];
  dataPush: any = [];
  responseData: any;
  valueresponse: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId');
  roleName = localStorage.getItem('roleName');
  valueRouteStatusresponse:any;
searchPerformed: boolean=false;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {


    if (this.roleName == 'Merchant Super admin') {
      this.valueRouteStatusresponse = 'Route Status-Response';
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
 
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
 
            if (this.actions == 'Route Status-Response') {
              this.valueRouteStatusresponse = 'Route Status-Response'
            }
           
          }
 
        }
      })
    }


    this.service.routebulkuploadresponse(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.viewBulk = res.response;

        this.dataSource = new MatTableDataSource(this.viewBulk?.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
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
    this.service.routebulkuploadById(uploadId).subscribe((res: any) => {
      this.responseData = res.response.jsonNode.data;

      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.MobileNumber);
     
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
    const header = ['S.No', 'Mobile Number', 'Remarks'];

    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Route Upload Response');

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
     
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Route UploadResponse.csv');
    });
  }
}
