import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AddfacheckkeyComponent } from '../addfacheckkey/addfacheckkey.component';
import { EditfacheckkeyComponent } from '../editfacheckkey/editfacheckkey.component';
import moment from 'moment';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { Statusfacheckkey } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-viewfacheckkey',
  templateUrl: './viewfacheckkey.component.html',
  styleUrl: './viewfacheckkey.component.css'
})
export class ViewfacheckkeyComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno", "apikey", "secretKey", "mode", "Edit", "status", "createdBy", "createdDateTime", "modifiedBy", "modifiedDateTime"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  facheck: any;
  showcategoryData: any;
  errorMsg: any;
  isChecked: any;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valuefacheckAdd: any;
  valuefacheckexport: any;
  valuefacheckedit: any;
  valuefacheckstatus: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuefacheckAdd = 'FaCheck Key-Add';
            this.valuefacheckexport = 'FaCheck Key-Export';
            this.valuefacheckedit = 'FaCheck Key-Edit';
            this.valuefacheckstatus = 'FaCheck Key-Status';
          }
          // else {
          //   for (let datas of this.getdashboard) {

          //     this.actions = datas.subPermissions;



          //     if (this.actions == 'FaCheck Key-Add') {
          //       this.valuefacheckAdd = 'FaCheck Key-Add';
          //     }

          //     if (this.actions == 'FaCheck Key-Export') {
          //       this.valuefacheckexport = 'FaCheck Key-Export';
          //     }

          //     if (this.actions == 'FaCheck Key-Edit') {
          //       this.valuefacheckedit = 'FaCheck Key-Edit';
          //     }

          //     if (this.actions == 'FaCheck Key-Status') {
          //       this.valuefacheckstatus = 'FaCheck Key-Status';
          //     }
          //   }
          // }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })


    this.service.viewfacheck().subscribe((res: any) => {
      if (res.flag == 1) {
        this.facheck = res.response;
        this.facheck.reverse();
        this.dataSource = new MatTableDataSource(this.facheck);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
        // 
      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });

   

  }

  reload() {
    window.location.reload()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: Statusfacheckkey = {
      activeStatus: this.isChecked ? 1 : 0,

    };

    this.service.statusfacheck(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  add() {

    this.dialog.open(AddfacheckkeyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose:true
    });
  }
  Edit(id: string) {
    this.dialog.open(EditfacheckkeyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose:true,
      data: { value: id }
    });
  }

  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.facheck.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.apiKey);
      this.response.push(element?.secretKey);
      this.response.push(element?.applicationId);
      this.response.push(element?.mode);
      if (element?.activeStatus == '1') {
        this.response.push("Active");
      }
      else {
        this.response.push("Inactive");
      }
      this.response.push(element?.createdBy);
      this.response.push(element?.createdAt);
      this.response.push(element?.modifiedBy);
      this.response.push(element?.modifiedAt);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title = 'Facheck';
    const header = [
      "S.No",
      "Api Key",
      "Secret Key",
      "Application Id",
      "Mode",
      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Facheck');
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };
 
 
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
 
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Facheck.xlsx');
    });
  }

}
