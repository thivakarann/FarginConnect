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
import { OtherMakePayment } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-other-payments',
  templateUrl: './other-payments.component.html',
  styleUrl: './other-payments.component.css'
})
export class OtherPaymentsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'paymentmethod',
    'amount',
    'paidAt',
    'status',
    'receipt',
    'view'
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
  merchantId: any = localStorage.getItem('merchantId')
  payid: any;
  TransactionId: any;
  orderReference: any;
  secureHash: any;
  Address: any;
  ApiKey: any;
  City: any;
  Email: any;
  Mobile: any;
  EntityName: any;
  Pincode: any;
  Statename: any;
  makepayment: any;
  TrackId: any;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.service.OtherpaymentById(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        
        this.TrackId = res.response[0].trackId;
        this.Address = res.response[0].merchantId?.billingAddress.trim();
        
        this.City = res.response[0].merchantId?.city.trim();
        
        this.Email = res.response[0].merchantId?.contactEmail.trim();
        
        this.Mobile = res.response[0].merchantId?.contactMobile.trim();
        
        this.EntityName = res.response[0].merchantId?.entityName.trim();
        
        this.Pincode = res.response[0].merchantId?.zipcode.trim();
        
        this.Statename = res.response[0].merchantId?.stateName.trim();
        
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    })
    this.service.pgmodes().subscribe((res: any) => {
      if (res.flag == 1) {
        this.ApiKey = res.response.apiKey;
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
    // const datepipe: DatePipe = new DatePipe("en-US");
    // let formattedstartDate = datepipe.transform(this.FromDateRange, "dd/MM/YYYY HH:mm");
    // let formattedendDate = datepipe.transform(this.ToDateRange, "dd/MM/YYYY HH:mm");
    // this.Daterange = formattedstartDate + " " + "-" + " " + formattedendDate;
    // this.currentPage = 1;

    // this.service.OtherPay().subscribe((res: any) => {
    //   if (res.flag == 1) {

    //     this.transaction=res.response;
    //     this.dataSource = new MatTableDataSource(this.transaction);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   }
    // })
  }
  reset() {
    window.location.reload();
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
      this.response.push(element?.paymentId);
      this.response.push(element?.serviceName);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      this.response.push(this.date1);

      if (element?.paymentStatus == 'Success') {
        this.response.push(element?.paymentStatus);
      }
      else if (element?.paymentStatus == 'Pending') {
        this.response.push(element?.paymentStatus);
      }
      else if (element?.paymentStatus == 'Initiated') {
        this.response.push(element?.paymentStatus);
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
      'paymentId',
      'entityname',
      'paymentmethod',
      'amount',
      'paidAt',
      'status',
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customized Transactions');
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
      FileSaver.saveAs(blob, 'Customized Transaction.xlsx');
    });
  }

  makepay(id: any) {
    this.payid = id;
    let submitModel: OtherMakePayment = {
      payId: this.payid
    }
    this.service.OtherMakePayment(submitModel).subscribe((res: any) => {
      this.TransactionId = res.transactionId;
      
      this.service.OtherPaymentCreateOrder(this.TransactionId).subscribe((res: any) => {
        this.orderReference = res.response.orderReference;
        this.service.OtherPaymentInitiateOrder(this.TransactionId).subscribe((res: any) => {
          this.secureHash = res.response;
          
        })
        onload = function () {
          document
            .createElement('form')
            .submit.call(document.getElementById('FormType'));
        };
        const myTimeout = setTimeout(onload, 500);


      })
    })


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

}
