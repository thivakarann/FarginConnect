import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { duespay, Statusadmin } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MerchantViewbyidComponent } from '../merchant-viewbyid/merchant-viewbyid.component';

@Component({
  selector: 'app-merchant-viewall',
  templateUrl: './merchant-viewall.component.html',
  styleUrl: './merchant-viewall.component.css'
})
export class MerchantViewallComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno", "paymentId", "planname", "PlanType", "startDate", "endDate", "createdDateTime", 'amount', 'smsTotalAmount', 'otherPayAmount', "otherpaymentview", 'sgstPercentage', 'cgstPercentage', 'igstPercentage',



    "Paidamount",
    // 'totalPayableAmount',
    "paymentStatus",
    "view", "dues", "invoice"]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  dues: any;
  maintenancepayid: any;
  transactionId: any;
  orderref: any;
  securehash: any;
  overalldata: any;
  mainpayid: any;
  entityname: any;
  email: any;
  mobile: any;
  billaddress: any;
  postalcode: any;
  city: any;
  apikey: any;
  statename: any;
  imageUrl: any;
  DocView: boolean = false;
  valuedues: any;
  valueDuesview: any;
  valueDuespayment: any;
  valueDuesInvoice: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valueduesExport: any;
  roleName = localStorage.getItem('roleName')
  date3: any;
  searchPerformed: boolean = false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.MerchantDues(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.dues = res.response;

        this.dataSource = new MatTableDataSource(this.dues.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.dues.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valueduesExport = 'Subscription-Export';
      this.valueDuesview = 'Subscription-View'
      this.valueDuespayment = 'Subscription-Pay'
      this.valueDuesInvoice = 'Subscription-Invoice'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;
          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Subscription-Export') {
              this.valueduesExport = 'Subscription-Export'
            }
            if (this.actions == 'Subscription-View') {
              this.valueDuesview = 'Subscription-View'
            }
            if (this.actions == 'Subscription-Pay') {
              this.valueDuespayment = 'Subscription-Pay'
            }
            if (this.actions == 'Subscription-Invoice') {
              this.valueDuesInvoice = 'Subscription-Invoice'
            }
          }

        }
      })
    }



  }
  isDisabled(paymentStatus: string): boolean {
    console.log('Payment Status:', paymentStatus);
    return paymentStatus !== 'Success';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    this.service.MerchantDues(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.dues = res.response;

        this.dataSource = new MatTableDataSource(this.dues.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.dues.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }



  

  submit(id: any) {

    this.overalldata = id;
    this.mainpayid = id.maintenancePayId;
    this.entityname = id.merchantId.entityName;
    this.email = id.merchantId.contactEmail;
    this.mobile = id.merchantId.contactMobile;
    this.billaddress = id.merchantId.billingAddress;
    this.postalcode = id.merchantId.zipcode;
    this.city = id.merchantId.city;
    // this.apikey = id.merchantId.apikey;
    this.statename = id.merchantId.stateName;
     let submitModel: duespay = {
      maintenancePayId: this.mainpayid
    };

    this.service.Duesmakepay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {


        this.transactionId = res.transactionId

        this.service.pgmodes().subscribe((res: any) => {
          this.apikey = res.response.apiKey;

          this.service.createdues(this.transactionId).subscribe((res: any) => {
            this.orderref = res.response.orderReference;


            this.service.Initiatedues(this.transactionId).subscribe((res: any) => {
              this.securehash = res.response;


            })
            onload = function () {
              document
                .createElement('form')
                .submit.call(document.getElementById('FormType'));
            };
            const myTimeout = setTimeout(onload, 500);

          })
        });
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });
  }


  invoice(id: any) {
    this.service.Trasactionreceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }


  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.dues.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let startdates = element.startDate;
      this.date2 = moment(startdates).format('DD/MM/yyyy').toString();
      let enddates = element.endDate;
      this.date3 = moment(enddates).format('DD/MM/yyyy').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.merchantId?.merchantPlanModel?.planName);
      this.response.push(element?.merchantId?.merchantPlanModel?.frequency);

      this.response.push(this.date2);
      this.response.push(this.date3);
      this.response.push(this.date1);
      this.response.push(element?.paidAmount);
      this.response.push(element?.smsTotalAmount);
      this.response.push(element?.otherPayAmount);
      // this.response.push(element?.stickerCount);a
      this.response.push(element?.sgstPercentage);
      this.response.push(element?.cgstPercentage);
      this.response.push(element?.igstPercentage);
      this.response.push(element?.totalPayableAmount);
      this.response.push(element?.paymentStatus);
      // this.response.push(element?.totalPayableAmount);
      // this.response.push(element?.modifiedDateTime);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Payment Id",
      "Plan Name",
      "Plan Type",
      "Start date",
      "End date",
      "Due Generated At",
      "Cloud Fee",
      "SMS Cost",
      "Other Pay Amount",

      "SGST",
      "CGST",
      "IGST",



      "Payable Amount",
      "Payment status",


    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Subscription');
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
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);
      // let qty15 = row.getCell(16);


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
      qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

      // qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );



    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Subscription.xlsx');

    });
  }

  view(id: any) {
    this.dialog.open(MerchantViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  Subscription(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.Subscription(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.dues = res.response;
          this.dues.reverse();
          this.dataSource = new MatTableDataSource(this.dues);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.dues = [];
          this.dataSource = new MatTableDataSource(this.dues);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }


  OtherpaymentsView(id:any){
  this.router.navigate([`dashboard/cloud-other-payments-view/${id}`],{
    queryParams:{alldata:id}
  })  
  }
}


