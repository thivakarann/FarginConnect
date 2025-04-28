import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { additionalcustomerpay, additionapayfilter, customerpay } from '../../fargin-model/fargin-model.module';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustomerTransViewComponent } from '../Customer Trans/customer-trans-view/customer-trans-view.component';
import { ViewadditionalpaymentsComponent } from './viewadditionalpayments/viewadditionalpayments.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

interface Option {
  entityName: string;
  merchantId: number;
}


@Component({
  selector: 'app-additionalpayments',
  templateUrl: './additionalpayments.component.html',
  styleUrl: './additionalpayments.component.css'
})
export class AdditionalpaymentsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'entityname',
    'customername',
    'paymentmethod',
    'amount',
    'createdDateTime',
    'paidAt',
    'Receipt',
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
  valuepaymentexport: any;
  valuepaymentview: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valuepaymentReceipt: any;
  valuepaymentCheckStatus: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalpage: any;
  totalPages: any;
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
  filterValue: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal:any="";
  search1:any;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  dialogRef: any;
  @ViewChild('AdditionalPaymentDateFilter') AdditionalPaymentDateFilter!: TemplateRef<any>;
  @ViewChild('AdditionalPayment') AdditionalPayment!: TemplateRef<any>;
  backs: any = '';
  userInput: string = '';
  options: Option[] = [];
  search: any;
  additionalpay: any = FormGroup;
  Datefilteradditionalpay: any = FormGroup;
  flags: any
  addpay: any;
  merchantId: any;
  selectedOption: any;
  pageIndex3: number = 0;
  pageSize3 = 5;
  totalPages3: any;
  currentpage3: any;
  totalpage3: any;
  filter3: boolean = true;
  maxDate:any;
  currentfilvalShow:boolean=false;
  searchPerformed:boolean=false
  
  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog, private fb: FormBuilder) { }



  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
 
          if (this.roleId == 1) {
            this.valuepaymentexport = 'Additional Payments-Export'
            this.valuepaymentview = 'Additional Payments-View'
            this.valuepaymentReceipt = 'Additional Payments-Receipt'
            this.valuepaymentCheckStatus = 'Additional Payments-Check Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Additional Payments-Export') {
                this.valuepaymentexport = 'Additional Payments-Export'
              }
              if (this.actions == 'Additional Payments-View') {
                this.valuepaymentview = 'Additional Payments-View'
              }
              if (this.actions == 'Additional Payments-Receipt') {
                this.valuepaymentReceipt = 'Additional Payments-Receipt'
              }
              if (this.actions == 'Additional Payments-Check Status') {
                this.valuepaymentCheckStatus = 'Additional Payments-Check Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.additionalpayments(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
     
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;     
      }
    });

    this.additionalpay = this.fb.group({
      pay: ['', [Validators.required]],
      startDate: ['',],
      endDate: ['',],
      // search: ['', [Validators.required]],
      // search1:['']
      selectedOption: ['', [Validators.required]],
      search1:['']
    });

    this.Datefilteradditionalpay = this.fb.group({
      FromDateRange: ['', Validators.required],
      ToDateRange: ['', Validators.required]
    });
  }


  get pay() {
    return this.additionalpay.get('pay');
  }

  get startDate() {
    return this.additionalpay.get('startDate');
  }
  get endDate() {
    return this.additionalpay.get('endDate');
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    this.service.additionalpayments(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
     
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;     
      }
    });

  }


  filterdate() {
    const fromDate = this.Datefilteradditionalpay.get('FromDateRange')?.value;
    const toDate = this.Datefilteradditionalpay.get('ToDateRange')?.value;

    this.service.additionalpaymentsfilter(fromDate, toDate, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dialog.closeAll()
        } 
        else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
  
        }
    })
  }
  reset() {
    this.service.additionalpayments(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.FromDateRange='';
        this.ToDateRange='';
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction); 
        this.FromDateRange='';
        this.ToDateRange='';    
      }
    });
 
    this.backs = '';
    this.filterValue = '';
    this.userInput = '';
    this.Datefilteradditionalpay.reset();
    this.additionalpay.reset()
    this.options = [];
    this.selectedOption = '';
    this.search1 = ''

  }

  Receipt(id: any) {
    this.service.additionalpaymentsreceipts(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }


  exportexcel() {
    this.service.additionalexport().subscribe((res: any) => {
      this.transactionexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.transactionexport.forEach((element: any) => {
          // let createdate = element.paymentDateTime;
          // this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
       
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId);
          this.response.push(element?.customerId?.merchantId?.merchantLegalName);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.paidAmount);
          // this.response.push(this.date1);
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
            this.response.push('Due Pending');
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
      'Customer Name',
      'Payment Method',
      'Amount',
      "Due Generated At",
      'Paid At',
      'Status',
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Additional Payments');
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
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Additional Payments.xlsx');
    });
  }
 

  transactionview(id: any) {

    this.dialog.open(ViewadditionalpaymentsComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  track(id: any) {
    let submitModel: additionalcustomerpay = {
      payId: id?.customerpaymentId,
      // trackId: id?.trackId,
      // paidAmount: id.paidAmount
    }
    this.service.additionalpaycheck(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.additionalpayments(this.pageSize, this.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
              this.transaction = res.response;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.transaction);
              this.currentfilvalShow = false;
           
            } else if (res.flag == 2) {
              this.transaction = [];
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.transaction);
              this.currentfilvalShow = false;     
            }
          });
        }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
  
  

  CustomerAdmin(filterValue: string) {

    if (filterValue) {

    this.service.additionalsearchfilter(filterValue,this.pageSize, this.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.transaction.reverse();
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.currentfilvalShow = true;     
       
        } else if (res.flag == 2) {
          this.transaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.currentfilvalShow = true;   
        }
      },
      error: (err: any) => {
        this.toastr.error('Error fetching filtered regions');
      }
    });
  }
  else if (!filterValue) {
    //this.toastr.error('Please enter a value to search');
    return;
  }
  }

 


  Filter(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.filterbymso();
  }

  filterbymso() {
    if (this.filterValue == 'Filterbyadditionalpayment') {
      this.dialogRef = this.dialog.open(this.AdditionalPayment, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
        // width: '30%'
      });
    }
    else if (this.filterValue == 'AdditionalpayDatefilter') {
      this.dialogRef = this.dialog.open(this.AdditionalPaymentDateFilter, {
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

  onDropdownChange(selectedItem: any): void {
    console.log(selectedItem)
    if (selectedItem) {
        this.selectedOption = selectedItem.merchantId;
        this.search1 = selectedItem.entityName;
        this.merchantId = this.selectedOption;
        console.log(this.merchantId);
    }
  }
   
  closeDropdown(): void {

  }

  searchAPI(query: string): void {
    this.service.AdditionalPaySearch(query).subscribe((res: any) => {
      if (res.flag === 1) {
        this.options = res.response.map((item: any) => ({
          entityName: item.entityName,
          merchantId: item.merchantId
        }));
    
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
    let submitModel: additionapayfilter = {
      paymentStatus: this.pay?.value,
      merchantId: this.merchantId,
      flag: this.flags,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value
    };
    this.service.AdditionalPayDateFilter(this.pageSize, this.pageIndex, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.addpay = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.addpay);
        this.dialog.closeAll()     
      } 
      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.addpay = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.addpay);
      }
    });


  }

  close() {
    this.dialog.closeAll();
    this.backs = '';
    this.filterValue=null;
 
  }

  resetcustomer(): void {
    this.additionalpay.reset()
    this.userInput = '';
    this.options = [];
    this.selectedOption = '';
    this.search1 = ''

  }

  resetfilter(){
    this.Datefilteradditionalpay.reset();
  }


  future(value: any) {
    value.reset()
  }

getData(event: any) {
        if (this.currentfilvalShow) {
          this.service.additionalsearchfilter(this.currentfilVal,event.pageSize, event.pageIndex).subscribe({
            next: (res: any) => {
              if (res.response) {
                this.transaction = res.response;
                this.transaction.reverse();
                this.totalPages = res.pagination.totalElements;
                this.totalpage = res.pagination.pageSize;
                this.currentpage = res.pagination.currentPage;
                this.dataSource = new MatTableDataSource(this.transaction);
                
             
              } else if (res.flag == 2) {
                this.transaction = [];
                this.totalPages = res.pagination.totalElements;
                this.totalpage = res.pagination.pageSize;
                this.currentpage = res.pagination.currentPage;
                this.dataSource = new MatTableDataSource(this.transaction);
                 
              }
            },
            error: (err: any) => {
              this.toastr.error('Error fetching filtered regions');
            }
          });
        }
    
        else if (this.filterValue === 'Filterbyadditionalpayment') {
         
    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
      console.log('Flag set to 1:', this.flags);
    } else {
      this.flags = 2;
      console.log('Flag set to 2:', this.flags);
    }
    let submitModel: additionapayfilter = {
      paymentStatus: this.pay?.value,
      merchantId: this.merchantId,
      flag: this.flags,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value
    };
    this.service.AdditionalPayDateFilter(event.pageSize, event.pageIndex, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.addpay = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.addpay);
        this.dialog.closeAll()     
      } 
      else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.addpay = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.addpay);
      }
    });
        }
    
        else if (this.filterValue === 'AdditionalpayDatefilter') {

          const fromDate = this.Datefilteradditionalpay.get('FromDateRange')?.value;
    const toDate = this.Datefilteradditionalpay.get('ToDateRange')?.value;

    this.service.additionalpaymentsfilter(fromDate, toDate, event.pageSize, event.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dialog.closeAll()
        } 
        else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
  
        }
    })
        }
    
        else {
          this.service.additionalpayments(event.pageSize, event.pageIndex).subscribe((res: any) => {
            if (res.flag == 1) {
              this.transaction = res.response;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.transaction);
                   
            } else if (res.flag == 2) {
              this.transaction = [];
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.transaction); 
            }
          });
        }
      }  
}
