import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustDescriptionCommentComponent } from '../cust-description-comment/cust-description-comment.component';
import { CustomerticketImageComponent } from '../customerticket-image/customerticket-image.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-viewall',
  templateUrl: './customer-viewall.component.html',
  styleUrl: './customer-viewall.component.css'
})
export class CustomerViewallComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  MobileNumber: any;
  Description = "Description";
  comments = "Comments"
  pag: number = 1;
  displayedColumns: string[] = [
    'sno',
    'ticketId',
    'categoryName',
    "merchantLegalName",
    'Customername',
    'mobileNumber',
    'Area',
    'FieldExecutivename',
    "STB",
    'logo',
    'description',
    'ticketStatus',
    'createdDateTime',
  ];
  FormSearch!: FormGroup;
  ticket: any;
  currentYear: any;
  responseDataListnew: any = [];
  response: any = [];
  valuecustomerticketexport: any;
  valuecustomerticketedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  valuedescription: any;
  valuedescriptionImage: any;
  ticketexport: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionValue: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  searchPerformed: boolean = false
  searchValue: any;

  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuecustomerticketedit = 'Customer Request-Edit'
            this.valuecustomerticketexport = 'Customer Request-Export'
            this.valuedescription = 'Customer Request-View'
            this.valuedescriptionImage = 'Customer Request-Image'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Customer Request-Edit') {
                this.valuecustomerticketedit = 'Customer Request-Edit'
              }
              if (this.actions == 'Customer Request-Export') {
                this.valuecustomerticketexport = 'Customer Request-Export'
              }
              if (this.actions == 'Customer Request-View') {
                this.valuedescription = 'Customer Request-View'
              }

              if (this.actions == 'Customer Request-Image') {
                this.valuedescriptionImage = 'Customer Request-Image'
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
  }
  Getall() {
    this.service.Ticketscustomer(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.ticket = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.ticket = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.currentfilvalShow = false;
      }
    });
  };

  customerpay(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
    // ✅ Normalize and transform values
    const trimmedValue = filterValue.trim().toLowerCase();
    switch (trimmedValue) {
      case 'closed': this.searchValue = 'Close'; break;
      default: this.searchValue = filterValue;
    }
    if (filterValue) {
      this.service.Ticketssearchcustomer(this.searchValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transactionValue = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.transactionValue = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.currentfilvalShow = true;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    }
  }

  viewlogo(id: any) {
    this.dialog.open(CustomerticketImageComponent, {
      disableClose: true,
      data: { value: id, },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }

  description(id: any, id2: any) {
    this.dialog.open(CustDescriptionCommentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id, Title: id2 },
      width: '90vw',
      maxHeight: '500px',
      maxWidth: '500px',
    });
  }

  Ticketcomment(id: any, id2: any) {
    this.dialog.open(CustDescriptionCommentComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      width: '90vw',
      maxHeight: '500px',
      maxWidth: '500px',
      data: { value: id, Title: id2 }
    });
  }
  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.Ticketssearchcustomer(this.searchValue, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.transactionValue = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transactionValue);
          } else if (res.flag == 2) {
            this.transactionValue = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transactionValue);
          }
        },
      });
    } else {
      this.service.Ticketscustomer(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transactionValue = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transactionValue);
        } else if (res.flag == 2) {
          this.transactionValue = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transactionValue);
        }
      });
    }
  }
}
