import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-duestatushistory',
  templateUrl: './duestatushistory.component.html',
  styleUrl: './duestatushistory.component.css',
})
export class DuestatushistoryComponent {
  merchantId = Number(localStorage.getItem('merchantId')) || '';
  history: any;
  date2: any;
  date1: any;
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'name',
    'mobile',
    'number',
    'method',
    'createdBy',
    'createdDateTime',
  ];

  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customerid: any;
  setupboxhistory: any;
  id: any;
  merchatid: any = localStorage.getItem('merchatId');
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId');
  roleName = localStorage.getItem('roleName');
  valuedueexport:any;


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
  filter:boolean=false;
  currentfilval: any;
   viewllexport:any;
  transactionValue: any;
searchPerformed: boolean=false;

  constructor(private service: FarginServiceService,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.service.customerduestatushistory(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.setupboxhistory = res.response.reverse();
          this.dataSource = new MatTableDataSource(this.setupboxhistory);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.filter=false;
      
        }
        // else if (res.flag == 2) {
        //   this.dataSource = new MatTableDataSource([]);
        //   this.totalPages = res.pagination.totalElements;
        //   this.totalpage = res.pagination.totalPages;
        //   this.currentpage = res.pagination.currentPage + 1;
        //   this.filter=false;
        // }
 
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.setupboxhistory);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter=false;
        }
      });

      if (this.roleName == 'Merchant Super admin') {
        this.valuedueexport = 'Due Status History-Export';
      }
      else {
        this.service.viewRole(this.roleId).subscribe((res: any) => {
   
          if (res.flag == 1) {
            this.getdashboard = res.response?.merchantSubPermission;
   
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions
   
              if (this.actions == 'Due Status History-Export') {
                this.valuedueexport = 'Due Status History-Export'
              }
             
            }
   
          }
        })
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
    this.service.customerduestatushistory(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxhistory = res.response.reverse();
        this.dataSource = new MatTableDataSource(this.setupboxhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
    
      }
      // else if (res.flag == 2) {
      //   this.dataSource = new MatTableDataSource([]);
      //   this.totalPages = res.pagination.totalElements;
      //   this.totalpage = res.pagination.totalPages;
      //   this.currentpage = res.pagination.currentPage + 1;
      //   this.filter=false;
      // }

      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.setupboxhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
    });

  }
  exportexcel() {
    this.service.DueStatusHistoryexport(this.merchantId).subscribe((res: any) => {
      this.setupboxhistory = res.response;
      if (res.flag == 1) {
    let sno = 1;
    this.responseDataListnew = [];
    this.setupboxhistory.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerName);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.setUpBoxNumber);
      this.response.push(element?.dueStatus);
      this.response.push(element?.createdBy);
      let createdate = element?.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyyhh:mm a').toString();
      this.response.push(this.date1);
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
      'Customer Name',
      'Customer Mobile Number',
      'Setupbox Number',
      'Due Status',
      'Modified By',
      'Modified At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Due Status History');
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
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
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

      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Due Status History.xlsx');
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
 
  customerpay(filterValue: string) {
 
    if (filterValue) {
    console.log(filterValue)
    this.service.customerduestatushistorySearch(this.merchantId, filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transactionValue = res.response;
          this.transactionValue.reverse();
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
        else if (res.flag === 2) {
          this.transactionValue = [];
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
      },
      // error: (err: any) => {
      //   this.toastr.error('No Data Found');
      // }
    });
  }
 else  if(!filterValue) {
    this.toastr.error('Please enter a value to search');
    return;
  }
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
      this.customerpay(this.currentfilval);
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
