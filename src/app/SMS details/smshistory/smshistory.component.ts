import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { SmscontentViewComponent } from '../smscontent-view/smscontent-view.component';

@Component({
  selector: 'app-smshistory',
  templateUrl: './smshistory.component.html',
  styleUrl: './smshistory.component.css'
})
export class SMSHistoryComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityname',
    'mobile',
    'smsType',
    'smsTempDescription',
    'responseStatus',
    'smscharge',
    'perSmsAmount',
    'date',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  FromDateRange: string = '';
  currentPage!: number;
  ToDateRange: string = '';
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
  showcategoryData: boolean = false;
  smsResponse: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valuesmshistoryexport: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  limit: number = 30;
  pageIndex: number = 0;
  pageSize = 5;
  smsResponseexport: any;
  Visible: boolean = false;

  pageIndex1: number = 0;
  pageSize1 = 5;

  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  transactionexport: any;
  pageIndex2: number = 0;
  pageSize2 = 5;

  totalpage2: any;
  totalPages2: any;
  currentpage2: any;

  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal: any = "";
  maxDate: any;
  currentfilvalShow: boolean = false;
  transactionValue: any;
  searchPerformed: boolean = false;
  filterAction: any = 0;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuesmshistoryexport = 'SMS History-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'SMS History-Export') {
                this.valuesmshistoryexport = 'SMS History-Export';
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.Getall();
  }

  Getall() {
    this.service.SmsHistoryGetAll(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsResponse = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.currentfilvalShow = false;

      } else if (res.flag == 2) {
        this.smsResponse = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.currentfilvalShow = false;
      }
    });
    this.FromDateRange ='';
    this.ToDateRange = '';
  }

  checkDate() {
    this.ToDateRange = '';
  }


  View(id: any) {
    this.router.navigate([`dashboard/smshistory-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }


  filterdate() {
    this.service.SMSHistoryFilter(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.filterAction = 1

      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
      }
    })
  }

  smshistory(filterValue: string) {
    if (filterValue) {
      this.service.Smshistorysearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.smsResponse = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);
            this.currentfilvalShow = true;

          } else if (res.flag == 2) {
            this.smsResponse = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);
            this.currentfilvalShow = true;

          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else if (filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }


  getData(event: any) {
    if (this.filterAction == 1) {
      this.service.SMSHistoryFilter(this.FromDateRange, this.ToDateRange, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
        } else if (res.flag == 2) {
          this.transaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
        }
      })
    }
    else if (this.currentfilvalShow) {
      this.service.Smshistorysearch(this.currentfilVal, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.smsResponse = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);


          } else if (res.flag == 2) {
            this.smsResponse = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.smsResponse);


          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else {
      this.service.SmsHistoryGetAll(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.smsResponse = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.smsResponse);


        } else if (res.flag == 2) {
          this.smsResponse = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.smsResponse);


        }
      })
    }
  }

  description(id: any) {
    this.dialog.open(SmscontentViewComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true
    })
  }

  exportexcel() {
    this.service.SmsHistoryGetAllExport().subscribe((res: any) => {
      this.smsResponseexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.smsResponseexport.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.merchantId?.accountId);
          this.response.push(element?.merchantId?.entityName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.merchantSmsId?.type?.smsTitle);
          this.response.push(element?.responseCode);
          this.response.push(element?.responseStatus);
          this.response.push(element?.smsChargeStatus);
          this.response.push(element?.perSmsAmount);
          if (element.merchantSmsId?.createdDateTime) {
            this.response.push(moment(element?.merchantSmsId?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }
          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }

  excelexportCustomer() {
    const header = [
      'SNo',
      'Account Id',
      'Entity Name',
      'Mobile Number',
      'SMS Type',
      'SMS Code',
      'SMS Status',
      'SMS Charge type',
      'Charge For SMS',
      'Created At',
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sms Settings');
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

    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); FileSaver.saveAs(blob, 'Sms-History.xlsx');
    });
  }

}
