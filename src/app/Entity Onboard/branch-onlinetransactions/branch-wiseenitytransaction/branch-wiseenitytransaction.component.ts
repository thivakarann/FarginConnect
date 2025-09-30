import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { BranchOnlineviewComponent } from '../branch-onlineview/branch-onlineview.component';
import { Location } from '@angular/common';
import { ViewadditionalpaymentsComponent } from '../../../Fargin Transtions/additionalpayments/viewadditionalpayments/viewadditionalpayments.component';

@Component({
  selector: 'app-branch-wiseenitytransaction',
  templateUrl: './branch-wiseenitytransaction.component.html',
  styleUrl: './branch-wiseenitytransaction.component.css',
})
export class BranchWiseenitytransactionComponent {

  channel: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  displayedColumns: any[] = [
    'alcotId',
    'branchname',
    'customerName',
    'mobileNumber',
    'pgPaymentId',
    'setupBoxNumber',
    'setTopBoxFee',
    'installationFee',
    'amount',
    'totalPayableAmount',
    'paymentMethod',
    'status',
    'createdDateTime',
    'paidAt',
    'view',
    'Receipt',
  ];
  dataSources: any;
  displayedadditionalColumns: any[] = [
    'alcotId',
    'branchname',
    'pgPaymentId',
    'customerName',
    'mobileNumber',
    'Serivice',
    'setupBoxNumber',
    'quantity',
    'paidAmount',
    'paymentMethod',
    'createdDateTime',
    'status',
    'view',
    'Receipt',
    'paidAt',
  ];
  valuechannelAdd: any;
  getdashboard: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  actions: any;
  roleId: any = sessionStorage.getItem('roleId');
  valuechannelexport: any;
  valuechannelView: any;
  roleName = sessionStorage.getItem('roleName');
  channelexport: any;
  currentfilval: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  currentfilvalShow!: boolean;
  filter: boolean = false;
  Viewall: unknown[] | undefined;
  id: any;
  merchantId: any;
  transactionValue: any;
  searchPerformed: boolean = false;
  valueexport: any;
  errorMessage: any;
  valueView: any;
  valueReceipt: any;
  viewallexport: any;
  selectedTransactionType: string = 'Due Transaction';
  additionalValue: any;
  Viewsearchall: any;
  currentfilvals: any;
  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
      this.merchantId = param.All;
    });

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueexport = 'Entity View Branch-online View-Export';
            this.valueView = 'Entity View-Branch-Transactions-View';
            this.valueReceipt = 'Entity View-Branch-Transactions-Receipt';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;

              if (this.actions == 'Entity View Branch-online View-Export') {
                this.valueexport = 'Entity View Branch-online View-Export';
              }

              if (this.actions == 'Entity View-Branch-Transactions-View') {
                this.valueView = 'Entity View-Branch-Transactions-View';
              }

              if (this.actions == 'Entity View-Branch-Transactions-Receipt') {
                this.valueReceipt = 'Entity View-Branch-Transactions-Receipt';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.Getall();
  }

  Getall() {
    this.service
      .entityonlinebranchs(this.id, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.transactionValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transactionValue);
          this.currentfilvalShow = false;
        } else if (res.flag === 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.currentfilvalShow = false;
        }
      });
  }
  getAdditionalAll() {
    this.service
      .additionalBranchTransaction(this.id, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if (res.flag === 1) {
          this.additionalValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSources = new MatTableDataSource(this.additionalValue);
          this.currentfilvalShow = false;
        } else if (res.flag === 2) {
          this.dataSources = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.currentfilvalShow = false;
        }
      });
  }

  view(id: any) {
    this.router.navigate([`dashboard/channelconfiguration-singleview/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  channelsearch(filterValue: string) {
    if (filterValue) {
      this.service
        .entitysearchbranchs(
          this.id,
          filterValue,
          this.pageSize,
          this.pageIndex,
          1
        )
        .subscribe({
          next: (res: any) => {
            if (res.response) {
              this.Viewall = res.response;
              this.dataSource = new MatTableDataSource(this.Viewall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.currentfilvalShow = true;
            } else if (res.flag === 2) {
              this.Viewall = [];
              this.dataSource = new MatTableDataSource(this.Viewall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.currentfilvalShow = true;
            }
          },
          error: (err: any) => {
            this.toastr.error('No Data Found');
          },
        });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }
  additionalcsearch(filterValues: string) {
    if (filterValues) {
      this.service
        .entitysearchbranchs(
          this.id,
          filterValues,
          this.pageSize,
          this.pageIndex,
          2
        )
        .subscribe({
          next: (res: any) => {
            if (res.response) {
              this.Viewsearchall = res.response;
              this.dataSources = new MatTableDataSource(this.Viewsearchall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.currentfilvalShow = true;
            } else if (res.flag === 2) {
              this.Viewsearchall = [];
              this.dataSources = new MatTableDataSource(this.Viewsearchall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.currentfilvalShow = true;
            }
          },
          error: (err: any) => {
            this.toastr.error('No Data Found');
          },
        });
    } else if (!filterValues) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service
        .entitysearchbranchs(
          this.id,
          this.currentfilval,
          event.pageSize,
          event.pageIndex,
          1
        )
        .subscribe({
          next: (res: any) => {
            if (res.response) {
              this.Viewall = res.response;

              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSource = new MatTableDataSource(this.Viewall);
            } else if (res.flag === 2) {
              this.Viewall = [];
              this.dataSource = new MatTableDataSource(this.Viewall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
            }
          },
          error: (err: any) => {
            this.toastr.error('No Data Found');
          },
        });
    } else {
      this.service
        .entityonlinebranchs(this.id, event.pageSize, event.pageIndex)
        .subscribe((res: any) => {
          if (res.flag === 1) {
            this.transactionValue = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transactionValue);
          } else if (res.flag === 2) {
            this.dataSource = new MatTableDataSource([]);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          }
        });
    }
  }

  getAdditionalData(event: any) {
    if (this.currentfilvalShow) {
      this.service
        .entitysearchbranchs(
          this.id,
          this.currentfilvals,
          event.pageSize,
          event.pageIndex,
          2
        )
        .subscribe({
          next: (res: any) => {
            if (res.response) {
              this.Viewsearchall = res.response;
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
              this.dataSources = new MatTableDataSource(this.Viewsearchall);
            } else if (res.flag === 2) {
              this.Viewsearchall = [];
              this.dataSources = new MatTableDataSource(this.Viewsearchall);
              this.totalPages = res.pagination.totalElements;
              this.totalpage = res.pagination.pageSize;
              this.currentpage = res.pagination.currentPage;
            }
          },
          error: (err: any) => {
            this.toastr.error('No Data Found');
          },
        });
    } else {
      this.service
        .additionalBranchTransaction(this.id, event.pageSize, event.pageIndex)
        .subscribe((res: any) => {
          if (res.flag === 1) {
            this.additionalValue = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSources = new MatTableDataSource(this.additionalValue);
          } else if (res.flag === 2) {
            this.dataSources = new MatTableDataSource([]);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
          }
        });
    }
  }
  View(id: any) {
    this.dialog.open(BranchOnlineviewComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
    });
  }

  additionalView(id: any) {
    this.dialog.open(ViewadditionalpaymentsComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: {
        value: id,
      },
    });
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }

  additionalReceipt(id: any) {
    this.service.additionalpaymentsreceipts(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }
  close() {
    this.location.back();
  }

  transactionsDropdown(event: any) {
    this.selectedTransactionType = event.target.value;
    this.updateTableData();
    this.currentfilvals = '';
    this.currentfilval = '';
  }
  updateTableData() {
    if (this.selectedTransactionType === 'Due Transaction') {
      this.Getall();
    } else if (this.selectedTransactionType === 'Additional Transaction') {
      this.getAdditionalAll();
    }
  }
}
