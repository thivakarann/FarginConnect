import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MerchantTransaction } from '../../fargin-model/fargin-model.module';
import { MerchantTransactionViewComponent } from '../merchant-transaction-view/merchant-transaction-view.component';


@Component({
  selector: 'app-overall-transactions-viewall',
  templateUrl: './overall-transactions-viewall.component.html',
  styleUrl: './overall-transactions-viewall.component.css'
})
export class OverallTransactionsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'paymentId',
    'entityname',
    'customername',
    'paymentmethod',
    'amount',
    'paidAt',
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
  valueTransactionExport: any;
  valueTransactionView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;


  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }



  ngOnInit(): void {



    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1){
          this.getdashboard = res.response?.subPermission;
          
          if (this.roleId == 1) {
            this.valueTransactionExport = 'Transactions-Export';
            this.valueTransactionView = 'Transactions-View'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              

              if (this.actions == 'Transactions-Export') {
                this.valueTransactionExport = 'Transactions-Export';
              }
              if (this.actions == 'Transactions-View') {
                this.valueTransactionView = 'Transactions-View';
              }


            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    let submitModel: MerchantTransaction = {
      accountId: "338",
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: this.Daterange,
      status: ""
    }
    this.service.TransactionForMerchant(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.data?.content;
        this.filteredData = this.content;
        
        this.getallData = this.Viewall.data.totalElements;
        
        // this.toastr.success(res.responseMessage);
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  renderPage(event: any) {
    this.currentPage = event;
    this.ngOnInit();
  }
  reloaddata() {
    this.FromDateRange = "";
    this.ToDateRange = "";
    this.Daterange = "";
    this.currentPage = 1;
    this.ngOnInit();
  }

  filterdate() {
    const datepipe: DatePipe = new DatePipe("en-US");
    let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY HH:mm");
    this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    this.currentPage = 1;

    let submitModel: MerchantTransaction = {
      accountId: "338",
      pageNo: this.currentPage,
      size: '20',
      query: '',
      dateRange: this.Daterange,
      status: ""
    }
    this.service.TransactionForMerchant(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        
        this.Viewall = JSON.parse(res.response);
        this.content = this.Viewall?.data?.content;
        this.filteredData = this.content;

        this.getallData = this.Viewall.data.totalElements;
        
        this.toastr.success(res.responseMessage);
      }
    })
  }
  reset() {
    window.location.reload();
  }


  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.filteredData.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.accountId);
      this.response.push(element?.id);
      this.response.push(element?.request?.customerName);
      this.response.push(element?.etc?.customer);
      this.response.push(element?.etc.paymentMethod);
      this.response.push(element?.amount);
      this.response.push(this.date1);

      if (element?.completed == 'ATTEMPTED') {
        this.response.push(element?.completed);
      }
      else if (element?.completed == 'SUCCESS') {
        this.response.push(element?.completed);
      }
      else {
        this.response.push(element?.completed);
      }

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'sno',
      'accountId',
      'paymentId',
      'entityname',
      'customername',
      'paymentmethod',
      'amount',
      'paidAt',
      'status',

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
      FileSaver.saveAs(blob, 'Entity Transaction.xlsx');
    });
  }

  transactionview() {
    this.dialog.open(MerchantTransactionViewComponent)
  }
}
