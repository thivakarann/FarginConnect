import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-sms-viewall',
  templateUrl: './entity-sms-viewall.component.html',
  styleUrl: './entity-sms-viewall.component.css'
})
export class EntitySmsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityname',
    'entityemail',
    'smsType',
    'smscount',
    'smscharge',
    'createdBy',
    'date',
   
 
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  FromDateRange!: string;
  currentPage!: number;
  ToDateRange!: string;
  Daterange!: string;
  Viewall: any;
  content: any;
  filteredData: any;
  getallData: any;
  term: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  transaction: any;
  message: any;
  showData: boolean=false;
  smsResponse: any;
valueentitysmsexport: any;
 
getdashboard: any[] = [];
roleId: any = localStorage.getItem('roleId')
actions: any;
errorMessage: any;
pageIndex: number = 0;
pageSize=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
 
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
       
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
 
          if (this.roleId == 1) {
            this.valueentitysmsexport = 'Entity Sms-Export';
           }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
 
 
              if (this.actions == 'Entity Sms-Export') {
                this.valueentitysmsexport = 'Entity Sms-Export';
              }
             
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })
 
 
    this.service.SmsGetAll(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsResponse=res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.message=res.responseMessage;
      }
    })
 
   
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  reload(){
    window.location.reload()
  }
  exportexcel() {
   
    let sno = 1;
    this.responseDataListnew = [];
    this.smsResponse.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      let moddate = element.modifedDateTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantId?.accountId);
 
      this.response.push(element?.merchantId?.entityName);
      this.response.push(element?.merchantId?.contactEmail);
     this.response.push(element?.type?.smsTitle)
     this.response.push(element?.smsCount)
     this.response.push(element?.type?.smsCharge)
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
   
 
     
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
    'S.No',
    'Account Id',
    'Entity Name',
    'Entity Email',
    'SMS Type',
    'SMS Count',
    'Charge Per Sms',
    'Created By',
    'Created At',
   
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sms Settings');
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
      FileSaver.saveAs(blob, 'Sms-ViewAll.xlsx');
    });
}
renderPage(event: PageEvent) {
  // Capture the new page index and page size from the event
  this.pageIndex = event.pageIndex;  // Update current page index
  this.pageSize = event.pageSize;           // Update page size (if changed)
 
  // Log the new page index and page size to the console (for debugging)
  console.log('New Page Index:', this.pageIndex);
  console.log('New Page Size:', this.pageSize);
 
  // You can now fetch or display the data for the new page index
  // Example: this.fetchData(this.currentPageIndex, this.pageSize);
  this.ngOnInit()
}
changePageIndex(newPageIndex: number) {
  this.pageIndex = newPageIndex;
  this.renderPage({
    pageIndex: newPageIndex,
    pageSize: this.pageSize,
    // length: this.totalItems
  } as PageEvent);
}

}
