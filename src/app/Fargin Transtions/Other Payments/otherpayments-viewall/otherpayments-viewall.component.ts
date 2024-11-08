import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OtherpaymentsViewComponent } from '../otherpayments-view/otherpayments-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { customizepay } from '../../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-otherpayments-viewall',
  templateUrl: './otherpayments-viewall.component.html',
  styleUrl: './otherpayments-viewall.component.css'
})
export class OtherpaymentsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'serviceName',
    'paymentmethod',
    'amount',
    'paidAt',
    'receipt',
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
  message: any;
  showData: boolean = false;
  valueCustomizationexport: any;
  valueCustomizationReceipt: any;
  valueCustomizationView: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  showcategoryData!:boolean;
  valueCustomizationcheck:any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex: number = 0;
  pageSize=5;
 
  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }
 
 
 
  ngOnInit(): void {
 
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
       
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
 
          if (this.roleId == 1) {
            this.valueCustomizationexport = 'Customized Transaction-Export'
            this.valueCustomizationView = 'Customized Transaction-View'
            this.valueCustomizationReceipt = 'Customized Transaction-Invoice'
             this.valueCustomizationcheck = 'Customized Transaction-Check Status'
 
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Customized Transaction-Export') {
                this.valueCustomizationexport = 'Customized Transaction-Export'
              }
              if (this.actions == 'Customized Transaction-View') {
                this.valueCustomizationView = 'Customized Transaction-View'
              }
              if (this.actions == 'Customized Transaction-Invoice') {
                this.valueCustomizationReceipt = 'Customized Transaction-Invoice'
              }
 
              if (this.actions == 'Customized Transaction-Check Status') {
                this.valueCustomizationcheck = 'Customized Transaction-Check Status'
              }
 
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
 
    this.service.OtherPay(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1;
        this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showData = false;
      }
      else if (res.flag == 2) {
        this.showData = true;
        this.message = res.responseMessage;
      }
 
    });
 
 
 
 
  }
 
 
 
  track(id: any) {
    let submitModel: customizepay = {
      payId: id?.payId,
    }
    this.service.Customizepay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }
      else {
        this.toastr.error(res.responseMessage);
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
    this.service.OtherPaymentReciept(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }
 
 
  exportexcel() {
   
    let sno = 1;
    this.responseDataListnew = [];
    this.transaction.forEach((element: any) => {
      let createdate = element.paymentDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      let moddate = element.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.merchantId?.merchantLegalName);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      this.response.push(this.date1);
 
      if (element?.paymentStatus == 'Success') {
        this.response.push('Success');
      }
      else if (element?.paymentStatus == 'Pending') {
        this.response.push('Pending');
      }
      else  {
        this.response.push('Initiated');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'SNo',
      'Payment Id',
      'Entity Name',
      'Payment Method',
      'Amount',
      'Paid At',
      'Status',
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Other Payment Transactions');
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
 
 
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
 
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Other Payment Transaction.xlsx');
    });
  }
 
 
 
  transactionview(id: any) {
 
    this.dialog.open(OtherpaymentsViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }
 
  filterdate() {
 
    this.service.OtherPayFilter(this.FromDateRange, this.ToDateRange,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData= false;
      }
      else if (res.flag == 2) {
        this.showcategoryData = true;
        this.message = res.responseMessage;
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
}
