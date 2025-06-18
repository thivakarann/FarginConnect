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
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-sms-viewall',
  templateUrl: './entity-sms-viewall.component.html',
  styleUrl: './entity-sms-viewall.component.css'
})
export class EntitySmsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'accountId',
    'entityname',
    'entityemail',
    'smsType',
    'smscount',
    // 'smscharge',
    'createdBy',
    'date',


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
  smsResponse: any;
  valueentitysmsexport: any;

  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  pageIndex2: number = 0;
  pageSize2 = 5;
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  smsResponseexport: any;
  currentfilval: any;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueentitysmsexport = 'Entity Sms-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Entity Sms-Export') {
                this.valueentitysmsexport = 'Entity Sms-Export';
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    })

    this.service.SmsGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
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
    })



  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    this.service.SmsGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
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
    })
  }

  exportexcel() {
    this.service.SmsGetAllExport().subscribe((res: any) => {
      this.smsResponseexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.smsResponseexport.forEach((element: any) => {
          let createdate = element.createdDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

          // let moddate = element.modifedDateTime;
          // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.merchantId?.accountId);

          this.response.push(element?.merchantId?.entityName);
          this.response.push(element?.merchantId?.contactEmail);
          this.response.push(element?.type?.smsTitle)
          this.response.push(element?.smsCount)
          //  this.response.push(element?.type?.smsCharge)
          this.response.push(element?.createdBy);

          if (element.createdDateTime) {
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
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
    // const title='Business Category';
    const header = [
      'S.No',
      'Account Id',
      'Entity Name',
      'Entity Email',
      'SMS Type',
      'SMS Count',
      // 'SMS Charge',
      'Created By',
      'Created At',

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sms Settings');
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
      // let qty8 = row.getCell(9);





      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity-Sms.xlsx');
    });
  }

  smsSearch(filterValue: string) {

    if (filterValue) {

      this.service.SmsviewallSearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transaction = res.response;

            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transaction);
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.transaction = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transaction);
            this.currentfilvalShow = true;
          }
        },

      });
    }

    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }



  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.SmsviewallSearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
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
        },

      });
    } else {
      this.service.SmsGetAll(event.pageSize, event.pageIndex).subscribe((res: any) => {
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
}
