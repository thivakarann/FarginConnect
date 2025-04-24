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
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PgsetupCreateComponent } from '../pgsetup-create/pgsetup-create.component';
import { PgsetupEditComponent } from '../pgsetup-edit/pgsetup-edit.component';
import { Pgsetup } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-pgsetup-view',
  templateUrl: './pgsetup-view.component.html',
  styleUrl: './pgsetup-view.component.css'
})
export class PgsetupViewComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] = ["pgModeId", "pgMode", "apiKey", "secretKey", "pgOnoffStatus", "Edit", "createdBy", "createdDateTime", "modifiedBy", "modifiedDateTime"]
  pgsetup: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  valuepgsetupAdd: any;
  valuepgsetupExport: any;
  valuepgsetupStatus: any;
  valuepgsetupEdit: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  copiedIndex:number = -1;
  copiedIndex1:number = -1;
  searchPerformed:boolean=false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuepgsetupAdd = 'PG SetupKey-Add';
            this.valuepgsetupEdit = 'PG SetupKey-Edit';
            this.valuepgsetupExport = 'PG SetupKey-Export';
            this.valuepgsetupStatus = 'PG SetupKey-Status';

          }
          // else {
          //   for (let datas of this.getdashboard) {
          //     this.actions = datas.subPermissions;


          //     if (this.actions == 'PG SetupKey-Edit') {
          //       this.valuepgsetupEdit = 'PG SetupKey-Edit';
          //     }
          //     if (this.actions == 'PG SetupKey-Add') {
          //       this.valuepgsetupAdd = 'PG SetupKey-Add';
          //     }
          //     if (this.actions == 'PG SetupKey-Export') {
          //       this.valuepgsetupExport = 'PPG SetupKey-Export';
          //     }
          //     if (this.actions == 'PG SetupKey-Status') {
          //       this.valuepgsetupStatus = 'PG SetupKey-Status';
          //     }
          //   }
          // }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.PGsetupget().subscribe((res: any) => {
      if (res.flag == 1) {
        this.pgsetup = res.response;
        this.pgsetup.reverse();
        this.dataSource = new MatTableDataSource(this.pgsetup);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
   

      }
      else {
        this.pgsetup = [];
        this.dataSource = new MatTableDataSource(this.pgsetup);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
   
      }
    });

 

  }


  reload(){
    this.service.PGsetupget().subscribe((res: any) => {
      if (res.flag == 1) {
        this.pgsetup = res.response;
        this.pgsetup.reverse();
        this.dataSource = new MatTableDataSource(this.pgsetup);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
   

      }
      else {
        this.pgsetup = [];
        this.dataSource = new MatTableDataSource(this.pgsetup);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
   
      }
    });
  }


  copyText(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex = index;
    setTimeout(() => this.copiedIndex = -1, 2000);
  }

  copyText1(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex1 = index;
    setTimeout(() => this.copiedIndex = -1, 2000);
  }




  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;

    let submitModel: Pgsetup = {
      pgOnoffStatus: this.isChecked ? 1 : 0,

    };

    this.service.Pgsetupstatus(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.PGsetupget().subscribe((res: any) => {
          if (res.flag == 1) {
            this.pgsetup = res.response;
            this.pgsetup.reverse();
            this.dataSource = new MatTableDataSource(this.pgsetup);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
       
    
          }
          else {
            this.pgsetup = [];
            this.dataSource = new MatTableDataSource(this.pgsetup);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
       
          }
        });
      }, 500);
    });
  }


  create() {
    this.dialog.open(PgsetupCreateComponent, {
     enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose:true
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.PGsetupget().subscribe((res: any) => {
        if (res.flag == 1) {
          this.pgsetup = res.response;
          this.pgsetup.reverse();
          this.dataSource = new MatTableDataSource(this.pgsetup);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
     
  
        }
        else {
          this.pgsetup = [];
          this.dataSource = new MatTableDataSource(this.pgsetup);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
     
        }
      });
  
  
    })
  }


  Edit(id: string) {
    this.dialog.open(PgsetupEditComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: { value: id }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.PGsetupget().subscribe((res: any) => {
        if (res.flag == 1) {
          this.pgsetup = res.response;
          this.pgsetup.reverse();
          this.dataSource = new MatTableDataSource(this.pgsetup);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
     
  
        }
        else {
          this.pgsetup = [];
          this.dataSource = new MatTableDataSource(this.pgsetup);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
     
        }
      });
  
  
    })
  }

 
 
 
  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.pgsetup.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      let moddate = element.modifiedDateTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgMode);
      this.response.push(element?.apiKey);
      this.response.push(element?.secretKey);
      if(element?.pgOnoffStatus ==1){
        this.response.push("Active")
      }
      else{
        this.response.push("Inactive")
      }
      
      this.response.push(element?.createdBy);
      if(element?.createdDateTime){
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
       }
        else{
        this.response.push('');
        } 
      this.response.push(element?.modifiedBy);
      if(element?.modifiedDateTime){
        this.response.push(moment(element?.modifiedDateTime).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else{
        this.response.push('');
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
      "PG Mode",
      "Api Key",
      "Secret Key",
      "Status",
      "Created By",
      "Created Date/Time",
      "Modified By",
      "Modified At",
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('PG setup details');
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
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'PG Setup Details.xlsx');
 
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

}
