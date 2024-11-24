import { Component, ElementRef, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-overall-customer-view',
  templateUrl: './overall-customer-view.component.html',
  styleUrl: './overall-customer-view.component.css'
})
export class OverallCustomerViewComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  displayedColumns: string[] = [
    'customerId',
    'customerName',
    'entityName',
    'merchantLegalName',
    'categoryName',
    // 'stbNumber',
    'emailAddress',
    'mobileNumber',
    'routeassigned',
    'Viewcustomer',
    // 'flatNumber',
    // 'blockNumber',
 
  ];

  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  overallcustomer: any;
  valueCustomerExport: any;
  valueCustomerView: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  overallcustomerexport: any;
  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.EntityViewall.rolegetById(this.roleId).subscribe({
      next: (res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueCustomerView = 'Customers-View';
            this.valueCustomerExport = 'Customers-Export'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Customers-View') {
                this.valueCustomerView = 'Customers-View';
              }
              if (this.actions == 'Customers-Export') {
                this.valueCustomerExport = 'Customers-Export'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });



    this.EntityViewall.OverallCustomer(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.overallcustomer = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.overallcustomer.reverse();
        this.dataSource = new MatTableDataSource(this.overallcustomer);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.showcategoryData = false;
      }
      else {
        this.showcategoryData = true;
      }

    });



  }



  reload() {
    window.location.reload()
  }

  Viewparticularcustomer(id: any) {
    this.router.navigate([`dashboard/Overall-IndividualCustomer-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  exportexcel() {

    this.EntityViewall.OverallCustomerExport().subscribe((res: any) => {

      this.overallcustomerexport = res.response;


      if (res.flag == 1) {


        let sno = 1;
        this.responseDataListnew = [];
        this.overallcustomerexport.forEach((element: any) => {

          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerName);
          this.response.push(element?.merchantId?.entityName);
          this.response.push(element?.merchantId?.merchantLegalName);
          this.response.push(element?.merchantId?.businessCategoryModel?.categoryName);
          this.response.push(element?.emailAddress);
          this.response.push(element?.mobileNumber);

          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }



  excelexportCustomer() {
    const header = [
      "S.No",
      'Customer Name',
      'Entity Name',
      'Merchant Legal Name',
      'Category Name',
      'Email Address',
      'Mobile Number',

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Overall customer view');


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
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);




      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }



    }
    );

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Overall CustomerView.xlsx');

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

  customer(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.EntityViewall.CustomerSearch(filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.overallcustomer = res.response;
          this.overallcustomer.reverse();
          this.dataSource = new MatTableDataSource(this.overallcustomer);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.overallcustomer = [];
          this.dataSource = new MatTableDataSource(this.overallcustomer);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        this.toastr.error('Error fetching filtered regions');
      }
    });
  }

}
