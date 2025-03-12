import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BranchCustomerIndividualviewComponent } from '../branch-customer-individualview/branch-customer-individualview.component';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-branch-customer-view',
  templateUrl: './branch-customer-view.component.html',
  styleUrl: './branch-customer-view.component.css'
})
export class BranchCustomerViewComponent implements OnInit {

  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
 
  viewallexport: any;
 
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  currentfilval:any;
  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'sno',
    'customerReferenceId',
    'customerName',
    'mobileNumber',
    'alterMobileNumber',
   
    'view',
    'blockNumber',
    'doorNumber',
    'freeLine',

  ];

  branchview: any;
  responseDataListnew: any = [];
  merchantid: any = localStorage.getItem('merchantId')
  response: any = [];
  id: any;
  branchcustview: any;
  branchoverallresponse:any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ActivateRoute: ActivatedRoute,
    private router: Router,
    private location:Location
  ) { }


  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });

    this.service.BranchCustomer(this.id,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchcustview = res.response.customerList;
        this.branchoverallresponse = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchcustview.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
      else if (res.flag === 2) {
        this.branchcustview = [];
        this.dataSource = new MatTableDataSource(this.branchcustview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
 
      }
 
    });
  }


  reload() {
    window.location.reload()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewcustomer(id:any){
        this.dialog.open(BranchCustomerIndividualviewComponent, {
          enterAnimationDuration: "500ms",
          exitAnimationDuration: "1000ms",
          data: { value: id,value1:this.branchoverallresponse }
        })
    }

    
  close() {
    this.location.back()
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
 
  branch(filterValue: string) {
  
    if (filterValue) {

    this.service.BranchCustomerSearch(this.id,filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.branchcustview = res.response.customerList;
          this.branchcustview.reverse();
          this.dataSource = new MatTableDataSource(this.branchcustview);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
 
        }
        else if (res.flag === 2) {
          this.branchcustview = [];
          this.dataSource = new MatTableDataSource(this.branchcustview);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
else  if (!filterValue) {
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
    this.branch(this.currentfilval);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }

exportexcel() {
  this.service.BranchCustomerExport(this.id).subscribe((res: any) => {
    this.branchcustview = res.response.customerList;
    if (res.flag == 1) {
      let sno = 1;
      this.responseDataListnew = [];
      this.branchcustview.forEach((element: any) => {

        this.response = [];
        this.response.push(sno);
        this.response.push(element?.customerReferenceId);
        this.response.push(element?.customerName);
        this.response.push(element?.mobileNumber);
        this.response.push(element?.alterMobileNumber);
        this.response.push(element?.blockNumber);
        this.response.push(element?.doorNumber);
        this.response.push(element?.freeLine);


        sno++;
        this.responseDataListnew.push(this.response);
      });
      this.excelexportCustomer();
    }
  });
}

excelexportCustomer() {
  // const title='Entity Details';
  const header = [
    'S No',
    'CustomerReferenceId',
    'Customer Name',
    'Mobile Number',
    'Alter Mobile Number',
    
    'Block Number',
    'Door Number',
    'FreeLine',
  ]


  const data = this.responseDataListnew;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Branch-Customer-View');

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
   
    qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

  }
  );

  workbook.xlsx.writeBuffer().then((data: any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Branch-Customer-View.xlsx');
  });
}

}
