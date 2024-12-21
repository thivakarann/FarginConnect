import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-smshistory',
  templateUrl: './smshistory.component.html',
  styleUrl: './smshistory.component.css'
})
export class SMSHistoryComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityname',
    'entityemail',
    'mobile',
    'smsType',
    'smscharge',
    'perSmsAmount',
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
  showcategoryData: boolean = false;
  smsResponse: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valuesmshistoryexport: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;

  pageIndex: number = 0;
  pageSize = 5;
  smsResponseexport: any;


  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  transactionexport: any;
  filter: boolean = true;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog, private router: Router) { }



  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuesmshistoryexport = 'SMS History-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'SMS History-Export') {
                this.valuesmshistoryexport = 'SMS History-Export';
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

    this.service.SmsHistoryGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsResponse = res.response;
        this.smsResponse.reverse();
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
      }
      else if (res.flag == 2) {
        this.message = res.responseMessage;
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


  exportexcel() {
    this.service.SmsHistoryGetAllExport().subscribe((res: any) => {
        this.smsResponseexport=res.response;
        if (res.flag == 1) {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.smsResponseexport.forEach((element: any) => {
      // let createdate = element.merchantSmsId?.createdDateTime;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantId?.accountId);
      this.response.push(element?.merchantId?.entityName);
      this.response.push(element?.merchantId?.contactEmail);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.merchantSmsId?.type?.smsTitle);
      this.response.push(element?.merchantSmsId?.type?.smsCharge);
      this.response.push(element?.perSmsAmount);
      this.response.push(element?.merchantSmsId?.createdBy);
      if(element.merchantSmsId?.createdDateTime){
        this.response.push(moment(element?.merchantSmsId?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
     
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
});
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'SNo',
      'Account Id',
      'Entity Name',
      'Entity Email',
      'Mobile Number',
      'SMS Type',
      'SMS Charge type',
      'SMS Amount',
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
      FileSaver.saveAs(blob, 'Sms-History.xlsx');
    });
  }

  View(id: any) {
    this.router.navigate([`dashboard/smshistory-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }
  filterdate() {
    // const datepipe: DatePipe = new DatePipe("en-US");
    // let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    // let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY HH:mm");
    // this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    // this.currentPage = 1;

    this.service.SMSHistoryFilter(this.FromDateRange, this.ToDateRange, this.pageSize1, this.pageIndex1).subscribe((res: any) => {
      if (res.flag == 1) {

        this.transaction = res.response;

        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;

        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.filter = true;      }
      else if (res.flag == 2) {
        this.filter = false;      }
    })
  }
  reset() {
    window.location.reload();
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

  smshistory(filterValue: string) {
    if (!filterValue) {
        this.toastr.error('Please enter a value to search');
        return;
    }
 
    this.service.Smshistorysearch(filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.smsResponse = res.response;  
          this.smsResponse.reverse();
          this.dataSource = new MatTableDataSource(this.smsResponse);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         
        }
        else if (res.flag === 2) {
          this.smsResponse = [];  
          this.dataSource = new MatTableDataSource(this.smsResponse);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }

  reload() {
    window.location.reload()
  }
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.filterdate();
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
 

}
