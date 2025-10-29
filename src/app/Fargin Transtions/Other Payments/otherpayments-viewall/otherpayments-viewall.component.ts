import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OtherpaymentsViewComponent } from '../otherpayments-view/otherpayments-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { customizepay, Otherpayment } from '../../../fargin-model/fargin-model.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { OtherpayManualpaymentComponent } from '../otherpay-manualpayment/otherpay-manualpayment.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
interface Option { entityName: string; merchantId: number; }

@Component({
  selector: 'app-otherpayments-viewall',
  templateUrl: './otherpayments-viewall.component.html',
  styleUrl: './otherpayments-viewall.component.css'
})

export class OtherpaymentsViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'paymentId',
    'InvoiceNumber',
    'entityname',
    'serviceName',
    'paymentmethod',
    'amount',
    'cgst',
    'sgst',
    'igst',
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
  message: any;
  showData: boolean = false;
  valueCustomizationexport: any;
  valueCustomizationReceipt: any;
  valueCustomizationView: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  showcategoryData!: boolean;
  valueCustomizationcheck: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex: number = 0;
  pageSize = 5;
  transactionexport: any;
  search1: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  pageIndex2: number = 0;
  pageSize2 = 5;
  pageIndex3: number = 0;
  pageSize3 = 5;
  totalPages3: any;
  currentpage3: any;
  totalpage3: any;
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  filter: boolean = true;
  filter1: boolean = true;
  filter2: boolean = true;
  filter3: boolean = true;
  currentfilVal: any;
  dialogRef: any;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('Customizedpay') Customizedpay!: TemplateRef<any>;
  @ViewChild('CustomizedFilter') CustomizedFilter!: TemplateRef<any>;
  backs: any = '';
  userInput: string = '';
  options: Option[] = [];
  search: any;
  Otherpayment: any = FormGroup;
  Otherpaymentfilter: any = FormGroup;
  flags: any
  otherpay: any;
  merchantId: any;
  selectedOption: any;
  filters: boolean = false;
  filterValue: any;
  maxDate: any;
  valueCustomizationpay: any;
  currentfilvalShow: boolean = false;
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
            this.valueCustomizationexport = 'Customized Payment-Export'
            this.valueCustomizationView = 'Customized Payment-View'
            this.valueCustomizationReceipt = 'Customized Payment-Invoice'
            this.valueCustomizationcheck = 'Customized Payment-Check Status'
            this.valueCustomizationpay = 'Customized Payment-Manual Payment'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Customized Payment-Export') {
                this.valueCustomizationexport = 'Customized Payment-Export'
              }
              if (this.actions == 'Customized Payment-View') {
                this.valueCustomizationView = 'Customized Payment-View'
              }
              if (this.actions == 'Customized Payment-Invoice') {
                this.valueCustomizationReceipt = 'Customized Payment-Invoice'
              }

              if (this.actions == 'Customized Payment-Check Status') {
                this.valueCustomizationcheck = 'Customized Payment-Check Status'
              }

              if (this.actions == 'Customized Payment-Manual Payment') {
                this.valueCustomizationpay = 'Customized Payment-Manual Payment'
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

    this.Otherpayment = this.fb.group({
      pay: ['', [Validators.required]],
      startDate: ['',],
      endDate: ['',],
      selectedOption: [null, [Validators.required]],
      search1: ['']
    });

    this.Otherpaymentfilter = this.fb.group({
      FromDateRange: ['', Validators.required],
      ToDateRange: ['', Validators.required]
    });

  }

  get pay() {
    return this.Otherpayment.get('pay');
  }

  get startDate() {
    return this.Otherpayment.get('startDate');
  }
  get endDate() {
    return this.Otherpayment.get('endDate');
  };

  Getall() {
    this.service.OtherPay(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
        this.backs = '';
        this.filterValue = '';
        this.userInput = '';
        this.Otherpayment.reset();
        this.Otherpaymentfilter.reset()
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
        this.userInput = '';
        this.Otherpayment.reset();
        this.Otherpaymentfilter.reset()
        this.options = [];
        this.selectedOption = ''
        this.search1 = ''
      }
    });
  }

  track(id: any) {
    let submitModel: customizepay = {
      payId: id?.payId,
    }
    this.service.Customizepay(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => { this.Getall() }, 500);
      }
      else {
        this.toastr.error(res.responseMessage);
      }
    })
  };

  viewreciept(id: any) {
    this.service.OtherPaymentReciept(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  };

  transactionview(id: any) {
    this.dialog.open(OtherpaymentsViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true,
      data: { value: id, }
    })
  }

  filterdate() {
    const fromDate = this.Otherpaymentfilter.get('FromDateRange')?.value;
    const toDate = this.Otherpaymentfilter.get('ToDateRange')?.value;
    this.service.OtherPayFilter(fromDate, toDate, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
        this.dialog.closeAll()
      } else if (res.flag == 2) {
        this.dialog.closeAll()
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);

      }
    })
  }
  custopay(filterValue: string) {
    console.log(filterValue)
    if (filterValue) {
      this.service.CustomizationPaySearch(filterValue, this.pageSize, this.pageIndex).subscribe({
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
      console.log(filterValue)
      return;
    }
  }

  Filter(event: any) {
    this.filterValue = event.target.value;
    this.filterbymso();
  }

  filterbymso() {
    if (this.filterValue == 'FilterbyCustomizedpay') {
      this.dialogRef = this.dialog.open(this.Customizedpay, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '1000ms',
        disableClose: true,
        position: { right: '0px' },
      });
    }
    else if (this.filterValue == 'CustomizedPaymentdatefilter') {
      this.dialogRef = this.dialog.open(this.CustomizedFilter, {
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
    console.log(selectedItem)
    if (selectedItem) {
      this.selectedOption = selectedItem.merchantId;
      this.search1 = selectedItem.entityName;
      this.merchantId = this.selectedOption;
    }
  }

  searchAPI(query: string): void {
    this.service.OtherPaymentSearch(query).subscribe((res: any) => {
      if (res.flag === 1) {
        this.options = res.response.map((item: any) => ({
          entityName: item.entityName,
          merchantId: item.merchantId
        }));
      }
      else {
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

  Otherpay() {
    if (!this.startDate?.value && !this.endDate?.value) {
      this.flags = 1;
    } else {
      this.flags = 2;
    }
    let submitModel: Otherpayment = {
      paymentStatus: this.pay?.value,
      merchantId: this.merchantId,
      flag: this.flags,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value
    };
    this.service.OtherPaymentFilter(this.pageSize, this.pageIndex, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.otherpay = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.otherpay);
        this.dialog.closeAll()
      } else if (res.flag == 2) {
        this.otherpay = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.otherpay);
        this.dialog.closeAll()
      }
    });
  }

  close() {
    this.dialog.closeAll();
    this.backs = '';
    this.filterValue = null;
  }

  resetcustomer(): void {
    this.Otherpayment.reset()
    this.userInput = '';
    this.options = [];
    this.selectedOption = ''
    this.search1 = ''
  }

  resetfilter() {
    this.Otherpaymentfilter.reset();
  }

  future(value: any) {
    value.reset()
  }

  Manuvalpayments(id: any) {
    this.dialog.open(OtherpayManualpaymentComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.OtherPay(this.pageSize, this.pageIndex).subscribe((res: any) => {
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

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.CustomizationPaySearch(this.currentfilVal, event.pageSize, event.pageIndex).subscribe({
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
    else if (this.filterValue === 'FilterbyCustomizedpay') {
      if (!this.startDate?.value && !this.endDate?.value) {
        this.flags = 1;
      } else {
        this.flags = 2;
      }
      let submitModel: Otherpayment = {
        paymentStatus: this.pay?.value,
        merchantId: this.merchantId,
        flag: this.flags,
        startDate: this.startDate?.value,
        endDate: this.endDate?.value
      };
      this.service.OtherPaymentFilter(event.pageSize, event.pageIndex, submitModel).subscribe((res: any) => {
        if (res.flag == 1) {
          this.otherpay = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.otherpay);
          this.dialog.closeAll()
        } else if (res.flag == 2) {
          this.toastr.error(res.responseMessage);
          this.dialog.closeAll()
          this.otherpay = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.otherpay);
        }
      });
    }
    else if (this.filterValue === 'CustomizedPaymentdatefilter') {
      const fromDate = this.Otherpaymentfilter.get('FromDateRange')?.value;
      const toDate = this.Otherpaymentfilter.get('ToDateRange')?.value;
      this.service.OtherPayFilter(fromDate, toDate, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
          this.dialog.closeAll()
        } else if (res.flag == 2) {
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
      this.service.OtherPay(event.pageSize, event.pageIndex).subscribe((res: any) => {
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
  }
}
