import { Component, ViewChild } from '@angular/core';
import { BranchesIndividualViewComponent } from '../branches-individual-view/branches-individual-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FarginServiceService } from '../../service/fargin-service.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branches-viewall',
  templateUrl: './branches-viewall.component.html',
  styleUrl: './branches-viewall.component.css'
})
export class BranchesViewallComponent {
  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'sno',
    // 'merchantLegalName',
    'branchName',
    // 'apiKey',


    'bankName',
    'ifscCode',
    'accountHolderName',
    'accountNumber',
    'status',
    'Customerview',
   'TerminalView'
  ];


  branchview: any;
  responseDataListnew: any = [];

  response: any = [];
  merchantId: any = localStorage.getItem('merchantId');
  date1: any;
  date2: any;
  valuebranchexport: any;
  valuebranchView: any;
  valuebranchCustomerDetails: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')

  roleName = localStorage.getItem('roleName')


  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex: number = 0;
  pageSize = 5;
  filter: boolean = true;
 
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  currentFilterValue: string = '';

  constructor(private service: FarginServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    if (this.roleName == 'Merchant Super admin') {
      this.valuebranchexport = 'Branch-Export';
      // this.valuebranchView = 'Branch-View'
      this.valuebranchCustomerDetails = 'Branch-Customer Details'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Branch-Export') {
              this.valuebranchexport = 'Branch-Export'
            }
            // if (this.actions == 'Branch-View') {
            //   this.valuebranchView = 'Branch-View'
            // }
            if (this.actions == 'Branch-Customer Details') {
              this.valuebranchCustomerDetails = 'Branch-Customer Details'
            }
          }
        }

      })
    }

    this.service.BranchIndividualView(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchview = res.response.content;
        this.branchview.reverse();
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
      }
    });



  }

  reload() {
    this.service.BranchIndividualView(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchview = res.response.content;
        this.branchview.reverse();
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
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
    this.dialog.open(BranchesIndividualViewComponent, {
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
      this.response.push(element?.branchName);
      // this.response.push(element?.apiKey);
      // this.response.push(element?.secretKey);
      this.response.push(element?.bankName);
      this.response.push(element?.ifscCode);
      this.response.push(element?.accountHolderName);
      this.response.push(element?.accountNumber);
      if (element?.accountStatus == '1') {
        this.response.push('Active')
      }
      else {
        this.response.push('Inactive')
      }
      // this.response.push(element?.createdBy);
      // if (element.createdAt) {
      //   this.response.push(moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString());
      // }
      // else {
      //   this.response.push('');
      // }
      // this.response.push(element?.modifiedBy);
      // if (element.modifiedAt) {
      //   this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy hh:mm a').toString());
      // }
      // else {
      //   this.response.push('');
      // }


      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      'S No',
      'Branch Name',
      'Bank Name',
      'Ifsc Code',
      'Account Holder Name',
      'Account Number',
      'Status',
      // 'Createdby',
      // 'Createdat',
      // 'ModifiedBy',
      // 'ModifiedAt'
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
      // let qty7 = row.getCell(8);
      // let qty8 = row.getCell(9);
      // let qty9 = row.getCell(10);
      // let qty10 = row.getCell(11);
      // let qty11 = row.getCell(12);
      // let qty12 = row.getCell(13);




      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


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
  branchsearch(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
 
    this.service.BranchSearch(this.merchantId,filterValue,this.pageSize1,this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.branchview = res.response;
          // this.viewall.reverse();
          this.totalPages1 = res.pagination.totalElements;
          this.totalpage1 = res.pagination.totalPages;
          this.currentpage1 = res.pagination.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.branchview);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = true;
        }
        else if (res.flag === 2) {
          this.branchview = [];
          this.dataSource = new MatTableDataSource(this.branchview);
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
 
 
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.branchsearch(this.currentFilterValue);
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
 
 
  search(filterValue: string) {
    this.currentFilterValue = filterValue;
    this.pageIndex1 = 0; // Reset to the first page for a new search this.autodebit(filterValue); // Initiate the search with the new filter value }
}
 
ViewTerminal(id: any, id1: any) {
  this.router.navigate([`dashboard/BranchTerminalview/${id}/${id1}`], {
    queryParams: { Alldata: id, All: id1 },
  });
}

}

