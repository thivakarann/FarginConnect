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
import { TransManualPayComponent } from '../trans-manual-pay/trans-manual-pay.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manuvelduesforcloudfee } from '../../../Fargin Model/fargin-model/fargin-model.module';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
interface Option { entityName: string; merchantId: number; }

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
    'InVoiceNumber',
    'entityname',
    'amount',
    'sgst',
    'cgst',
    'igst',
    'paymentmethod',
    'count',
    'totalcost',
    'whatsappSmsCount',
    'whatsappSmsTotalAmount',
    'otherPayAmount',
    'otherpaymentview',
    'totalamount',
    'createdDateTime',
    'status',
    'paidAt',
    'Manualpay',
    'view',
    'CheckStatus',
    'receipt',
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
 roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
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
  search1: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  currentfilVal: any = "";
  search2: any;
  searches: any;
  backs: any = '';
  userInput: string = '';
  options: Option[] = [];
  search: any;
  filterValue: any;
  dialogRef: any;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('CloudFeeDateFilter') CloudFeeDateFilter!: TemplateRef<any>;
  @ViewChild('CloudFeeSearch') CloudFeeSearch!: TemplateRef<any>;
  @ViewChild('DueGenerated') DueGenerated!: TemplateRef<any>;
  cloudfeesearch: any = FormGroup;
  Datefiltercloudfee: any = FormGroup;
  Duegenerate: any = FormGroup
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
  maxDate: any;
  valuemanval: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  searchPerformed: boolean = false;

  constructor(private cryptoService:EncyDecySericeService,private router: Router, private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog, private fb: FormBuilder) { }

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
            this.valuemanval = 'Cloud Fee Payments-Manual Payment'
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
              if (this.actions == 'Cloud Fee Payments-Manual Payment') {
                this.valuemanval = 'Cloud Fee Payments-Manual Payment'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.cloudfeesearch = this.fb.group({
      pay: ['', [Validators.required]],
      startDate: ['',],
      endDate: ['',],
      selectedOption: [null, [Validators.required]],
      search1: ['']

    });

    this.Datefiltercloudfee = this.fb.group({
      FromDateRange: ['', Validators.required],
      ToDateRange: ['', Validators.required]
    });

    this.Duegenerate = this.fb.group({
      searches: ['', Validators.required],
      search2: ['']
    });

    this.Getall();
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

  OtherpaymentsView(id: any) {
    this.router.navigate([`dashboard/maintenanceotherpay-view/${id}`], {
      queryParams: { alldata: id }
    })
  }

  Getall() {
    this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
        this.FromDateRange = '';
        this.ToDateRange = '';
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
        this.FromDateRange = '';
        this.ToDateRange = '';
      }
    });
  }

  filterdate() {
    const fromDate = this.Datefiltercloudfee.get('FromDateRange')?.value;
    const toDate = this.Datefiltercloudfee.get('ToDateRange')?.value;
    this.service.MaintenanceTransactionFilter(fromDate, toDate, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dialog.closeAll();
      } else if (res.flag == 2) {
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
        setTimeout(() => { this.Getall() }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  }
  transactionview(id: any) {
    this.dialog.open(MaintanceViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id, }
    })
  }

  subscription(filterValue: string) {
    if (filterValue) {
      this.service.Subscriptionsearch(filterValue, this.pageSize, this.pageIndex).subscribe({
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
    else if (!filterValue) {
      return;
    }
  }

  manuvalpayments(id: any) {
    this.dialog.open(TransManualPayComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.MaintenanceAllTransactions(this.pageSize, this.pageIndex).subscribe((res: any) => {
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
        exitAnimationDuration: '500ms',
        disableClose: true,
        position: { right: '0px' },
      });
    }
    else if (this.filterValue == 'Datefiltercloudfee') {
      this.dialogRef = this.dialog.open(this.CloudFeeDateFilter, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
      });
    }
    else if (this.filterValue == 'DuegenerateCloudFee') {
      this.dialogRef = this.dialog.open(this.DueGenerated, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
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

  onDropdownChange(selectedItem: any): void {
    if (selectedItem) {
      this.selectedOption = selectedItem.merchantId;
      this.search1 = selectedItem.entityName;
      this.merchantId = this.selectedOption;
    }
  }

  searchAPI(query: string): void {
    this.service.CloudFeeSearch(query).subscribe((res: any) => {
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
    this.service.CloudFeeDateFilter(this.pageSize, this.pageIndex, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.cloudfee = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.cloudfee);
        this.dialog.closeAll()
      } else if (res.flag == 2) {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()
        this.cloudfee = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.cloudfee);
      }
    });
  }

  close() {
    this.dialog.closeAll();
    this.backs = '';
    this.filterValue = null;
  }

  resetsearch(): void {
    this.cloudfeesearch.reset()
    this.userInput = '';
    this.options = [];
    this.selectedOption = ''
    this.search1 = ''
  }

  resetfilter() {
    this.Datefiltercloudfee.reset();
  }

  resetdue() {
    this.Duegenerate.reset();
    this.search2 = ''
    this.searches = ''
  }

  Duegeneration() {
    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
      console.log('Flag set to 1:', this.flags);
    } else {
      this.flags = 2;
      console.log('Flag set to 2:', this.flags);
    }
    let submitModel: Manuvelduesforcloudfee = {
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

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.Subscriptionsearch(this.currentfilVal, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
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
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else if (this.filterValue === 'Filterbycloudffeesearch') {
      if (!this.startDate?.value && !this.endDate?.value) {
        this.flags = 1;
      } else {
        this.flags = 2;
      }
      let submitModel: Cloudfee = {
        paymentStatus: this.pay?.value,
        merchantId: this.merchantId,
        flag: this.flags,
        startDate: this.startDate?.value,
        endDate: this.endDate?.value
      };
      this.service.CloudFeeDateFilter(event.pageSize, event.pageIndex, submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.cloudfee = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.cloudfee);
          this.dialog.closeAll()
        } else if (res.flag == 2) {
          this.toastr.error(res.responseMessage);
          this.dialog.closeAll()
          this.cloudfee = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.cloudfee);
        }
      });
    }
    else if (this.filterValue === 'Datefiltercloudfee') {
      const fromDate = this.Datefiltercloudfee.get('FromDateRange')?.value;
      const toDate = this.Datefiltercloudfee.get('ToDateRange')?.value;
      this.service.MaintenanceTransactionFilter(fromDate, toDate, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dialog.closeAll()
        } else if (res.flag == 2) {
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
      this.service.MaintenanceAllTransactions(event.pageSize, event.pageIndex).subscribe((res: any) => {
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
