import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import moment from 'moment';
import { manualpay } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-manual-transaction',
  templateUrl: './manual-transaction.component.html',
  styleUrl: './manual-transaction.component.css'
})
export class ManualTransactionComponent {
  responseDataListnew: any = [];
  response: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Id',
    'paymentId',
    'paidamount',
    'maintenanceAmount',
    'voiceBoxAdvAmount',
    'voiceBoxSetupAmount',
    'gstnumber',
    'totalpay',
    'method',
    'status',
    'bankReference',
    'utrnumber',
    'cardNumber',
    'cardexpiry',
    'CheckStatus',
    'receipt',
    'paymentAt',
    'updatedBy',
    'updatedAt'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;
  duesValue: any;
  date1: any;

  constructor(
    public service: FarginServiceService,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.Getall();

  }

  Getall() {
    this.service.GetManualTransaction(this.id).subscribe((res: any) => {
      this.details = res.response;
      this.details = res.response.reverse();
      this.dataSource = new MatTableDataSource(this.details);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  close() {
    this.location.back()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  track(id: any) {
    let submitModel: manualpay = {
      payId: id?.merchantPayId,
    }
    this.service.Manualpay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => { this.Getall() }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  viewreciept(id: any) {
    this.service.ManualRecieptView(id).subscribe((res: any) => {
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
    this.details.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.paidAmount?.toFixed(2));
      this.response.push(element?.maintenanceAmount?.toFixed(2));
      this.response.push(element?.voiceBoxAdvAmount?.toFixed(2));
      this.response.push(element?.voiceBoxSetupAmount?.toFixed(2));
      this.response.push(element?.gstAmount?.toFixed(2));
      this.response.push(element?.totalPayableAmount?.toFixed(2));
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paymentStatus);
      this.response.push(element?.bankReference);
      this.response.push(element?.utrNumber);
      this.response.push(element?.cardNoMasked);
      this.response.push(element?.cardExpiry);
      if (element?.paymentDateTime) { this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a')); }
      else { this.response.push(''); }
      this.response.push(element?.updatedBy === null || element?.updatedBy === 'null' ? '-' : element?.updatedBy);
      if (element?.updatedAt) { this.response.push(moment(element?.updatedAt).format('DD/MM/yyyy hh:mm a')); }
      else { this.response.push(''); }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S No',
      'Payment Id',
      'Setup Fee',
      'maintenanceAmount',
      'voiceBoxAdvAmount',
      'voiceBoxSetupAmount',
      'Gst Amount',
      'Total Payable Amount',
      'Payment Method',
      'Status',
      'Bank Reference',
      'Reference No',
      'Card Number',
      'Card Expiry',
      'Paid At',
      'Manual UpdatedBy',
      'Manual Updated At'
    ]

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Payment Dues');

    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
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
      let qty15 = row.getCell(16);
      let qty16 = row.getCell(17);


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
      qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty16.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'One-TimePayment Payment History.xlsx');
    });
  }


}
