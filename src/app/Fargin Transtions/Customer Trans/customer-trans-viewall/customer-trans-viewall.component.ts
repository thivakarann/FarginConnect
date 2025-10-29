import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { CustomerTransViewComponent } from '../customer-trans-view/customer-trans-view.component';
import { customerpay, customerpayfilter } from '../../../fargin-model/fargin-model.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
interface Option { entityName: string; merchantId: number; }

@Component({
  selector: 'app-customer-trans-viewall',
  templateUrl: './customer-trans-viewall.component.html',
  styleUrl: './customer-trans-viewall.component.css'
})

export class CustomerTransViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    "ReceiptNumber",
    'entityname',
    'customername',
    'customemobile',
    'setupbox',
    'service',
    'branchName',
    'paymentmethod',
    'createdDateTime',
    'setTopBoxFee',
    'installationFee',
    'amount',
    'totalPayableAmount',
    'status',
    'paidAt',
    'view',
    'Receipt',
    'CheckStatus',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
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
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilval: any;
  filterValue: any;
  dialogRef: any;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('CustomerPayment') CustomerPayment!: TemplateRef<any>;
  @ViewChild('DateFilter') DateFilter!: TemplateRef<any>;
  userInput: string = '';
  options: Option[] = [];
  currentfil: any
  search: any;
  search1: any;
  selectedDate: any;
  selectedDate1: any;
  selectedOption: any;
  customerPay: any = FormGroup;
  Datefiltercustomer: any = FormGroup;
  custpay: any;
  merchantId: any;
  flags: any;
  backs: any = '';
  pageIndex3: number = 0;
  pageSize3 = 5;
  totalPages3: any;
  currentpage3: any;
  totalpage3: any;
  filter3: boolean = true;
  maxDate: any;
  currentfilvalShow: boolean = true;
  searchPerformed: boolean = false;

  constructor(private cryptoService: EncyDecySericeService, private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuepaymentexport = 'Customer Payment-Export'
            this.valuepaymentview = 'Customer Payment-View'
            this.valuepaymentReceipt = 'Customer Payment-Receipt'
            this.valuepaymentCheckStatus = 'Customer Payment-Check Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Customer Payment-Export') {
                this.valuepaymentexport = 'Customer Payment-Export'
              }
              if (this.actions == 'Customer Payment-View') {
                this.valuepaymentview = 'Customer Payment-View'
              }
              if (this.actions == 'Customer Payment-Receipt') {
                this.valuepaymentReceipt = 'Customer Payment-Receipt'
              }
              if (this.actions == 'Customer Payment-Check Status') {
                this.valuepaymentCheckStatus = 'Customer Payment-Check Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.Getall();

    this.customerPay = this.fb.group({
      pay: ['', [Validators.required]],
      startDate: ['',],
      endDate: ['',],
      selectedOption: [null, [Validators.required]],
      search1: ['']
    });

    this.Datefiltercustomer = this.fb.group({
      FromDateRange: ['', Validators.required],
      ToDateRange: ['', Validators.required]
    });

  }

  get pay() {
    return this.customerPay.get('pay');
  }

  get startDate() {
    return this.customerPay.get('startDate');
  }
  get endDate() {
    return this.customerPay.get('endDate');
  }

  Getall() {
    this.service.CustomerAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
        this.backs = '';
        this.filterValue = '';
        this.Datefiltercustomer.reset();
        this.customerPay.reset()
        this.userInput = '';
        this.options = [];
        this.selectedOption = ''
        this.search1 = ''
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
        this.backs = '';
        this.filterValue = '';
        this.Datefiltercustomer.reset();
        this.customerPay.reset()
        this.userInput = '';
        this.options = [];
        this.selectedOption = ''
        this.search1 = ''
      }
    });

  }

  filterdate() {
    const fromDate = this.Datefiltercustomer.get('FromDateRange')?.value;
    const toDate = this.Datefiltercustomer.get('ToDateRange')?.value;
    this.service.CustomerTransactionsFilter(fromDate, toDate, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dialog.closeAll();
      } else if (res.flag == 2) {
        this.toastr.error(res.responseMessage)
        this.dialog.closeAll();
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
      }
    })
  }

  resetfilter() {
    this.Datefiltercustomer.reset();
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }

  transactionview(id: any) {
    this.dialog.open(CustomerTransViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id, }
    })
  }

  track(id: any) {
    let submitModel: customerpay = {
      payId: id?.customerPayId,
      paidAmount: id.totalPayableAmount
    }
    this.service.Customerpay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => { this.Getall() }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }

  CustomerAdmin(filterValue: string) {
    if (!filterValue) { return; }
    if (filterValue) {
      this.service.CustomeradminSearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transaction = res.response;
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
          this.toastr.error('No Data Found');
        }
      });
    }
  }

  resets() {
    window.location.reload()
  }

  Filter(event: any) {
    console.log(event.target.value);
    this.filterValue = event.target.value;
    this.filterbymso();
  }

  filterbymso() {
    if (this.filterValue == 'Filterbycustomerpay') {
      this.dialogRef = this.dialog.open(this.CustomerPayment, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        disableClose: true,
        position: { right: '0px' },
      });
    }
    else if (this.filterValue == 'Datefilter') {
      this.dialogRef = this.dialog.open(this.DateFilter, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        disableClose: true,
        position: { right: '0px' },
      });
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }

  onSearchClick(searchSelect: NgSelectComponent): void {
    this.searchAPI(this.userInput);
    if (!searchSelect.isOpen) {
      searchSelect.open();
    }
  }

  onRemoveClick() {
    this.selectedOption = null;
    this.options = [];
  }

  searchAPI(query: string): void {
    this.service.Customerpaysearchfilter(query).subscribe((res: any) => {
      if (res.flag === 1) {
        this.options = res.response.map((item: any) => ({
          entityName: item.entityName,
          merchantId: item.merchantId
        }));

      } else {
        this.toastr.error(res.responseMessage);
      }
    }, (error) => {
      console.error('Error fetching data from API', error);
    });
  }

  onClear(): void {
    this.options = []; // Clear dropdown options
    this.selectedOption = null; // Reset the selected option
    this.userInput = ''; // Clear the input variable, if any
    console.log('Clear action triggered!');
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

  customerpay() {
    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
    } else {
      this.flags = 2;
    }
    let submitModel: customerpayfilter = {
      paymentStatus: this.pay?.value,
      merchantId: this.merchantId,
      flag: this.flags,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value
    };
    this.service.CustomerpayFilter(this.pageSize, this.pageIndex, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.custpay = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.custpay);
        this.dialog.closeAll()
      } else if (res.flag == 2) {
        this.custpay = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.custpay);
        this.dialog.closeAll()
      }
    });

  }

  resetcustomer(): void {
    this.customerPay.reset()
    this.userInput = '';
    this.options = [];
    this.selectedOption = ''
    this.search1 = ''
  }

  close() {
    this.dialog.closeAll()
    this.backs = '';
    this.filterValue = null;
  }

  future(value: any) {
    value.reset()
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.CustomeradminSearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transaction = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transaction);
          }
          else if (res.flag == 2) {
            this.transaction = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transaction);
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else if (this.filterValue === 'Filterbycustomerpay') {
      if (!this.startDate?.value && !this.endDate?.value) {
        this.flags = 1;
      } else {
        this.flags = 2;
      }
      let submitModel: customerpayfilter = {
        paymentStatus: this.pay?.value,
        merchantId: this.merchantId,
        flag: this.flags,
        startDate: this.startDate?.value,
        endDate: this.endDate?.value
      };
      this.service.CustomerpayFilter(event.pageSize, event.pageIndex, submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.custpay = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.custpay);
          this.dialog.closeAll()
        } else if (res.flag == 2) {
          this.custpay = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.custpay);
          this.dialog.closeAll()
        }
      });
    }
    else if (this.filterValue === 'Datefilter') {
      const fromDate = this.Datefiltercustomer.get('FromDateRange')?.value;
      const toDate = this.Datefiltercustomer.get('ToDateRange')?.value;
      this.service.CustomerTransactionsFilter(fromDate, toDate, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dialog.closeAll();
        } else if (res.flag == 2) {
          this.toastr.error(res.responseMessage)
          this.dialog.closeAll();
          this.transaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
        }
      })
    }
    else {
      this.service.CustomerAllTransactions(event.pageSize, event.pageIndex).subscribe((res: any) => {
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

