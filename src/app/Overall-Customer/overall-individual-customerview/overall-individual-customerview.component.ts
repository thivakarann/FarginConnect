import { Component, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OfflineDetailsComponent } from '../offline-details/offline-details.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-overall-individual-customerview',
  templateUrl: './overall-individual-customerview.component.html',
  styleUrl: './overall-individual-customerview.component.css'
})
export class OverallIndividualCustomerviewComponent implements OnInit {
  id: any;
  customerview: any;
  customerviewalcot: any
  customer: any;
  selectedTab: string = 'customer-info';
  items: any[] = []; // The array of items to paginate
  currentPage: any = 1; // The current page number
  itemsPerPage = 3; //
  page: number = 1;
  page4: number = 1;
  page5: number = 1;
  term: any;
  selected: any;
  searchText: any;
  data: any;
  status: any;
  viewcustomer: any;
  alcotchannel: any;
  bouquetPlan: any;
  lcopChannel: any;
  showData: boolean = false;
  showDatas: boolean = false;
  showData1: boolean = false;
  viewData: boolean = false;
  totalAmount: number = 0;
  totalbouqet: number = 0;
  totallcop: number = 0;
  overallAmount: number = 0;
  isChecked!: boolean;
  totalamount: any;
  valuecustomerinfo: any;
  valueSetupBox: any;
  valueTransactions: any;
  valueAdditionalPayments: any;
  valuesetsts: any;
  valuesetview: any;
  valuetransreceipt: any;
  valueaddinvoice: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  total: any;
  totalpages: any;
  currentpages: any;
  totalsearch: any;
  totalpagesearch: any;
  currentpagesearch: any;
  vaaluedetails: any;
  valuecustomerRefunds: any;
  pageIndex: number = 0;
  pageSize: number = 3;
  pageSizeadd: number = 3;
  pageIndexadd: number = 0;
  filter: boolean = false;
  filter1: boolean = false;
  filter2: boolean = false;
  pageIndex1: number = 0;
  pageSize1 = 3;
  filter3: boolean = false;
  totalsearchadd: any;
  totalpagesearchadd: any;
  currentpagesearchadd: any;
  pageadd: number = 0;
  pagesizeadd = 3;

  //settopbox table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = [
    'Sno',
    'stb',
    'mso',
    'region',
    'setTopBoxFee',
    'installationFee',
    'doorno',
    'area',
    'streetname',
    'billingdate',
    'status',
    'duestatus',
    'viewplan',
    'activatedate',
    'inactivatedate',
    'createdby',
    'createdat',
  ];
  searchPerformed: any;
  setupboxview: any;
  stbId: any;

  // Transaction
  dataSourceTransaction: any;
  displayedColumnsTransaction: string[] = [
    'sno',
    'id',
    'numbers',
    'setTopBoxFee',
    'installationFee',
    'amounts',
    'totalPayableAmount',
    'paymenstats',
    'method',
    'generatedat',
    'paidat',
    'receipts',
  ];
  currentfilvalShow!: boolean;
  currentfilval: any;
  transaction: any;

  //Additional
  dataSourceAdditional: any;
  displayedColumnsAdditional: string[] = [
    'snoadd',
    "Service",
    'Category',
    'Quantity',
    'Amount',
    'Id',
    'Reference',
    'Method',
    'Status',
    'Reciepts',
    'Paid',
  ];
  currentfilvalShowAdd!: boolean;
  currentfilvaladd: any;
  additionlpay: any;

  //Refunds
  dataSourceRefund: any;
  displayedColumnsRefund: string[] = [
    'Snos',
    'stbs',
    'Types',
    'Requestid',
    'Paymentid',
    'Paidamount',
    'Refundsamount',
    'Refundstatus',
    'Offline',
    'RequestedsAt',
  ];

  dataSourceRefundAdditional: any;
  displayedColumnsRefundAdditional: string[] = [
    'Snos',
    'Service',
    'category',
    'quantity',
    'Types',
    'Requestid',
    'Paymentid',
    'Paidamount',
    'Refundsamount',
    'Refundstatus',
    'RequestedsAt',
  ];
  refundval: any;
  selectedTransactionType: string = 'Due Transaction';
  currentfilvals: any;
  refundadditional: any;
  Roledetails: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {

    this.Role();

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.CustomerTotalPlanAmount(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.totalamount = res.response.totalAmount;
      }
    });

    this.service.ViewCustomerBasicInfo(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewcustomer = res.response;
      } else {
        this.viewData = false;
      }
    });
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };

    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }

    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;;
          if (this.roleId == 1) {
            this.valuecustomerinfo = 'Customers-Customer Info';
            this.valueSetupBox = 'Customers-Set-Topbox';
            this.valueTransactions = 'Customers-Transaction';
            this.valueAdditionalPayments = 'Customers-Additional Payments';
            this.valuesetsts = 'Customers-Setup Box Status'
            this.valuesetview = 'Customers-Set-Topbox View'
            this.valuetransreceipt = 'Customers-Transaction Receipt'
            this.valueaddinvoice = 'Customers-Additional Payments Receipt'
            this.valuecustomerRefunds = 'Customers-Refunds'
            this.vaaluedetails = 'Customers-Refunds-View';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Customers-Additional Payments Receipt') {
                this.valueaddinvoice = 'Customers-Additional Payments Receipt'
              }
              if (this.actions == 'Customers-Transaction Receipt') {
                this.valuetransreceipt = 'Customers-Transaction Receipt'
              }
              if (this.actions == 'Customers-Setup Box Status') {
                this.valuesetsts = 'Customers-Setup Box Status'
              }
              if (this.actions == 'Customers-Set-Topbox View') {
                this.valuesetview = 'Customers-Set-Topbox View'
              }
              if (this.actions == 'Customers-Customer Info') {
                this.valuecustomerinfo = 'Customers-Customer Info';

              }
              if (this.actions == 'Customers-Set-Topbox') {
                this.valueSetupBox = 'Customers-Set-Topbox'
              }
              if (this.actions == 'Customers-Transaction') {
                this.valueTransactions = 'Customers-Transaction'
              }
              if (this.actions == 'Customers-Additional Payments') {
                this.valueAdditionalPayments = 'Customers-Additional Payments'
              }
              if (this.actions == 'Customers-Refunds') {
                this.valuecustomerRefunds = 'Customers-Refunds'
              }
              if (this.actions == 'Customers-Refunds-View') {
                this.vaaluedetails = 'Customers-Refunds-View'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }

  //Active tabe method

  selectTab(tab: string) {
    this.selectedTab = tab;
    if (this.selectedTab == 'Setup-boxs') {
      this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.setupboxview = res.response;
          this.dataSource = new MatTableDataSource(this.setupboxview.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
    else if (this.selectedTab == 'Transaction') {
      this.service.CustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag === 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSourceTransaction = new MatTableDataSource(this.transaction);
          this.currentfilvalShow = false;
        } else if (res.flag === 2) {
          this.dataSourceTransaction = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.currentfilvalShow = false;
        }
      });
    }
    else if (this.selectedTab === 'Additional-Payments') {
      this.service.AdditionalPaymentsCustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionlpay = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
          this.currentfilvalShowAdd = false;
        } else if (res.flag == 2) {
          this.dataSourceAdditional = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.currentfilvalShowAdd = false;
        }
      });
    }
    else if (this.selectedTab === 'Refund') {
      this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.refundval = res.response;
          this.dataSourceRefund = new MatTableDataSource(
            this.refundval.reverse()
          );
          this.dataSourceRefund.sort = this.sort;
          this.dataSourceRefund.paginator = this.paginator;
          this.dataSourceRefund.filterPredicate = (
            data: any,
            filter: string
          ) => {
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
        } else if (res.flag == 2) {
          this.dataSourceRefund = new MatTableDataSource([]);

          this.dataSourceRefund.sort = this.sort;
          this.dataSourceRefund.paginator = this.paginator;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  reloadsettopbox() {
    this.service.ViewCustomersSetupBox(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxview = res.response;
        this.dataSource = new MatTableDataSource(this.setupboxview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilterRefund(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRefund.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSourceRefund.paginator) {
      this.dataSourceRefund.paginator.firstPage();
    }
  }

  applyFilterRefundAdd(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRefundAdditional.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSourceRefundAdditional.paginator) {
      this.dataSourceRefundAdditional.paginator.firstPage();
    }
  }

  reloadrefunds() {
    this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refundval = res.response.reverse();
        this.dataSourceRefund = new MatTableDataSource(this.refundval);
        this.dataSourceRefund.sort = this.sort;
        this.dataSourceRefund.paginator = this.paginator;
        this.dataSourceRefund.filterPredicate = (data: any, filter: string) => {
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
      } else if (res.flag == 2) {
        this.dataSourceRefund = new MatTableDataSource([]);
        this.dataSourceRefund.sort = this.sort;
        this.dataSourceRefund.paginator = this.paginator;
      }
    });
  }

  reloadrefundadd() {
    this.service.RefundForCustomerAdditionalView(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refundadditional = res.response.reverse();
        this.dataSourceRefundAdditional = new MatTableDataSource(this.refundadditional);
        this.dataSourceRefundAdditional.sort = this.sort;
        this.dataSourceRefundAdditional.paginator = this.paginator;
        this.dataSourceRefundAdditional.filterPredicate = (data: any, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return (currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]));
          }, '')
            .toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      } else if (res.flag == 2) {
        this.dataSourceRefundAdditional = new MatTableDataSource([]);
        this.dataSourceRefundAdditional.sort = this.sort;
        this.dataSourceRefundAdditional.paginator = this.paginator;
      }
    });
  }

  transactionsDropdown(event: any) {
    this.selectedTransactionType = event.target.value;
    this.updateTableData();
    this.currentfilval = '';
    this.currentfilvals = '';
  }

  updateTableData() {
    if (this.selectedTransactionType === 'Due Transaction') {
      this.service.RefundForCustomerView(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.refundval = res.response.reverse();
          this.dataSourceRefund = new MatTableDataSource(this.refundval);
          this.dataSourceRefund.sort = this.sort;
          this.dataSourceRefund.paginator = this.paginator;
          this.dataSourceRefund.filterPredicate = (data: any, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();
            const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
              return (currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]));
            }, '')
              .toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
        } else if (res.flag == 2) {
          this.dataSourceRefund = new MatTableDataSource([]);
          this.dataSourceRefund.sort = this.sort;
          this.dataSourceRefund.paginator = this.paginator;
        }
      });
    }
    else if (this.selectedTransactionType === 'Additional Transaction') {
      this.service.RefundForCustomerAdditionalView(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.refundadditional = res.response.reverse();
          this.dataSourceRefundAdditional = new MatTableDataSource(this.refundadditional);
          this.dataSourceRefundAdditional.sort = this.sort;
          this.dataSourceRefundAdditional.paginator = this.paginator;
          this.dataSourceRefundAdditional.filterPredicate = (data: any, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();
            const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
              return (currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]));
            }, '')
              .toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
        } else if (res.flag == 2) {
          this.dataSourceRefundAdditional = new MatTableDataSource([]); this.dataSourceRefundAdditional.sort = this.sort;
          this.dataSourceRefundAdditional.paginator = this.paginator;
        }
      });
    }
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }

  close() {
    this.location.back()
  }

  viewChannel(id: any) {
    this.dialog.open(ChannelViewComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id }
    })
  }

  offline(id: any) {
    this.dialog.open(OfflineDetailsComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { value: id }
    })
  }

  view(id: any) {
    this.router.navigate([`dashboard/plan-details-customer/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  Customercustid(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
    this.service.Customercustomeridsearch(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.transaction = res.response;
          this.showData = true;
        }
        else if (res.flag === 2) {
          this.transaction = [];
          this.showData = false;
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }

  viewreciept(id: any) {
    this.service.additionalpaymentsreceipts(id).subscribe((res: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      }
    })
  }

  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
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


  renderPageadd(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndexadd = event.pageIndex;  // Update current page index
    this.pageSizeadd = event.pageSize;           // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit()
  }


  changePageIndexadd(newPageIndexs: number) {
    this.pageIndexadd = newPageIndexs;
    this.renderPage({
      pageIndex: newPageIndexs,
      pageSize: this.pageSizeadd,
      // length: this.totalItems
    } as PageEvent);
  }


  // Handle pagination for filtered search results

  renderPage1(event: PageEvent) {
    this.pageIndex1 = event.pageIndex;
    this.pageSize1 = event.pageSize;
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
    this.customerpay(this.currentfilval);
  }

  // Change page index for filtered search results

  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1
    } as PageEvent);
  }



  // Handle pagination for filtered search results

  renderadd(event: PageEvent) {
    this.pageadd = event.pageIndex;
    this.pagesizeadd = event.pageSize;
    this.customerpayadd(this.currentfilvaladd);
  }

  // Change page index for filtered search results

  changePageadd(newPageadd: number) {
    this.pageadd = newPageadd;
    this.renderadd({ pageIndex: newPageadd, pageSize: this.pagesizeadd } as PageEvent);
  }

  // Perform the search and update the filtered results

  customerpayadd(filterValue: string) {
    if (filterValue) {
      this.service.customeradditionaltransactionsearch(this.id, filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.additionlpay = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
            this.currentfilvalShowAdd = true;
          } else if (res.flag == 2) {
            this.additionlpay = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
            this.currentfilvalShowAdd = true;
          }
        },
      });
    } else {
      this.toastr.error('Please enter a value to search');
    }
  }


  reloadadd() {
    this.service.AdditionalPaymentsCustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.additionlpay = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
        this.currentfilvalShowAdd = false;
      } else if (res.flag == 2) {
        this.dataSourceAdditional = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.currentfilvalShowAdd = false;
      }
    });
  }


  getDataAdditional(event: any) {
    if (this.currentfilvalShowAdd) {
      this.service.customeradditionaltransactionsearch(this.id, this.currentfilvaladd, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.additionlpay = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
          } else if (res.flag == 2) {
            this.additionlpay = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
          }
        },
      });
    } else {
      this.service.AdditionalPaymentsCustomerTransaction(this.id, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.additionlpay = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSourceAdditional = new MatTableDataSource(this.additionlpay);
        } else if (res.flag == 2) {
          this.dataSourceAdditional = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
        }
      });
    }
  }

  // Perform the search and update the filtered results

  customerpay(filterValue: string) {
    if (filterValue) {
      this.service.customertransactionsearch(this.id, filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transaction = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceTransaction = new MatTableDataSource(this.transaction);
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.transaction = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceTransaction = new MatTableDataSource(this.transaction);
            this.currentfilvalShow = true;
          }
        },
      });
    } else {
      this.toastr.error('Please enter a value to search');
    }
  }


  reload() {
    this.service.CustomerTransaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag === 1) {
        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSourceTransaction = new MatTableDataSource(this.transaction);
        this.currentfilvalShow = false;
      } else if (res.flag === 2) {
        this.dataSourceTransaction = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.currentfilvalShow = false;
      }
    });
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.customertransactionsearch(this.id, this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transaction = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceTransaction = new MatTableDataSource(this.transaction);
          } else if (res.flag == 2) {
            this.transaction = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSourceTransaction = new MatTableDataSource(this.transaction);
          }
        },
      });
    }
    else {
      this.service.CustomerTransaction(this.id, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag === 1) {
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSourceTransaction = new MatTableDataSource(this.transaction);
        } else if (res.flag === 2) {
          this.dataSourceTransaction = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
        }
      });
    }
  }

}


