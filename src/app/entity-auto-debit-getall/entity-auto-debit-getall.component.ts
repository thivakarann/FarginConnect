import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-auto-debit-getall',
  templateUrl: './entity-auto-debit-getall.component.html',
  styleUrl: './entity-auto-debit-getall.component.css'
})
export class EntityAutoDebitGetallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantLogId',
    'accountId',
    'merchantLegalName',
    'categoryName',
    'planName',
    'rentalAmount',
    'rentalPeriod',
    'fromLedger',
    "toLedger",
    'reason',
    'createAt'
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
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueautodebitexport: any;
  maxScroll = 100; // Set the maximum value for the slider
  scrollValue = 0;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter: boolean = true;
  currentFilterValue: string = '';

  constructor(
    public autodebitdetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.autodebitdetails.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueautodebitexport = 'Cloud Fee AutoDebit-Export'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Cloud Fee AutoDebit-Export') {
                this.valueautodebitexport = 'Cloud Fee AutoDebit-Export'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.autodebitdetails.autodebitgetall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.viewall = res.response;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter=false;

    });
  }

  onSliderChange(event: any) {
    const scrollPercentage = event.target.value / this.maxScroll;
    const container = this.tableContainer.nativeElement;
    if (container) {
      container.scrollLeft = container.scrollWidth * scrollPercentage;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    this.autodebitdetails.autodebitgetall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.viewall = res.response;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter=false;

    });
  }

  exportexcel() {
    this.autodebitdetails.autodebitgetallExport().subscribe((res: any) => {
      this.viewallexport = res.response;
      if (res.flag == 1) {
 
        let sno = 1;
        this.responseDataListnew = [];
        this.viewallexport.forEach((element: any) => {
          let createdate = element.createdDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.accountId);
          this.response.push(element?.userModel.merchantLegalName);
          this.response.push(element?.userModel.businessCategoryModel.categoryName);
          this.response.push(element?.planName);
          this.response.push(element?.rentalAmount);
          this.response.push(element?.rentalPeriod);
          this.response.push(element?.fromLedger);
          this.response.push(element?.toLedger);
          this.response.push(element?.reason);
          this.response.push(element?.createAt);
 
 
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
      "S.No",
      "Account Id",
      "Merchant Legal Name",
      "Business Category",
      "Plan Name",
      "Cloud Fee Amount",
      "Cloud Fee Period",
      "From Ledger Id",
      "To Ledger Id",
      "Reason",
      "Created At"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cloud Fee Auto Debit');
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
 
    }
    );
 
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'MMC Auto Debits.xlsx');
 
    });
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
  autodebit(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
 
    this.autodebitdetails.Mmcautodebit(filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewall = res.response;
          // this.viewall.reverse();
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = true;
        }
        else if (res.flag === 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = false;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
 
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.autodebit(this.currentFilterValue);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
 

}
