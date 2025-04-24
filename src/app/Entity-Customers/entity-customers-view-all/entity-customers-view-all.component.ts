import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-entity-customers-view-all',
  templateUrl: './entity-customers-view-all.component.html',
  styleUrl: './entity-customers-view-all.component.css'
})
export class EntityCustomersViewAllComponent {
  valuecustomerview: any;
  errorMessage: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  overallcustomer: any;
  totalPages1: any;
  totalpage1: any;
  currentpage1: any;

  exportexcel() {
    throw new Error('Method not implemented.');
  }
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'settlementId',
    'customerReferenceId',
    'customername',
    'mobilenumber',
    'routeassigned',
    // 'blocknum',
    // 'setupbox',
    // 'flatnum',
    'view'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  viewdata: any;
  details: any;
  detaislone: any;
  bankdetails: any;
  accountid: any;
  Viewall: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  pageIndex: number = 0;
  pageSize = 5;
  searchPerformed: boolean = false;
  filter:boolean=false;
  pageSize1= 5;
  pageIndex1: number = 0;
currentfilval: any;
currentfilvalShow:boolean=false;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuecustomerview = 'Entity View Customer-View'
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Customer-View') {
                this.valuecustomerview = 'Entity View Customer-View'
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.service.EntityCustomerview(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.details = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.details = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details);
        this.currentfilvalShow = false;
      }
    })


  }


  reload() {
    this.service.EntityCustomerview(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.details = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.details = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details);
        this.currentfilvalShow = false;
      }
    })

  }





  close() {
    this.location.back()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewcustomer(id: any) {

    this.router.navigate([`/dashboard/entitycustomers/${id}`], {
      queryParams: { value: id },
    });

  }
 
 
   customer(filterValue: string) {
  
    if (filterValue) {

    this.service.EntityCustomerviewsearch(this.id, filterValue,this.pageSize,this.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.overallcustomer = res.response;
          this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.overallcustomer);
        this.currentfilvalShow = true;
      } else if (res.flag == 2) {
        this.overallcustomer = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.overallcustomer);
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


  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.EntityCustomerviewsearch(this.id, this.currentfilval,event.pageSize,event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.overallcustomer = res.response;
            this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.overallcustomer); 
        } else if (res.flag == 2) {
          this.overallcustomer = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.overallcustomer); 
        }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
  } else {
    this.service.EntityCustomerview(this.id, event.pageSize, event.pageIndex).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.details = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details); 
      } else if (res.flag == 2) {
        this.details = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details); 
      }
    })
  }
}

}
