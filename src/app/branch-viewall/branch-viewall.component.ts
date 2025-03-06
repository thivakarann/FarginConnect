import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { BranchIndividualviewComponent } from '../branch-individualview/branch-individualview.component';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch-viewall',
  templateUrl: './branch-viewall.component.html',
  styleUrl: './branch-viewall.component.css'
})
export class BranchViewallComponent {
  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'sno',
    'merchantLegalName',
    'branchName',
    'view',
    'Customerview',
    'bankName',
    'ifscCode',
    'accountHolderName',
    'accountNumber',
    // 'createdat',
    // 'createdby',
    // 'modifiedBy',
    // 'modifiedAt'
  ];


  branchview: any;
  responseDataListnew: any = [];

  response: any = [];
  valuebranchexport: any;
  valuebranchView: any;
  valuebranchCustomerDetails: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
 
  filter:boolean=false;
  currentfilval:any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  constructor(private service: FarginServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuebranchexport = 'Branch-Export'
            this.valuebranchView = 'Branch-View'
            this.valuebranchCustomerDetails = 'Branch-Customer Details'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Branch-Export') {
                this.valuebranchexport = 'Branch-Export'
              }
              if (this.actions == 'Branch-View') {
                this.valuebranchView = 'Branch-View'
              }
              if (this.actions == 'Branch-Customer Details') {
                this.valuebranchCustomerDetails = 'Branch-Customer Details'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.BranchIndividualView(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchview = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
      else if (res.flag === 2) {
        this.branchview = [];
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
 
      }
    });




  }

  reload() {
  
    this.service.BranchIndividualView(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchview = res.response;
        this.branchview.reverse();
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
      else if (res.flag === 2) {
        this.branchview = [];
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
 
      }
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewbranch(id: any) {
    this.dialog.open(BranchIndividualviewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      data: { value: id }
    })
  }

  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/branch-customer-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.branchview.forEach((element: any) => {
 
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.entityName);
      this.response.push(element?.branchName);
      this.response.push(element?.apiKey);
      this.response.push(element?.secretKey);
      this.response.push(element?.bankName);
      this.response.push(element?.ifscCode);
      this.response.push(element?.accountHolderName);
      this.response.push(element?.accountNumber);
   
      this.response.push(element?.createdBy);
      if (element.createdAt) {
        this.response.push(moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('');
      }
      this.response.push(element?.modifiedBy);
      if (element.modifiedAt) {
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('');
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
      'Entity Name',
      'BranchName',
      'ApiKey',
      'SecretKey',
      'BankName',
      'IfscCode',
      'AccountHolderName',
      'AccountNumber',
   
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Branch');
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
 
 
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
 
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Branch.xlsx');
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

  branchviewall(filterValue: string) {
  console.log(filterValue);
 

    if (filterValue) {
    this.service.BranchViewallSearch(filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.branchview = res.response;
          this.branchview.reverse();
          this.dataSource = new MatTableDataSource(this.branchview);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true

        }
        else if (res.flag === 2) {
          this.branchview = [];
          this.dataSource = new MatTableDataSource(this.branchview);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.filter=true
        }
      },
   
    });
  }
  else if(!filterValue) {
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
    this.branchviewall(this.currentfilval);
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

