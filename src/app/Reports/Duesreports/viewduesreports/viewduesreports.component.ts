import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ReturnDuesComponent } from '../../../Transaction/return-dues/return-dues.component';
import { TransactionManualpayComponent } from '../../../Transaction/transaction-manualpay/transaction-manualpay.component';
import { CommentbyComponent } from '../../../Transaction/transaction-view/commentby/commentby.component';
import { TransactionViewbyidComponent } from '../../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import moment from 'moment';

@Component({
  selector: 'app-viewduesreports',
  templateUrl: './viewduesreports.component.html',
  styleUrl: './viewduesreports.component.css'
})
export class ViewduesreportsComponent {
  merchantId: any = localStorage.getItem('merchantId');
  dataSource: any;
  displayedColumns: any[] = [
    'sno',
    'customerReferenceId',
    'transactionId',
    'customername',
    'mobileNumber',
    'customeremail',

    'amount',
    'status',
    'paidat',
    'reverse',



  ];
  transactionValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('todaydialogTemplate') todaydialogTemplate!: TemplateRef<any>;
  @ViewChild('customdialogTemplate') customdialogTemplate!: TemplateRef<any>;
  @ViewChild('customsearchdialogTemplate') customsearchdialogTemplate!: TemplateRef<any>;
  responseDataListnew: any[] = [];
  response: any[] = [];
  date1: any;
  duesValue: any;
  valueduesexport: any;
  valueduesgenerate: any;
  valueduesview: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId');
  imageUrl: any;
  DocView: boolean = false;
  valueduesReceipt: any;
  valueduesmanual: any;
  valueduesRefund: any;
  roleName = localStorage.getItem('roleName');
  valueReverseDues: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionValueexport: any;
  isFullPolicyVisible: boolean = false;
  limit: number = 30;
  selectedOption: any;
  dialogRef: any;
  content: any;
  paymentStatus: any;
  fromDate: any;
  toDate: any;
  todaycontent: any;
  customcontent: any;
  customfromdate: any;
  customtodate: any;
  statuscontent: any;
  customerid: any;
  customername: any;
  mobile: any;
  payment: any;
  idParam: any;
  todaycustomerid: any;
  todaycustomername: any;
  todaymobile: any;
  todaypayment: any;
  todayParam: any;
  customcustomerid: any;
  customcustomername: any;
  custommobile: any;
  custompayment: any;
  customParam: any;
  customstatuscustomerid: any;
  customstatuscustomername: any;
  custostatusmmobile: any;
  customstatusParam: any;
  showFooter: boolean=true;
  totalCount: any;
  showentries:boolean=false;
  constructor(
    private router: Router,
    private service: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.service
      .transactionView(this.merchantId, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        this.transactionValue = res.response;
        // this.transactionValue.reverse();
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

      if (this.roleName == 'Merchant Super admin') {
        this.valueduesexport = 'Customer Dues Report-Export';
   
       
      } else {
        this.service.viewRole(this.roleId).subscribe((res: any) => {
          if (res.flag == 1) {
            this.getdashboard = res.response?.merchantSubPermission;
   
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
   
              if (this.actions == 'Customer Dues Report-Export') {
                this.valueduesexport = 'Customer Dues Report-Export';
              }
   
           
            }
          }
        });
      }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  comment(id: any) {
    this.dialog.open(CommentbyComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
    });
  }

  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw', // Use percentage to make it responsive
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  refund(viewall: any) {
    let submitModel = {
      payId: viewall.customerPayId,
      customerId: viewall.customerId.customerId,
      amount: viewall.paidAmount,
    };
    this.service.CutsomerRefunds(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
      } else {
        this.toastr.error(res.responseMessage);
      }
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

  viewpay(id: any) {
    this.dialog.open(TransactionManualpayComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.transactionValue?.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerId?.customerReferenceId);
      this.response.push(element?.customerId?.customerName);
      this.response.push(element?.customerId?.mobileNumber);
      this.response.push(element?.customerId?.emailAddress);

      this.response.push(element?.pgPaymentId);
      this.response.push(element?.paidAmount);
      this.response.push(element?.paymentStatus);
      if(element.paymentDateTime){
        this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else if (element.paymentDateTime =='null'){
        this.response.push('');
      }      if (element?.dueStatus == '1') {
        this.response.push('Dues Reversed');
      } else {
        this.response.push('Not Reversed');
      }

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();


  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Customer Id',
      'Customer Name',
      'Customer Mobile',
      'Customer Email',
      'Payment Id',
      'Amount',
      'Status',
      'Paid At',
      'Reverse Status',
    ];

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
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
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
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Customer Dues.xlsx');
    });
  }

  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  reload() {
    window.location.reload();
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
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit();
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }

  customerpay(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.CustomerPay(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transactionValue = res.response;
          this.transactionValue.reverse();
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else if (res.flag === 2) {
          this.transactionValue = [];
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        this.toastr.error('Error fetching filtered regions');
      },
    });
  }
  onOptionChange(value: string) {
    if (value == 'yesterday') {
      this.yesterday();
    }
    if (value == 'today') {
      this.today();
    }
    if (value == 'customRange') {
      this.customRange();
    }
    if (value == 'customRangeWithStatus') {
      this.customRangeWithStatus();
    }
  }

  yesterday() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }

  today() {
    this.dialogRef = this.dialog.open(this.todaydialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }
  customRange() {
    this.dialogRef = this.dialog.open(this.customdialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,

      position: { right: '0px' },
    });
  }

  customRangeWithStatus() {
    this.dialogRef = this.dialog.open(this.customsearchdialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      height: '100%',
      position: { right: '0px' },
    });
  }
  yesterdaysubmit() {
    this.idParam = '';

    if (this.customername) {
      this.idParam += this.customername;
    }
    if (this.mobile) {
      this.idParam += this.mobile;
    }
    if (this.customerid) {
      this.idParam += this.customerid;
    }
    if (this.payment !== undefined) {
      // status is a dropdown, could be 1 or 0
      this.idParam += this.payment;
    }
    if (this.idParam.endsWith('&')) {
      this.idParam = this.idParam.slice(0, -1);
    }
    this.service
      .yesterdaysearchs(this.merchantId, this.idParam, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if(res.flag==1){  
        this.transactionValue = res.response;
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialogRef.close();
        this.showFooter = false;
        this.totalCount = this.transactionValue.length;
      
        console.log(this.totalCount)
        this.showentries=true;
        }
        else if (res.flag === 2) {
          this.totalCount = 0;
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.dialogRef.close();
          this.showentries=true;
          this.showFooter = false;
         
        }
        
      });

  }
  todaysubmit() {
    this.todayParam = '';

    if (this.todaycustomername) {
      this.todayParam += this.todaycustomername;
    }
    if (this.todaymobile) {
      this.todayParam += this.todaymobile;
    }
    if (this.todaycustomerid) {
      this.todayParam += this.todaycustomerid;
    }
    if (this.todaypayment !== undefined) {
      // status is a dropdown, could be 1 or 0
      this.todayParam += this.todaypayment;
    }
    if (this.todayParam.endsWith('&')) {
      this.todayParam = this.todayParam.slice(0, -1);
    }
    this.service
      .todaysearchs(this.merchantId, this.todayParam, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if(res.flag==1){

        this.transactionValue = res.response;
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialogRef.close();
        this.showFooter = false;
        this.totalCount = this.transactionValue.length;
      
        console.log(this.totalCount)
        this.showentries=true;
        }
        else if (res.flag === 2) {
          this.totalCount = 0;
          this.dataSource = new MatTableDataSource([]);
          // this.totalPages = res.pagination.totalElements;
          // this.totalpage = res.pagination.totalPages;
          // this.currentpage = res.pagination.currentPage + 1;
          this.dialogRef.close();
          this.showentries=true;
          this.showFooter = false;
         
        }
      });

  }
  customsubmit() {
    this.customParam = '';

    if (this.customcustomername) {
      this.customParam += this.customcustomername;
    }
    if (this.custommobile) {
      this.customParam += this.custommobile;
    }
    if (this.customcustomerid) {
      this.customParam += this.customcustomerid;
    }

    if (this.customParam.endsWith('&')) {
      this.customParam = this.customParam.slice(0, -1);
    }
    this.service
      .customsearchs(this.merchantId, this.customParam, this.customfromdate, this.customtodate, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if(res.flag==1){

        this.transactionValue = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialogRef.close();
        this.showFooter = false;
        this.totalCount = this.transactionValue.length;
      
        console.log(this.totalCount)
        this.showentries=true;
        }
        else if (res.flag === 2) {
          this.totalCount = 0;
          this.dataSource = new MatTableDataSource([]);
          // this.totalPages = res.pagination.totalElements;
          // this.totalpage = res.pagination.totalPages;
          // this.currentpage = res.pagination.currentPage + 1;
          this.dialogRef.close();
          this.showentries=true;
          this.showFooter = false;
         
        }
       
      });

  }
  customstatussubmit() {
    this.customstatusParam = '';

    if (this.customstatuscustomername) {
      this.customstatusParam += this.customstatuscustomername;
    }
    if (this.custostatusmmobile) {
      this.customstatusParam += this.custostatusmmobile;
    }
    if (this.customstatuscustomerid) {
      this.customstatusParam += this.customstatuscustomerid;
    }

    if (this.customstatusParam.endsWith('&')) {
      this.customstatusParam = this.customstatusParam.slice(0, -1);
    }
    this.service
      .customsearchwithStatus(this.merchantId, this.customstatusParam, this.paymentStatus, this.fromDate, this.toDate, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if(res.flag==1){

        this.transactionValue = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.transactionValue);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialogRef.close();
        this.showFooter = false;
        this.totalCount = this.transactionValue.length;
      
        console.log(this.totalCount)
        this.showentries=true;
        }
        else if (res.flag === 2) {
          this.totalCount = 0;
          this.dataSource = new MatTableDataSource([]);
          // this.totalPages = res.pagination.totalElements;
          // this.totalpage = res.pagination.totalPages;
          // this.currentpage = res.pagination.currentPage + 1;
          this.dialogRef.close();
          this.showentries=true;
          this.showFooter = false;
         
        }
      });
  }
  //Yesterday
  shouldDisable(fieldName: string): boolean {
    const fields = [
      this.customerid,
      this.customername,
      this.mobile,
      this.payment,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.getFieldIndex(fieldName)
      ).length > 0
    );
  }

  // custom filter disables fuctions
  private getFieldIndex(fieldName: string): number {
    const fieldNames = [
      'customerid',
      'customername',
      'mobile',
      'payment',

    ];

    return fieldNames.indexOf(fieldName);
  }
  reset(): void {
    this.customerid = '';
    this.customername = '';
    this.mobile = '';
    this.payment = '';


  }


  //Today
  todayshouldDisable(fieldName: string): boolean {
    const fields = [
      this.todaycustomerid,
      this.todaycustomername,
      this.todaymobile,
      this.todaypayment,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.todaygetFieldIndex(fieldName)
      ).length > 0
    );
  }

  // custom filter disables fuctions
  private todaygetFieldIndex(fieldName: string): number {
    const fieldNames = [
      'todaycustomerid',
      'todaycustomername',
      'todaymobile',
      'todaypayment',

    ];

    return fieldNames.indexOf(fieldName);
  }
  todayreset(): void {
    this.todaycustomerid = '';
    this.todaycustomername = '';
    this.todaymobile = '';
    this.todaypayment = '';


  }

  //Custom
  custompaymentshouldDisable(fieldName: string): boolean {
    const fields = [
      this.customcustomerid,
      this.customcustomername,
      this.custommobile,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.customgetFieldIndex(fieldName)
      ).length > 0
    );
  }

  // custom filter disables fuctions
  private customgetFieldIndex(fieldName: string): number {
    const fieldNames = [
      'customcustomerid',
      'customcustomername',
      'custommobile',


    ];

    return fieldNames.indexOf(fieldName);
  }
  customtodayreset(): void {
    this.customcustomerid = '';
    this.customcustomername = '';
    this.custommobile = '';
    // this.custompayment = '';
    this.customfromdate = '';
    this.customtodate = '';
  }


  //Custom Status
  customstatuspaymentshouldDisable(fieldName: string): boolean {
    const fields = [
      this.customstatuscustomerid,
      this.customstatuscustomername,
      this.custostatusmmobile,

    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.customstatusgetFieldIndex(fieldName)
      ).length > 0
    );
  }

  // custom filter disables fuctions
  private customstatusgetFieldIndex(fieldName: string): number {
    const fieldNames = [
      'customstatuscustomerid',
      'customstatuscustomername',
      'custostatusmmobile',


    ];

    return fieldNames.indexOf(fieldName);
  }
  customstatusreset(): void {
    this.customstatuscustomerid = '';
    this.customstatuscustomername = '';
    this.custostatusmmobile = '';
  }
}
