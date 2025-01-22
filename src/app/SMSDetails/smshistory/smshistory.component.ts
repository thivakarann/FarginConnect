import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { PageEvent } from '@angular/material/paginator';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { SMSDescriptionComponent } from '../smsdescription/smsdescription.component';
@Component({
  selector: 'app-smshistory',
  templateUrl: './smshistory.component.html',
  styleUrl: './smshistory.component.css'
})
export class SmshistoryComponent {
  date: any;
  categoryError: any;

  dataSource: any;
  displayedColumns: string[] = ["sno", "smsTitle", "smsTempDescription",
    
   "mobile" ,"smscharge", "freepaid", "approval", "createdDateTime"]
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  fullname: any = localStorage.getItem('fullname')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  viewsms: any;
  isChecked: any;
  merchantsmsId: any;
  id: any;
  FromDateRange: any;
  ToDateRange: any;
  valuehistoryexport: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  smshistoryExport: any;
  date1: any;
  Visible: boolean = false;
  limit: number = 30;


  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  transactionexport: any;
  filter: boolean = true;
  pageIndex2: number = 0;
  pageSize2 = 5;
 
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
 
  filter1: boolean = false;
  filters: boolean = false;
  currentfilval: any;
  transaction: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit() {


    this.service.viewsmshistorys(this.merchantId, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewsms = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.viewsms.reverse();
        this.dataSource = new MatTableDataSource(this.viewsms);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

        this.filters=false;
        this.filter1=false;
        this.filter=true;
 
      }
      else {

        this.errorMsg = res.responseMessage;
        this.filters=false;
        this.filter1=false;
        this.filter=true;
      }
    });

    if (this.roleName == 'Merchant Super admin') {
      this.valuehistoryexport = 'SMS History-Export'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'SMS History-Export') {
              this.valuehistoryexport = 'SMS History-Export'
            }



          }
        }
      })
    }
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
  filterdate() {
    this.service.viewsmsdates(this.merchantId, this.FromDateRange, this.ToDateRange, this.pageSize1, this.pageIndex1).subscribe((res: any) => {
      if (res.flag == 1) {
        this.date = res.response;


        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;


        this.dataSource = new MatTableDataSource(this.date.reverse());

        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.filters=false;
        this.filter1=true;
        this.filter=false;
      }
      else if (res.flag == 2) {
        this.date = [];
        this.dataSource = new MatTableDataSource(this.date);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
 
        this.filters=false;
        this.filter1=true;
        this.filter=false;
        this.categoryError = res.responseMessage;
      } else {
        this.categoryError = res.responseMessage;
      }
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
  exportexcel() {
    this.service.SmsHitoryExport(this.merchantId).subscribe((res: any) => {
      this.smshistoryExport = res.response;
      console.log(this.smshistoryExport)
 
      if (res?.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.smshistoryExport?.forEach((element: any) => {
         
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.merchantSmsId?.type?.smsTitle);
          this.response.push(element?.smsMessage);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.perSmsAmount);
          this.response.push(element?.smsChargeStatus);
          this.response.push(element?.merchantSmsId?.smsApprovalStatus);
         
          if(element.createdDateTime){
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else{
            this.response.push('');
          }
 
          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    })
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Sms Title",
      "Sms Description",
      "Mobile Number",
      "Charge For Sms",
      "SMS Charge Type",
      "SMS Approval",
      "Created At",
     
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Onboard');
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
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
    }
    );
 
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'SMS History.xlsx');
 
    });
  }
  description(id: any) {
    this.dialog.open(SMSDescriptionComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    })
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
  renderPage2(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex2 = event.pageIndex;  // Update current page index
    this.pageSize2 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.smssearch(this.currentfilval);
  }
 
  changePageIndex2(newPageIndex1: number) {
    this.pageIndex2 = newPageIndex1;
    this.renderPage2({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize2,
      // length: this.totalItems
    } as PageEvent);
  }
  smssearch(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
    if (filterValue) {
 
    this.service.SMShistorySearch(this.merchantId,filterValue,this.pageSize2,this.pageIndex2).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.transaction.reverse();
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages2 = res.pagination.totalElements;
          this.totalpage2 = res.pagination.totalPages;
          this.currentpage2 = res.pagination.currentPage + 1;
          this.filters=true;
          this.filter1=false;
          this.filter=false;
 
 
        }
        else if (res.flag === 2) {
          this.transaction = [];
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages2 = res.pagination.totalElements;
          this.totalpage2 = res.pagination.totalPages;
          this.currentpage2 = res.pagination.currentPage + 1;
          this.filters=true;
          this.filter1=false;
          this.filter=false;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
  }
 
}
