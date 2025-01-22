import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { AdditionalPayviewComponent } from '../additional-payview/additional-payview.component';

@Component({
  selector: 'app-additional-transactions',
  templateUrl: './additional-transactions.component.html',
  styleUrl: './additional-transactions.component.css'
})
export class AdditionalTransactionsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'bankreference',
    'entityname',
    'customername',
    'mobilenumber',
    'serviceName',
    'paymentmethod',
    'amount',
    // 'totalamount',
    'status',
    'view',
    'paidAt',
    'receipt',
    // 'CheckStatus',
    
    // 'view',

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
  showData: boolean = false;
  valueCustomizationexport: any;
  valueCustomizationReceipt: any;
  valueCustomizationView: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  showcategoryData!: boolean;
  valueCustomizationcheck: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex: number = 0;
  pageSize = 5;
  transactionexport: any;
  merchantId: any = localStorage.getItem('merchantId');

  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  roleName = localStorage.getItem('roleName')
  filter: boolean = true;
valueAdditionalexport: any;
valueAdditionalview: any;
valueAdditionalInvoice: any;
pageIndex2: number = 0;
  pageSize2 = 5;
 
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
 
 
 
  filter1:boolean=true;
  filter2:boolean=true;
  transactionValue:any;
currentfilval: any;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }



  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valueAdditionalexport = 'Additional Transactions-Export';
     this.valueAdditionalview='Additional Transactions-View';
     this.valueAdditionalInvoice='Additional Transactions-Invoice'
 
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
 
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Additional Transactions-Export') {
              this.valueAdditionalexport = 'Additional Transactions-Export'
            }
           if(this.actions=='Additional Transactions-View'){
            this.valueAdditionalview='Additional Transactions-View'
           }
           if(this.actions=='Additional Transactions-Invoice'){
            this.valueAdditionalInvoice='Additional Transactions-Invoice'
           }
          }
        }
 
      })
    }

    this.service.AdditionalPaymentsViewByMerchant(this.merchantId,this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1=false;
        this.filter2=false;
      }
      else if (res.flag == 2) {
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        this.message = res.responseMessage;
        this.filter = true;
        this.filter1=false;
        this.filter2=false;
      }

    });




  }


  Receiptview(id: any) {
    this.service.InvoiceAdditionalPayments(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }

  track(id:any){
    this.service.ChecKStatusAdditionalPayments(id).subscribe((res:any)=>{
      if(res.flag==1){
        this.toastr.success(res.responseMessage);
      }
    })
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


  reloaddata() {
    this.FromDateRange = "";
    this.ToDateRange = "";
    this.Daterange = "";
    this.currentPage = 1;
    this.ngOnInit();
  }


  viewreciept(id: any) {
    this.service.InvoiceAdditionalPayments(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }


  exportexcel() {
    this.service.Additionaltransexport(this.merchantId).subscribe((res: any) => {
      this.transaction = res.response;
      if (res.flag == 1) {
    let sno = 1;
    this.responseDataListnew = [];
    this.transaction.forEach((element: any) => {


      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId ||'-');
      this.response.push(element?.bankReference||'-');

      this.response.push(element?.customerId?.merchantId.merchantLegalName);
      this.response.push(element?.customerId?.customerName);
      this.response.push(element?.customerId?.mobileNumber);
      this.response.push(element?.addtionalCategory?.serviceName)
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      this.response.push(element?.paymentDateTime);
      this.response.push(element?.paymentStatus);

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
      "S.No",
      "PaymentId",
      "Bank Reference",
      "Entity Name",
      "Customer Name",
      "Mobile Number",
      "Service Name",
      "Payment Method",
      "Amount",
      "Paid At",
      "Status"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Additional Transaction');
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

      let qty10= row.getCell(11);



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


    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Additional Transactions.xlsx');
    });
  }






  filterdate() {

    this.service.AdditionalPaymentsDateFilter(this.merchantId,this.FromDateRange, this.ToDateRange, this.pageSize1, this.pageIndex1).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;

        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;

        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.filter1=true;
        this.filter2=false;
      }
      else if (res.flag == 2) {
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
        this.filter = false;
        this.filter1=true;
        this.filter2=false;
 
        this.message = res.responseMessage;
      }
    })
  }
  reset() {
    this.service.AdditionalPaymentsViewByMerchant(this.merchantId,this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1=false;
        this.filter2=false;
        this.FromDateRange='';
        this.ToDateRange='';
      }
      else if (res.flag == 2) {
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        this.message = res.responseMessage;
        this.filter = true;
        this.filter1=false;
        this.filter2=false;
        this.FromDateRange='';
        this.ToDateRange='';
      }

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

  View(id:any){
    this.dialog.open(AdditionalPayviewComponent,{
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,   
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
    console.log('New Page Index:', this.pageIndex2);
    console.log('New Page Size:', this.pageSize2);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.additionalsearch(this.currentfilval);
  }
 
  changePageIndex2(newPageIndex1: number) {
    this.pageIndex2 = newPageIndex1;
    this.renderPage2({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize2,
      // length: this.totalItems
    } as PageEvent);
  }
  additionalsearch(filterValue: string) {
   
    if (filterValue) {
    console.log(filterValue)
    this.service.AdditionalTransSearch(this.merchantId, filterValue,this.pageSize2,this.pageIndex2).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transactionValue = res.response;
          this.transactionValue.reverse();
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages2 = res.pagination.totalElements;
          this.totalpage2 = res.pagination.totalPages;
          this.currentpage2 = res.pagination.currentPage + 1;
          this.filter = false;
        this.filter1=false;
        this.filter2=true;
        }
        else if (res.flag === 2) {
          this.transactionValue = [];
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages2 = res.pagination.totalElements;
          this.totalpage2 = res.pagination.totalPages;
          this.currentpage2 = res.pagination.currentPage + 1;
          this.filter = false;
        this.filter1=false;
        this.filter2=true;
        }
      },
      // error: (err: any) => {
      //   this.toastr.error('No Data Found');
      // }
    });
  }
 else  if(!filterValue) {
    this.toastr.error('Please enter a value to search');
    return;
  }
  }
 
}
