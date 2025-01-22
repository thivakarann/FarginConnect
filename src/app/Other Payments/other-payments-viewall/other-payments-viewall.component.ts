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
import { OtherpayViewComponent } from '../otherpay-view/otherpay-view.component';

@Component({
  selector: 'app-other-payments-viewall',
  templateUrl: './other-payments-viewall.component.html',
  styleUrl: './other-payments-viewall.component.css'
})
export class OtherPaymentsViewallComponent {
  dataSource:any;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'paymentmethod',
    'amount',
    'cgstPercentage',
    'sgstPercentage',
    'igstPercentage',
    'totalPayableAmount',
    'paidAt',
    'status',
    'viewdata',
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
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valueotherexport: any;
  valueotherreceipt: any;
  valueotherpay: any;
  roleName = localStorage.getItem('roleName')
  valueotherview: any;
searchPerformed: boolean=false;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.service.OtherpaymentById(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response.reverse();
 
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
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
     
       
      }
     
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.transaction.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
     
 
    })

    this.service.pgmodes().subscribe((res: any) => {
      if (res.flag == 1) {
        this.ApiKey = res.response.apiKey;
      }
    })

    if (this.roleName == 'Merchant Super admin') {
      this.valueotherexport = 'Customizations Payments-Export'
      this.valueotherpay = 'Customizations Payments-Pay'
      this.valueotherreceipt = 'Customizations Payments-Invoice',
        this.valueotherview = 'Customizations Payments-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Customizations Payments-Export') {
              this.valueotherexport = 'Customizations Payments-Export'
            }
            if (this.actions == 'Customizations Payments-Pay') {
              this.valueotherpay = 'Customizations Payments-Pay'
            }
            if (this.actions == 'Customizations Payments-Invoice') {
              this.valueotherreceipt = 'Customizations Payments-Invoice'
            }
            if (this.actions == 'Customizations Payments-View') {
              this.valueotherview = 'Customizations Payments-View'
            }
          }
        }

      })
    }

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
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
      // let createdate = element.paymentDateTime;
      // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      // let moddate = element.modifiedDatetime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.serviceName);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      this.response.push(element?.cgstPercentage);
      this.response.push(element?.sgstPercentage);
      this.response.push(element?.igstPercentage);
      this.response.push(element?.totalPayableAmount);
      if(element.paymentDateTime){
        this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
      this.response.push(element?.paymentStatus);
 
     
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
    'S No',
    'PaymentId',
    'Service Name',
    'Payment Method',
    'Amount',
    'Cgst',
    'Sgst',
    'Igst',
    'TotalPayableAmount',
    'PaidAt',
    'Status',
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
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
 
 
 
 
 
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

  view(id: any) {
    this.dialog.open(OtherpayViewComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',

    })
  }
  reload() {
    window.location.reload()
  }

  otherpayment(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.OtherPayment(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.transaction.reverse();
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.transaction = [];
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
}
