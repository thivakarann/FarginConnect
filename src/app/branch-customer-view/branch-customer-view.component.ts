import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-branch-customer-view',
  templateUrl: './branch-customer-view.component.html',
  styleUrl: './branch-customer-view.component.css'
})
export class BranchCustomerViewComponent implements OnInit {

  strings = "@";
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'sno',
    'customerReferenceId',
    'customerName',
    'mobileNumber',
    'cityName',
    'stateName',
    'pincodeName',

  ];

  branchview: any;
  responseDataListnew: any = [];
  merchantid: any = localStorage.getItem('merchantId')
  response: any = [];
  id: any;
  branchcustview: any;
  branchoverallresponse:any;

  constructor(
    private service: FarginServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ActivateRoute: ActivatedRoute,
    private router: Router,
    private location:Location
  ) { }


  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;

    });

    this.service.BranchCustomer(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.branchcustview = res.response.customerList;
        this.branchoverallresponse = res.response;

        this.branchcustview.reverse();
        // this.totalPages = res.pagination.totalElements;
        // this.totalpage = res.pagination.totalPages;
        // this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.branchcustview);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
   
    });
  }


  reload() {
    window.location.reload()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  close() {
    this.location.back()
  }


}
