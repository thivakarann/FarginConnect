import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../service/fargin-service.service';
import { BranchIndividualviewComponent } from '../branch-individualview/branch-individualview.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch-viewall',
  templateUrl: './branch-viewall.component.html',
  styleUrl: './branch-viewall.component.css',
})
export class BranchViewallComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = sessionStorage.getItem('roleId');
  displayedColumns: string[] = [
    'sno',
    'merchantLegalName',
    'branchName',
    'accountHolderName',
    'accountNumber',
    'bankName',
    'ifscCode',
    'view',
    'Customerview',
  ];
  branchview: any;
  responseDataListnew: any = [];
  response: any = [];
  valuebranchexport: any;
  valuebranchView: any;
  valuebranchCustomerDetails: any;
  getdashboard: any[] = [];
  actions: any;
  errorMessage: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter: boolean = false;
  currentfilval: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  transactionValue: any;
  setupboxhistory: any;

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuebranchexport = 'Branch-Export';
            this.valuebranchView = 'Branch-View';
            this.valuebranchCustomerDetails = 'Branch-Customer Details';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Branch-Export') {
                this.valuebranchexport = 'Branch-Export';
              }
              if (this.actions == 'Branch-View') {
                this.valuebranchView = 'Branch-View';
              }
              if (this.actions == 'Branch-Customer Details') {
                this.valuebranchCustomerDetails = 'Branch-Customer Details';
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
    this.service.BranchIndividualView(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchview = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.branchview = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.branchview);
        this.currentfilvalShow = false;
      }
    });
  };


  branchviewall(filterValue: string) {
    if (filterValue) {
      this.service.BranchViewallSearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.branchview = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.branchview);
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.branchview = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.branchview);
            this.currentfilvalShow = true;
          }
        },
      });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }

  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/branch-customer-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  viewbranch(id: any) {
    this.dialog.open(BranchIndividualviewComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
    });
  };

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.BranchViewallSearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.branchview = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.branchview);
          } else if (res.flag == 2) {
            this.branchview = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.branchview);
          }
        },
      });
    }
    else {
      this.service.BranchIndividualView(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.branchview = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.branchview);
        } else if (res.flag == 2) {
          this.branchview = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.branchview);
        }
      });
    }
  }
}
