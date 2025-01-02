import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-refund-getall',
  templateUrl: './refund-getall.component.html',
  styleUrl: './refund-getall.component.css'
})
export class RefundGetallComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno","type", "pgPaymentId", "reqid","activityid", "custname","custemail","custmobile",  "paidAmount", "refund","status","refundDate","entityname"]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  refund: any;
  merchantPayId: any;
  apikey: any;
  pgModelID: any;
  transactionId: any;
  orderReference: any;
  hashKey: any;
  entityName: any;
  contactEmail: any;
  contactMobile: any;
  billingAddress: any;
  zipcode: any;
  city: any;
  stateName: any;
  secretKey: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuerenewexport: any;
  valuerenewview: any;
  valuerenewpay: any;
  valuerenewinvoice: any;
  roleName = localStorage.getItem('roleName')
  searchPerformed: boolean = false;
  date1: any;
  date2: any;
  date3: any;

  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  filter:boolean=false;
  currentfilval:any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  refundexport: any;
  valuerefundexport:any;
  errorMessage: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuerefundexport = 'Online Refunds-Export'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Online Refunds-Export') {
                this.valuerefundexport = 'Online Refunds-Export'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.service.RefundGetAll(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;

        this.dataSource = new MatTableDataSource(this.refund);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;

      }

      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]); 
        this.dataSource = new MatTableDataSource(this.refund);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;

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
    window.location.reload()
  }


 


  view(id: any) {
   
  }

  // invoice(id: any) {
  //   this.service.renewalinvoices(id).subscribe({
  //     next: (res: any) => {
  //       var downloadURL = URL.createObjectURL(res);
  //       window.open(downloadURL);
  //     },

  //   });
  // }
  refundsearch(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.RefundGetAllSearch(filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.refund = res.response;
          // this.transaction.reverse();
          this.dataSource = new MatTableDataSource(this.refund);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true

        }
        else if (res.flag === 2) {
          this.refund = [];
          this.dataSource = new MatTableDataSource(this.refund);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
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
    this.refundsearch(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
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
    this.service.RefundExport().subscribe((res: any) => {
      this.refundexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.refundexport.forEach((element: any) => {
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.type);
          this.response.push(element?.paymentId);
          this.response.push(element?.requestId);
 
          this.response.push(element?.activityId);
 
          this.response.push(element?.customerId?.customerName );
          this.response.push(element?.customerId?.emailAddress );
 
          this.response.push(element?.customerId?.mobileNumber );
          this.response.push(element?.paymentModel?.paidAmount );
 
          this.response.push(element?.refundAmount);
 
          this.response.push(element?.refundStatus);
 
       
          if (element.refundDateTime) {
            this.response.push(moment(element?.refundDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
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
    // const title='Entity Details';
    const header = [
     "SNo","Type", "PgPaymentId", "ReqId","ActivityId", "CustomerName","CustomerEmail","CustomerMobile",  "PaidAmount", "RefundAmount","Status","RefundDate"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Online Refunds');
 
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
      FileSaver.saveAs(blob, 'Online Refunds.xlsx');
    });
  }
}
