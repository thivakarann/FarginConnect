import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ServicePaymentViewComponent } from '../service-payment-view/service-payment-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { manualpay, Onetimepay } from '../../../fargin-model/fargin-model.module';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

interface Option {
  entityName: string;
  merchantId: number;
}


@Component({
  selector: 'app-service-payments-viewall',
  templateUrl: './service-payments-viewall.component.html',
  styleUrl: './service-payments-viewall.component.css'
})
export class ServicePaymentsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'paymentmethod',
    'amount',
    'createdDateTime',
    'paidAt',
    'receipt',
    'CheckStatus',
    'status',
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
  valueserviceexport: any;
  valueserviceView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueserviceReceipt: any;
 
  valueservicecheck: any;
  pageIndex: number = 0;
  pageSize=5;
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
 
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal:any="";

   @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
    dialogRef: any;
    @ViewChild('OnetimepayDateFilter') OnetimepayDateFilter!: TemplateRef<any>;
    @ViewChild('OneTimePaymentsearch') OneTimePaymentsearch!: TemplateRef<any>;
    backs: any = '';
    userInput: string = '';
    options: Option[] = [];
    search: any;
    Onetimepayfilter: any = FormGroup;
    Onetimepay: any = FormGroup;
    flags: any
    addpay: any;
    merchantId: any;
    selectedOption: any;
  filterValue: any;

  pageIndex3: number = 0;
  pageSize3 = 5;
  totalPages3: any;
  currentpage3: any;
  totalpage3: any;
  filter3: boolean = true;
  search1:any;
  maxDate:any;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog,private fb:FormBuilder) { }
 
 
 
  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()

 
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
       
 
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
 
          if (this.roleId == 1) {
            this.valueserviceView = 'one Time Payments-View'
            this.valueserviceexport = 'one Time Payments-Export'
            this.valueserviceReceipt = 'one Time Payments-Invoice'
            this.valueservicecheck = 'one Time Payments-Check Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'one Time Payments-View') {
                this.valueserviceView = 'one Time Payments-View'
              }
              if (this.actions == 'one Time Payments-Export') {
                this.valueserviceexport = 'one Time Payments-Export'
              }
              if (this.actions == 'one Time Payments-Invoice') {
                this.valueserviceReceipt = 'one Time Payments-Invoice'
              }
              if (this.actions == 'one Time Payments-Check Status') {
                this.valueservicecheck = 'one Time Payments-Check Status'
              }
 
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
 
    this.service.OneTimeAllTransactions(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1;
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
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1; 
       this.filter = true;
        this.filter1=false;
        this.filters=false;
        this.filter3=false;  
      }
 
    });
 
      this.Onetimepay = this.fb.group({
          pay: ['', [Validators.required]],
          startDate: ['',],
          endDate: ['',],
          // search: ['', [Validators.required]],
          // search1:['']
          selectedOption: ['', [Validators.required]],

          search1:['']
        });
    
        this.Onetimepayfilter = this.fb.group({
          FromDateRange: ['', Validators.required],
          ToDateRange: ['', Validators.required]
        });
 
  }

  
  get pay() {
    return this.Onetimepay.get('pay');
  }

  get startDate() {
    return this.Onetimepay.get('startDate');
  }
  get endDate() {
    return this.Onetimepay.get('endDate');
  }
 
 
  reload() {
    this.service.OneTimeAllTransactions(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1;
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
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1; 
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
 
 
  track(id: any) {
    let submitModel: manualpay = {
      payId: id?.merchantPayId,
    }
    this.service.Manualpay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          this.service.OneTimeAllTransactions(this.pageSize,this.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
              this.transaction = res.response;
              this.totalPages=res.pagination.totalElements;
              this.totalpage=res.pagination.totalPages;
             this.currentpage=res.pagination.currentPage+1;
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
              this.totalPages=res.pagination.totalElements;
              this.totalpage=res.pagination.totalPages;
             this.currentpage=res.pagination.currentPage+1; 
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
 
  filterdate() {
    const fromDate = this.Onetimepayfilter.get('FromDateRange')?.value;
    const toDate = this.Onetimepayfilter.get('ToDateRange')?.value;

 
    this.service.OneTimeTransactionFilter(fromDate, toDate,this.pageSize2,this.pageIndex2).subscribe((res: any) => {
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
        // this.transaction = res.response;
        // this.totalPages1 = res.pagination.totalElements;
        // this.totalpage1 = res.pagination.totalPages;
        // this.currentpage1 = res.pagination.currentPage + 1;


        // this.dataSource = new MatTableDataSource(this.transaction);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.filter = false;
        // this.filter1=true;
        // this.filters=false;     
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
      }
    })
  }
  reset() {
    this.service.OneTimeAllTransactions(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1;
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
        this.totalPages=res.pagination.totalElements;
        this.totalpage=res.pagination.totalPages;
       this.currentpage=res.pagination.currentPage+1; 
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
    this.Onetimepay.reset();
    this.Onetimepayfilter.reset()
    this.options = [];
    // this.search = ''
     this.selectedOption=''
    this.search1 = ''
  }
 
  viewreciept(id: any) {
   
 
    this.service.ManualRecieptView(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }
 
  exportexcel() {
    this.service.OneTimeTransactionsExport().subscribe((res: any) => {
    this.transactionexport = res.response;
    if (res.flag == 1) {
    let sno = 1;
    this.responseDataListnew = [];
    this.transactionexport.forEach((element: any) => {
 
      let moddate = element.modifiedDatetime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.pgPaymentId);
      this.response.push(element?.merchantId?.merchantLegalName);
      this.response.push(element?.paymentMethod);
      this.response.push(element?.paidAmount);
      this.response.push(element?.gstAmount);
      this.response.push(element?.totalPayableAmount);
      if(element.createdDateTime){
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
        this.response.push('');
      }
      if(element.paymentDateTime){
        this.response.push(moment(element?.paymentDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else{
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
 
      'SNo',
      'PaymentId',
      'Entity Name',
      'Payment Method',
      'Amount',
      'GST',
      'Total Amount',
      'Paid At',
      'Status',
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('OneTime  Transactions');
 
 
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
      FileSaver.saveAs(blob, 'OneTime Transaction.xlsx');
    });
  } 
 
 
  transactionview(id: any) {
 
    this.dialog.open(ServicePaymentViewComponent, {
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

  onetimepay(filterValue: string) {
  
    if (filterValue) {

    this.service.Onetimepayment(filterValue,this.pageSize3,this.pageIndex3).subscribe({
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
          this.filter = false;
          this.filter1=false;
          this.filters=false;  
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
          this.filter = false;
          this.filter1=false;
          this.filters=false;  
          this.filter3=true;  
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
  else if (!filterValue) {
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
    this.filterdate();
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
    this.filterdate()

  }
 
  changePageIndex2(newPageIndex2: number) {
    this.pageIndex2 = newPageIndex2;
    this.renderPage2({
      pageIndex: newPageIndex2,
      pageSize: this.pageSize2,
      // length: this.totalItems
    } as PageEvent);
  }


  renderPage3(event: PageEvent) {
    this.pageIndex3 = event.pageIndex;  
    this.pageSize3 = event.pageSize;           
 
    console.log('New Page Index:', this.pageIndex3);
    console.log('New Page Size:', this.pageSize3);
     this.onetimepay(this.currentfilVal);


  }
 
  changePageIndex3(newPageIndex3: number) {
    this.pageIndex3 = newPageIndex3;
    this.renderPage3({
      pageIndex: newPageIndex3,
      pageSize: this.pageSize3,
      // length: this.totalItems
    } as PageEvent);
  }

  Filter(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.filterbymso();
  }

  filterbymso() {
    if (this.filterValue == 'Filterbyonetimepay') {
      this.dialogRef = this.dialog.open(this.OneTimePaymentsearch, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
        // width: '30%'
      });
    }
    else if (this.filterValue == 'OneTimepayDatefilter') {
      this.dialogRef = this.dialog.open(this.OnetimepayDateFilter, {
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
      this.service.OneTimepaySearch(query).subscribe((res: any) => {
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
    
    Additionalpay() {
  
      if (!this.startDate?.value && !this.endDate?.value) {
        this.flags = 1;
        console.log('Flag set to 1:', this.flags);
      } else {
        this.flags = 2;
        console.log('Flag set to 2:', this.flags);
      }
      let submitModel: Onetimepay = {
        paymentStatus: this.pay?.value,
        merchantId: this.merchantId,
        flag: this.flags,
        startDate: this.startDate?.value,
        endDate: this.endDate?.value
      };
      this.service.OneTimepayFilter(this.pageSize1, this.pageIndex1, submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.addpay = res.response;
          this.dataSource = new MatTableDataSource(this.addpay);
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
          this.addpay = [];
          this.dataSource = new MatTableDataSource(this.addpay);
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
  
    resetcustomer(): void {
      this.Onetimepay.reset()
      this.userInput = '';
      this.options = [];
      this.selectedOption = '';
      this.search1 = '';
    }
  
    resetfilter(){
      this.Onetimepayfilter.reset();
    }

    
 future(value: any) {
  value.reset()
}
  
}
