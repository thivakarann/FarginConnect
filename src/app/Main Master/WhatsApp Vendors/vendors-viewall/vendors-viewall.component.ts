import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VendorsAddComponent } from '../vendors-add/vendors-add.component';
import { VendorsUpdateComponent } from '../vendors-update/vendors-update.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Getallstatus, VendorStatus } from '../../../fargin-model/fargin-model.module';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-vendors-viewall',
  templateUrl: './vendors-viewall.component.html',
  styleUrl: './vendors-viewall.component.css'
})
export class VendorsViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'SNo',
    'vendorName',
    'vendorMobile',
    'smsAmount',
    'token',
    'vendorGst',
    'vendorAddress',
    'enabled',
    'Edit',
    'userName',
    'password',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valuebanklistexport: any;
  valuebanklistadd: any;
  valuebankstatus: any;
  valuebankedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  valuetermViews: any;
  searchPerformed: boolean = false;
  copiedIndex2: number = -1;
  categoryList: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;

  constructor(
    public Vendordetails: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Getall();
  }

  Getall() {
    let submitModel: Getallstatus = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: ''
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.Vendordetails.VendorsViewall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.categoryList = this.viewall.content;
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.categoryList = this.viewall.content;
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
    });
  };


  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.toastr.error('Please Enter the Text');
    }
    else {
      let submitModel: Getallstatus = {
        pageNumber: '',
        pageSize: 5,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: filterValue
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.Vendordetails.VendorsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;

        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  AddVendor() {
    const dialogRef = this.dialog.open(VendorsAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };


  Edit(id: any) {
    const dialogRef = this.dialog.open(VendorsUpdateComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  ActiveStatus(id: any) {
    let submitModel: VendorStatus = {
      whatsappVendorId: id
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.Vendordetails.VendorsStatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.Getall(); }, 200);
      }
      else { this.toastr.error(res.messageDescription); }
    });
  };

  copyText(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex2 = index;
    setTimeout(() => this.copiedIndex2 = -1, 2000);
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: ''
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.Vendordetails.VendorsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;

        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        }
      });
    }
    else {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: this.currentfilval
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.Vendordetails.VendorsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;

        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
        }
      });
    }

  }

  Exportall() {
    if (this.totalPages != 0) {
      const payload = {
        pageNumber: 0,
        pageSize: this.totalPages,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: ''
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.Vendordetails.VendorsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.viewall.content);
        } else {
          console.error('No Data Found');
        }
      });
    }
  }

  exportexcel(data: any[]) {
    let sno = 1;
    this.responseDataListnew = [];
    data.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.vendorName);
      this.response.push(element?.vendorMobileNumber);
      this.response.push(element?.smsAmount);
      if (element?.status == 1) { this.response.push("Active"); }
      else { this.response.push("InActive"); }
      this.response.push(element?.token);
      this.response.push(element?.vendorGst);
      this.response.push(element?.vendorAddress);
      this.response.push(element?.userName);
      this.response.push(element?.password);
      this.response.push(element?.createdby);
      if (element?.createdDateTime) { this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a')); }
      else { this.response.push(''); }
      this.response.push(element?.modifiedBy);
      if (element?.modifiedDateTime) { this.response.push(moment(element?.modifiedDateTime).format('DD/MM/yyyy hh:mm a')); }
      else { this.response.push(''); }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'SNo',
      'VendorName',
      'vendorMobile',
      'Message Amount',
      'Status',
      'Token',
      'vendor Gst',
      'vendor Address',
      'UserName',
      'Password',
      'CreatedBy',
      'CreatedAt',
      'ModifiedBy',
      'ModifiedAt',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ISP-Provider-Details');
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

    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Vendors Details.xlsx');
    });
  };

}
