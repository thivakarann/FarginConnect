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
    'customername',
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
        this.currentpage = res.pagination.currentPage+1;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

    this.service.CustomerTransactionsFilter(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {

        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage+1;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;
      }
      else if (res.flag == 2) {
        this.showcategoryData = true;
      }
    })
  }
  reset() {
    window.location.reload();
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
    if(res.flag==1){
        let sno = 1;
        this.responseDataListnew = [];
        this.transactionexport.forEach((element: any) => {
          let createdate = element.paymentDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
     
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.customerId?.merchantId?.merchantLegalName);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.paidAmount);
          this.response.push(this.date1);
     
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
      'Customer Name',
      'Payment Method',
      'Amount',
      'Paid At',
      'Status',

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Transactions');
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
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Transaction.xlsx');
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
          window.location.reload()
        }, 400);
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
}
