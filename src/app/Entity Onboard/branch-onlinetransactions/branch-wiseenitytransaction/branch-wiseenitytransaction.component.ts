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
@Component({
  selector: 'app-branch-wiseenitytransaction',
  templateUrl: './branch-wiseenitytransaction.component.html',
  styleUrl: './branch-wiseenitytransaction.component.css'
})
export class BranchWiseenitytransactionComponent {
  channel: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  displayedColumns: any[] =
    [

      "alcotId",
      // 'branchname',
      "pgPaymentId",
      "customerName",
      "mobileNumber",
      'setupBoxNumber',
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
  roleId: any = sessionStorage.getItem('roleId')
  valuechannelexport: any;
  valuechannelView: any;
  roleName = sessionStorage.getItem('roleName')
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
  valueReceipt:any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router, private ActivateRoute: ActivatedRoute, private location: Location) { }

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
            this.valueexport = 'Entity View-Branch-Transactions-Export';
            this.valueView = 'Entity View-Branch-Transactions-View';
            this.valueReceipt = 'Entity View-Branch-Transactions-Receipt';



          }
          else {
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
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service
      .entitywishonlinebranchs(this.id, this.pageSize, this.pageIndex)
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
          this.currentpage = res.pagination.currentPage
          this.currentfilvalShow = false;

        }
      });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(id: any) {
    this.router.navigate([`dashboard/channelconfiguration-singleview/${id}`], {
      queryParams: { Alldata: id },
    });

  }






  channelsearch(filterValue: string) {

    if (filterValue) {

      this.service.entityonlinesearchbranchs(this.id, filterValue, this.pageSize1, this.pageIndex1).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewall = res.response;
            // this.Viewall.reverse();
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;

          }
          else if (res.flag === 2) {
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
        }
      });
    }
    else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }


  reload() {
    this.service
      .entitywishonlinebranchs(this.id, this.pageSize, this.pageIndex)
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
          this.currentpage = res.pagination.currentPage
          this.currentfilvalShow = false;

        }
      });
  }


  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.entityonlinesearchbranchs(this.id, this.currentfilval, event.pageSize1, event.pageIndex1).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.Viewall = res.response;
            // this.Viewall.reverse();
            this.dataSource = new MatTableDataSource(this.Viewall);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;

          }
          else if (res.flag === 2) {
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
        }
      });
    }
    else {
      this.service
        .entitywishonlinebranchs(this.id, event.pageSize, event.pageIndex)
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
            this.currentpage = res.pagination.currentPage
            this.currentfilvalShow = false;

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
    })

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
}
