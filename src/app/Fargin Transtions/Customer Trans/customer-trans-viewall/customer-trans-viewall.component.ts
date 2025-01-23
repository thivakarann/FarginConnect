import { Component, ElementRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { CustomerTransViewComponent } from '../customer-trans-view/customer-trans-view.component';
import { customerpay } from '../../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-customer-trans-viewall',
  templateUrl: './customer-trans-viewall.component.html',
  styleUrl: './customer-trans-viewall.component.css'
})
export class CustomerTransViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'customerid',
    'customername',
    'customemobile',
    'service',
    'setupbox',
    'paymentmethod',
    'amount',
    'paidAt',
    'Receipt',
    'CheckStatus',
    'status',
    'view',

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
  showcategoryData!: boolean;
  valuepaymentexport: any;
  valuepaymentview: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valuepaymentReceipt: any;
  valuepaymentCheckStatus: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalpage: any;
  totalPages: any;
  currentpage: any;
  transactionexport: any;

  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  pageIndex2: number = 0;
  pageSize2 = 5;
 
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
 
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilval: any;


  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }



  ngOnInit(): void {



    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuepaymentexport = 'Customer Payment-Export'
            this.valuepaymentview = 'Customer Payment-View'
            this.valuepaymentReceipt = 'Customer Payment-Receipt'
            this.valuepaymentCheckStatus = 'Customer Payment-Check Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Customer Payment-Export') {
                this.valuepaymentexport = 'Customer Payment-Export'
              }
              if (this.actions == 'Customer Payment-View') {
                this.valuepaymentview = 'Customer Payment-View'
              }
              if (this.actions == 'Customer Payment-Receipt') {
                this.valuepaymentReceipt = 'Customer Payment-Receipt'
              }
              if (this.actions == 'Customer Payment-Check Status') {
                this.valuepaymentCheckStatus = 'Customer Payment-Check Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.service.CustomerAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;

        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;

      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;
          
      }

    });

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    window.location.reload()
  }


  filterdate() {
    // const datepipe: DatePipe = new DatePipe("en-US");
    // let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    // let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY HH:mm");
    // this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    // this.currentPage = 1;

    this.service.CustomerTransactionsFilter(this.FromDateRange, this.ToDateRange, this.pageSize1, this.pageIndex1).subscribe((res: any) => {
      if (res.flag == 1) {

        this.transaction = res.response;


        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
 


        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.filter1 = true;
        this.filters = false;         }
      else if (res.flag == 2) {
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
   
        this.filter = false;
        this.filter1 = true;
        this.filters = false;            }
    })
  }
  reset() {
    this.service.CustomerAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;

        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;

      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;
          
      }

    });
    this.service.CustomerAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;

        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;
        this.FromDateRange='';
        this.ToDateRange='';

      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1 = false;
        this.filter1 = false;
        this.FromDateRange='';
        this.ToDateRange='';
          
      }

    });

  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }


  exportexcel() {
    this.service.CustomerAllTransactionsExport().subscribe((res: any) => {
      this.transactionexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.transactionexport.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.customerId?.merchantId?.merchantLegalName);
          this.response.push(element?.customerId?.customerId);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.customerId?.mobileNumber);
          this.response.push(element?.customerStbId?.stbId?.service?.serviceProviderName);
          this.response.push(element?.customerStbId?.stbId?.setupBoxNumber);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.paidAmount);
 
          if(element.paymentDateTime){
            this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else{
            this.response.push('');
          }
          if (element?.paymentStatus == 'Success') {
            this.response.push('Success');
          }
          else if (element?.paymentStatus == 'Pending') {
            this.response.push('Pending');
          }
          else {
            this.response.push('Initiated');
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
      'sno',
      'Payment Id',
      'Entity Name',
      'Customer Id',
      'Customer Name',
      'CustomerMobile',
      'Service ProviderName',
      'Setupbox Number',
      'Payment Method',
      'Amount',
      'Paid At',
      'Status',
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Transactions');
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
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Customer Transaction.xlsx');
    });
  }


  transactionview(id: any) {

    this.dialog.open(CustomerTransViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  track(id: any) {
    let submitModel: customerpay = {
      payId: id?.customerPayId,
      trackId: id?.trackId,
      paidAmount: id.paidAmount
    }
    this.service.Customerpay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.CustomerAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
              this.transaction = res.response;
      
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;
              
              this.dataSource = new MatTableDataSource(this.transaction);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.filter = true;
              this.filter1 = false;
              this.filter1 = false;
      
            }
            else{
              this.transaction = [];
              this.dataSource = new MatTableDataSource(this.transaction);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;
              this.filter = true;
              this.filter1 = false;
              this.filter1 = false;
                
            }
      
          });
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
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

  CustomerAdmin(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
    if (filterValue) {

    this.service.CustomeradminSearch(filterValue,this.pageSize2,this.pageIndex2).subscribe({
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
    this.CustomerAdmin(this.currentfilval);
  }
 
  changePageIndex2(newPageIndex1: number) {
    this.pageIndex2 = newPageIndex1;
    this.renderPage2({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize2,
      // length: this.totalItems
    } as PageEvent);
  }
}

