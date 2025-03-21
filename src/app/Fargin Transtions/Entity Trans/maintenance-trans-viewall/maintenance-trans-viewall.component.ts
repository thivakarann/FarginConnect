import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MaintanceViewComponent } from '../maintance-view/maintance-view.component';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Cloudfee, subscriptionpay } from '../../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';
import { TransManualPayComponent } from '../trans-manual-pay/trans-manual-pay.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manuvelduesforcloudfee } from '../../../Fargin Model/fargin-model/fargin-model.module';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

interface Option {
  entityName: string;
  merchantId: number;
}

@Component({
  selector: 'app-maintenance-trans-viewall',
  templateUrl: './maintenance-trans-viewall.component.html',
  styleUrl: './maintenance-trans-viewall.component.css'
})
export class MaintenanceTransViewallComponent {


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'paymentmethod',
    'count',
    'percount',
    // 'smscgst',
    // 'smssgst',
    // 'smsigst',
    'totalcost',
    'otherPayAmount',
    'otherpaymentview',
    'amount',
    'cgst',
    'igst',
    'sgst',
    'totalamount',
    'createdDateTime',
    'status',
    'Manualpay',
    'paidAt',
    'CheckStatus',
    'receipt',
    'view',

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
  showcategoryData!: boolean;
  valuemaintainexport: any;
  valuemaintainview: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valuemaintainInvoicet: any;
  valuemaintainInvoice: any;
  valuemaintaincheck: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionexport: any;


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
 search1:any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal:any="";
  search2:any;
  searches:any;
  backs: any = '';
  userInput: string = '';
  options: Option[] = [];
  search: any;
  filterValue: any;
  
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: any;
  @ViewChild('CloudFeeDateFilter') CloudFeeDateFilter!: TemplateRef<any>;
  @ViewChild('CloudFeeSearch') CloudFeeSearch!: TemplateRef<any>;
  @ViewChild('DueGenerated') DueGenerated!: TemplateRef<any>;
  cloudfeesearch: any = FormGroup;
  Datefiltercloudfee:any= FormGroup;
  Duegenerate:any=FormGroup
  merchantId: any;
  flags: any;
  cloudfee: any;
  selectedOption: any;

  pageIndex3: number = 0;
  pageSize3 = 5;
  totalPages3: any;
  currentpage3: any;
  totalpage3: any;
  filter3: boolean = true;
  maxDate:any;

  constructor(private router:Router,private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog,private fb:FormBuilder) { }



  ngOnInit(): void {
    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuemaintainexport = 'Cloud Fee Payments-Export'
            this.valuemaintainview = 'Cloud Fee Payments-View'
            this.valuemaintainInvoice = 'Cloud Fee Payments-Invoice'
            this.valuemaintaincheck = 'Cloud Fee Payments-Check Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Cloud Fee Payments-Export') {
                this.valuemaintainexport = 'Cloud Fee Payments-Export'
              }
              if (this.actions == 'Cloud Fee Payments-View') {
                this.valuemaintainview = 'Cloud Fee Payments-View'
              }
              if (this.actions == 'Cloud Fee Payments-Invoice') {
                this.valuemaintainInvoice = 'Cloud Fee Payments-Invoice'
              }
              if (this.actions == 'Cloud Fee Payments-Check Status') {
                this.valuemaintaincheck = 'Cloud Fee Payments-Check Status'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1=false;
        this.filters=false;
        this.filter3=false;  
      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1=false;
        this.filters=false; 
        this.filter3=false;  
      }

    });

    this.cloudfeesearch = this.fb.group({
          pay: ['', [Validators.required]],
          startDate: ['',],
          endDate: ['',],
          // search: ['', [Validators.required]],
          // search1:['']
          selectedOption: ['', [Validators.required]],
          search1:['']

        });
    
        this.Datefiltercloudfee = this.fb.group({
          FromDateRange: ['', Validators.required],
          ToDateRange: ['', Validators.required]
        });

        this.Duegenerate = this.fb.group({
          searches: ['', Validators.required],
          search2:['']
        });

        

  }

  

  get pay() {
    return this.cloudfeesearch.get('pay');
  }

  get startDate() {
    return this.cloudfeesearch.get('startDate');
  }
  get endDate() {
    return this.cloudfeesearch.get('endDate');
  }



  OtherpaymentsView(id:any){
    this.router.navigate([`dashboard/maintenanceotherpay-view/${id}`],{
      queryParams:{alldata:id}
    })  
    }
  




  reload() {
    this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1=false;
        this.filters=false;
        this.filter3=false;  
      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1=false;
        this.filters=false;
        this.filter3=false;   
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


  filterdate() {
    const fromDate = this.Datefiltercloudfee.get('FromDateRange')?.value;
    const toDate = this.Datefiltercloudfee.get('ToDateRange')?.value;


    this.service.MaintenanceTransactionFilter(fromDate, toDate, this.pageSize2, this.pageIndex2).subscribe((res: any) => {
      if (res.flag == 1) {

        this.transaction = res.response;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages2 = res.pagination.totalElements;
        this.totalpage2 = res.pagination.totalPages;
        this.currentpage2 = res.pagination.currentPage + 1;

        this.filter1 = false;
        this.filter = false;
        this.filter3=false;  
        this.filters = true;
        this.dialog.closeAll()
            }
      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage)
        this.dialog.closeAll()

        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages2 = res.pagination.totalElements;
        this.totalpage2 = res.pagination.totalPages;
        this.currentpage2 = res.pagination.currentPage + 1;
        this.filter3=false;  
        this.filter = false;
        this.filter1 = false;
        this.filters = true;
        // this.filter1 = true; 
        // this.filter=false;
        // this.filters=false;         this.transaction = [];
        // this.dataSource = new MatTableDataSource(this.transaction);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;  
      }
    })
  }
  reset() {
    this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.transaction.reverse();
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = true;
        this.filter1=false;
        this.filters=false;
        this.filter3=false;  
        this.FromDateRange='';
        this.ToDateRange='';
      }
      else{
        this.transaction = [];
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter = true;
        this.filter1=false;
        this.filters=false; 
        this.filter3=false;  
        this.FromDateRange='';
        this.ToDateRange='';
      }

    });

    
    this.backs = '';
    this.filterValue = '';
    this.userInput = '';
    this.Datefiltercloudfee.reset();
    this.cloudfeesearch.reset()
    this.options = [];
    this.selectedOption = '';
     this.search1 = ''
     this.search2 = ''

  }


  viewreciept(id: any) {


    this.service.MaintenanceReciept(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  track(id: any) {
    let submitModel: subscriptionpay = {
      payId: id?.maintenancePayId,
      trackId: id?.trackId,
      paidAmount: id.totalPayableAmount
    }
    this.service.Subscribepay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
              this.transaction = res.response;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;
              // this.transaction.reverse();
              this.dataSource = new MatTableDataSource(this.transaction);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.filter = true;
              this.filter1=false;
              this.filters=false;
              this.filter3=false;  
            }
            else{
              this.transaction = [];
              this.dataSource = new MatTableDataSource(this.transaction);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator; 
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.totalPages;
              this.currentpage = res.pagination.currentPage + 1;
              this.filter = true;
              this.filter1=false;
              this.filters=false; 
              this.filter3=false;  
            }
      
          });
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }


  exportexcel() {
    this.service.MaintenanceAllTransactionsExport().subscribe((res: any) => {
      this.transactionexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.transactionexport.forEach((element: any) => {
 
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.entityName);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.smsCount);
          this.response.push(element?.smsPerAmount);
          this.response.push(element?.smsTotalAmount);
          this.response.push(element?.otherPayAmount);
          this.response.push(element?.stickerCount);
          this.response.push(element?.paidAmount);
          this.response.push(element?.cgstPercentage);
          this.response.push(element?.igstPercentage);
          this.response.push(element?.sgstPercentage);
          this.response.push(element?.totalPayableAmount);
          if(element.createdDateTime){
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }
       
          if(element.paymentDateTime){
            this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }
 
          if (element?.paymentStatus == 'Success') {
            this.response.push('Success');
          }
          else if (element?.paymentStatus == 'Due Pending') {
            this.response.push('Pending');
          }
          else if (element?.paymentStatus == 'Payment Incomplete') {
            this.response.push('Payment Incomplete');
          }
          else if (element?.paymentStatus == 'Failure') {
            this.response.push('Payment Failed');
          }
          else if (element?.paymentStatus == 'Due Cancelled') {
            this.response.push('Due-Cancelled');
          }
          else {
            this.response.push('Initiated');
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
      'sno',
      'Payment Id',
      'Entity Name',
      'Payment Method',
      'Sms Count',
      'Sms Cost Per Count',
      'Total Sms Cost',
      'Other Pay Amount',
      'Sticker Count',
      'Amount',
      'CGST Percentage',
      'IGST Percentage',
      'SGST Percentage',
      'Total Payable Amount',
      'Due Generated At',
      'Paid At',
      'Status',
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Transactions');
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
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);
      let qty15 = row.getCell(16);
 
 
 
 
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
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Maintenance Transaction.xlsx');
    });
  }

  transactionview(id: any) {

    this.dialog.open(MaintanceViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
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

  renderPage3(event: PageEvent) {
    this.pageIndex3 = event.pageIndex;  
    this.pageSize3 = event.pageSize;       
 
    this.subscription(this.currentfilVal);
  }
 
  changePageIndex3(newPageIndex3: number) {
    this.pageIndex3 = newPageIndex3;
    this.renderPage3({
      pageIndex: newPageIndex3,
      pageSize: this.pageSize3,
      // length: this.totalItems
    } as PageEvent);
  }

  subscription(filterValue: string) {
  
    if (filterValue) {
    this.service.Subscriptionsearch(filterValue,this.pageSize3,this.pageIndex3).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.transaction.reverse();
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages3 = res.pagination.totalElements;
          this.totalpage3 = res.pagination.totalPages;
          this.currentpage3 = res.pagination.currentPage + 1;
          this.filters=false;
          this.filter1=false;
          this.filter=false;
          this.filter3=true;  
        }
        else if (res.flag === 2) {
          this.transaction = [];
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages3 = res.pagination.totalElements;
          this.totalpage3 = res.pagination.totalPages;
          this.currentpage3 = res.pagination.currentPage + 1;
          this.filters=false;
          this.filter1=false;
          this.filter=false;
          this.filter3=true;  
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
  else if (!filterValue) {
    // this.toastr.error('Please enter a value to search');
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
    this.CloudFee()

  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
  renderPage2(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex2 = event.pageIndex;  // Update current page index
    this.pageSize2 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex2);
    console.log('New Page Size:', this.pageSize2);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.subscription(this.currentfilVal);
    this.filterdate()

  }
 
  changePageIndex2(newPageIndex1: number) {
    this.pageIndex2 = newPageIndex1;
    this.renderPage2({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize2,
      // length: this.totalItems
    } as PageEvent);
  }

  manuvalpayments(id: any) {
 
    this.dialog.open(TransManualPayComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          // this.transaction.reverse();
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = true;
          this.filter1=false;
          this.filters=false;
          this.filter3=false;  
        }
        else{
          this.transaction = [];
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.filter = true;
          this.filter1=false;
          this.filters=false;
          this.filter3=false;  
        }
 
      });
    })

}



Filter(event: any) {
  console.log(event.target.value);
  this.filterValue = event.target.value;
  this.filterbymso();
}

filterbymso() {
  if (this.filterValue == 'Filterbycloudffeesearch') {
    this.dialogRef = this.dialog.open(this.CloudFeeSearch, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      // width: '30%'
    });
  }
  else if (this.filterValue == 'Datefiltercloudfee') {
    this.dialogRef = this.dialog.open(this.CloudFeeDateFilter, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      // width: '30%'
    });
  }
  else if (this.filterValue == 'DuegenerateCloudFee') {
    this.dialogRef = this.dialog.open(this.DueGenerated, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
      // width: '30%'
    });
  }
}


  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }

  onSearchClick(searchSelect: NgSelectComponent): void {
    this.searchAPI(this.userInput);

  // Keep the dropdown open after the search
  if (!searchSelect.isOpen) {
    searchSelect.open();
  }
  }

  onDropdownChange(event: any): void {
    this.selectedOption = event.value.entityName;
    this.merchantId = event.value?.merchantId;
    this.closeDropdown();
  }
  closeDropdown(): void {

  }

  searchAPI(query: string): void {
    this.service.CloudFeeSearch(query).subscribe((res: any) => {
      if (res.flag === 1) {
        this.options = res.response.map((item: any) => ({
          entityName: item.entityName,
          merchantId: item.merchantId
        }));
        if (this.options.length > 0) {
          this.selectedOption = this.options[0];
          this.onDropdownChange({ value: this.selectedOption });
        }
      } else {
        this.toastr.error(res.responseMessage);
      }
    },
      (error) => {
        console.error('Error fetching data from API', error);
      });
  }

  onClear(): void {
    this.options = []; // Clear dropdown options
    this.selectedOption = null; // Reset the selected option
    this.userInput = ''; // Clear the input variable, if any
    console.log('Clear action triggered!');
  }
  
  CloudFee() {

    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
      console.log('Flag set to 1:', this.flags);
    } else {
      this.flags = 2;
      console.log('Flag set to 2:', this.flags);
    }
    let submitModel: Cloudfee = {
      paymentStatus: this.pay?.value,
      merchantId: this.merchantId,
      flag: this.flags,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value
    };
    this.service.CloudFeeDateFilter(this.pageSize1, this.pageIndex1, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.cloudfee = res.response;
        this.dataSource = new MatTableDataSource(this.cloudfee);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
        this.filter1 = true;
        this.filter = false;
        this.filter3=false;  
        this.filters = false;
        this.dialog.closeAll();
      } else {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.cloudfee = [];
        this.dataSource = new MatTableDataSource(this.cloudfee);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
        this.filter = false;
        this.filter1 = true;
        this.filters = false;
        this.filter3=false;  
      }
    });


  }

  close() {
    this.dialog.closeAll();
  }

  resetsearch(): void {
    this.cloudfeesearch.reset()
    this.userInput = '';
    this.options = [];
    this.selectedOption = ''
     this.search1 = ''
  }

  resetfilter(){
    this.Datefiltercloudfee.reset();
  }

  resetdue(){
    this.Duegenerate.reset();
    this.search2 = ''
  this.searches = ''
  }

  Duegeneration(){
    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
      console.log('Flag set to 1:', this.flags);
    } else {
      this.flags = 2;
      console.log('Flag set to 2:', this.flags);
    }
    let submitModel:Manuvelduesforcloudfee = {
      merchantId: this.merchantId
    }
    this.service.MaintenancedueManuvelgenerate(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }

      else {
        this.toastr.error(res.responseMessage)

      }
    })
  }

  future(value: any) {
    value.reset()
  }
 
}
