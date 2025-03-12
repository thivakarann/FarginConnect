import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomerStatusComponent } from '../../Customer/customer-status/customer-status.component';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ReturnDuesComponent } from '../../Transaction/return-dues/return-dues.component';
import { CommentbyComponent } from '../../Transaction/transaction-view/commentby/commentby.component';
import { TransactionManualpayComponent } from '../../Transaction/transaction-manualpay/transaction-manualpay.component';
import { TransactionViewbyidComponent } from '../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { ManuvalpayWithoutOtpComponent } from '../../Transaction/manuvalpay-without-otp/manuvalpay-without-otp.component';
import { UpdateCusduesComponent } from '../../Transaction/update-cusdues/update-cusdues.component';

@Component({
  selector: 'app-dashboardviewpendingcustomer',
  templateUrl: './dashboardviewpendingcustomer.component.html',
  styleUrl: './dashboardviewpendingcustomer.component.css'
})
export class DashboardviewpendingcustomerComponent {
  merchantId: any = localStorage.getItem('merchantId')
  dataSource: any;
  displayedColumns: any[] = ['sno', 'customerReferenceId', 'transactionId', 'setupBoxNumber', 'serviceProviderName', 'customername', "mobileNumber", 'amount', 'updateamount', 'status', 'createdat', 'paidat', 'view', 'Receipt', 'manualpayment', 'refund',"logsview", 'dues', 'reverse', 'commentby',];
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
  searchPerformed: boolean = false;
  manuvalpaymentstatus: any = localStorage.getItem('customerManualStatus');
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter:boolean=false;
currentfilval: any;
  viewllexport: any;

  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.service.dashboardviewallpendings(this.merchantId,this.pageSize,this.pageIndex).subscribe((res: any) => {

      if(res.flag==1){
        this.transactionValue = res.response;
        this.dataSource = new MatTableDataSource(this.transactionValue.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.transactionValue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=false;
      }
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valueduesexport = 'Customer dues-Export';
      this.valueduesview = 'Customer dues-View';
      this.valueduesReceipt = 'Customer dues-Receipt';
      this.valueduesmanual = 'Customer dues-Manual Payment';
      this.valueduesRefund = 'Customer dues-Refund';
      this.valueReverseDues = 'Customer dues-Reverse Dues'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Customer dues-Export') {
              this.valueduesexport = 'Customer dues-Export'
            }

            if (this.actions == 'Customer dues-View') {
              this.valueduesview = 'Customer dues-View'
            }

            if (this.actions == 'Customer dues-Receipt') {
              this.valueduesReceipt = 'Customer dues-Receipt'
            }
            if (this.actions == 'Customer dues-Manual Payment') {
              this.valueduesmanual = 'Customer dues-Manual Payment'
            }
            if (this.actions == 'Customer dues-Refund') {
              this.valueduesRefund = 'Customer dues-Refund'
            }
            if (this.actions == 'Customer dues-Reverse Dues') {
              this.valueReverseDues = 'Customer dues-Reverse Dues'
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


  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }



  refund(viewall: any) {
    let submitModel =
    {
      payId: viewall.customerPayId,
      customerId: viewall.customerId.customerId,
      amount: viewall.paidAmount
    }
    this.service.CutsomerRefunds(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage
        )
      }
    })
  }

  Updatedue(id: any) {
    this, this.dialog.open(UpdateCusduesComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true,
      data: { value: id },
    })
  }

  comment(id: any) {
    this.dialog.open(CommentbyComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
    });
  }


  // generate() {
  //   this.service.generateDues(this.merchantId).subscribe((res: any) => {
  //     this.duesValue = res.response;
  //    
  //     if (res.flag == 1) {
  //       // this.toastr.success('Dues generated Successfully!')
  //     }

  //   })
  // }

  manuvalpayments(id: any) {
    if (this.manuvalpaymentstatus == 1) {
      this.dialog.open(TransactionManualpayComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })

    }

    else if(this.manuvalpaymentstatus == 0){
      this.dialog.open(ManuvalpayWithoutOtpComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
    }
  }


  logs(){
    this.router.navigateByUrl('dashboard/cusduelogsbymerchant')
  }
 
  logsview(id:any){
    this.router.navigate([`dashboard/updated-duesdetails`],{
      queryParams: { Alldata: id },
    })
 
  }





 
  exportexcel() {
   
    this.service.dashboardviewallpendingsExport(this.merchantId).subscribe((res: any) => {
 
 if(res.flag==1){
this.viewllexport=res.response;
        let sno = 1;
        this.responseDataListnew = [];
        this.viewllexport?.forEach((element: any) => {
          let createdate = element.createdDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.customerReferenceId);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.setUpBoxNumber);
          this.response.push(element?.serviceProviderName);
          this.response.push(element?.customerName)
          this.response.push(element?.mobileNumber);
          this.response.push(element?.paidAmount);
          this.response.push(element?.paymentStatus);
 
         
 
          if (element.createdDateTime) {
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('-');
          }
          if (element.paymentDateTime) {
            this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('-');
          }
          if (element?.dueStatus == '1') {
            this.response.push('Dues Reversed');
          }
          else {
            this.response.push('Not Reversed');
          }
 
          this.response.push(element?.commentsBy||'-');
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
    'CustomerId',
     'TransactionId',
      'SetupBoxNumber',
       'ServiceProviderName',
       'Customername',
       "MobileNumber",
       'Amount',
       'Status',
       'Createdat',
       'Paidat',
      'Reverse',
      'Commentby'
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Dashboard Due pending');
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
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
 
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
 
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Dashboard Duepending.xlsx');
    });
  }
 

 

  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  reload() {
    window.location.reload()
  }
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

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
    this.service.DuePendingdashboardsearch(this.merchantId, filterValue,this.pageSize1,this.pageIndex1).subscribe({
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
