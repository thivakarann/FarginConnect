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

  exportexcel() {
    throw new Error('Method not implemented.');
  }
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'settlementId',
    'customername',
    'emailaddress',
    'mobilenumber',
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
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  pageIndex: number = 0;
  pageSize = 5;
  searchPerformed: boolean = false;

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
      this.details = res.response;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      this.dataSource = new MatTableDataSource(this.details);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })


  }


  reload() {
    window.location.reload()
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

}
