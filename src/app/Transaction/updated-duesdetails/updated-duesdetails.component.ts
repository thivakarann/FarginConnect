import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ViewReasonComponent } from '../view-reason/view-reason.component';

@Component({
  selector: 'app-updated-duesdetails',
  templateUrl: './updated-duesdetails.component.html',
  styleUrl: './updated-duesdetails.component.css'
})
export class UpdatedDuesdetailsComponent {
  merchantId: any = localStorage.getItem('merchantId')
  dataSource: any;
  displayedColumns: any[] = [
    'sno',
    'customerrefId',
    // 'customerId',
    'customername',
    'customermobile',
    'paymentid',
    'status',
    'view',
    "previousamount",
    'currentamount',
    'updatedat'
       ];
  transactionValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseDataListnew: any[] = [];
  response: any[] = []
  date1: any;
  duesValue: any;
  valueduesexport: any;
  valueduesgenerate: any;
  valueduesview: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  imageUrl: any;
  DocView: boolean = false;
  valueduesReceipt: any;
  valueduesmanual: any;
  valueduesRefund: any;
  roleName = localStorage.getItem('roleName')
  valueReverseDues: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionValueexport: any;
  isFullPolicyVisible: boolean = false;
  limit: number = 30;
  date2: any;
  customerPayId: any;
searchPerformed: boolean=false;
 
  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog,
    private toastr: ToastrService,private ActivateRoute:ActivatedRoute,private location:Location
  ) { }
 
  ngOnInit(): void {
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.customerPayId = param.Alldata;
 
    });
 
 
    this.service.updatedduesdetailsbyid(this.customerPayId, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.transactionValue = res.response;
     
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return (
              currentTerm +
              (typeof data[key] === 'object'
                ? JSON.stringify(data[key])
                : data[key])
            );
          }, '')
          .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      }
    });
 
 
 
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
 
 
 
  exportexcel() {
    this.service.transactionViewExport(this.merchantId).subscribe((res: any) => {
      this.transactionValueexport = res.response;
      if (res.flag == 1) {
 
 
        let sno = 1;
        this.responseDataListnew = [];
        this.transactionValueexport?.forEach((element: any) => {
          let createdate = element.createdDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerId?.customerReferenceId);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.customerId?.mobileNumber);
          this.response.push(element?.paidAmount);
          this.response.push(element?.reason)
 
          this.response.push(element?.paymentStatus);
          this.response.push(this.date1);
 
          if(element.paymentDateTime){
            this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else{
            this.response.push('');
          }
          if (element?.dueStatus == '1') {
            this.response.push('Dues Reversed');
          }
          else {
            this.response.push('Not Reversed');
          }
 
 
 
 
          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    })
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      'Customer Id',
      "Payment id",
      "Category Name",
      "Customer Mobile",
     
      "Amount",
      'Reason',
      "Status",
      "Due Generated At",
      "Paid At",
      "Reverse Status"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Dues Reports');
    // Blank Row
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
 
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Customer Dues.xlsx');
    });
  }
 
  reload() {
    window.location.reload()
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
  close(){
    this.location.back()
  }

  view(id:any){
    this.dialog.open(ViewReasonComponent,{
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "1000ms",
      // disableClose: true,
      data: { value: id }
    })
 
  }
 
}
