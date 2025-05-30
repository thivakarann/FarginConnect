import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entity-customers-view-all',
  templateUrl: './entity-customers-view-all.component.html',
  styleUrl: './entity-customers-view-all.component.css',
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
  QRImage: any;

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
    'QRImage',
    'view',
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
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  pageIndex: number = 0;
  pageSize = 5;
  searchPerformed: boolean = false;
  filter: boolean = false;
  pageSize1 = 5;
  pageIndex1: number = 0;
  currentfilval: any;
  currentfilvalShow: boolean = false;

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
            this.valuecustomerview = 'Entity View Customer-View';
            this.QRImage = "Customer-QR"
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Customer-View') {
                this.valuecustomerview = 'Entity View Customer-View';
              }
              if (this.actions == 'Customer-QR') {
                this.QRImage = 'Customer-QR';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });

    this.Getall();
  }

  Getall() {
    this.service
      .EntityCustomerview(this.id, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
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
      });
  }

  close() {
    this.location.back();
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
  };

  viewQr(id: any, id2: any) {
    this.service.CustomerQRImageView(id).subscribe((res: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;

        // Create HTML content with the image and download link
        const htmlContent = `
        <html>
          <body style="margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
            <img src="${dataUrl}" style="max-width: 100%; max-height: 80vh; object-fit: contain;" />
            <a 
              href="${dataUrl}" 
              download="${id2}.QR.Image.jpg" 
              style="margin-top: 20px; padding: 10px 20px; background: #2196F3; color: white; text-decoration: none; border-radius: 5px;"
            >
              Download QR Code
            </a>
          </body>
        </html>
      `;

        // Create a Blob and open it as a URL
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl); // Image persists even on refresh
      };
      reader.readAsDataURL(res);
    });
  }

  customer(filterValue: string) {
    if (filterValue) {
      this.service
        .EntityCustomerviewsearch(
          this.id,
          filterValue,
          this.pageSize,
          this.pageIndex
        )
        .subscribe({
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
          },
        });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service
        .EntityCustomerviewsearch(
          this.id,
          this.currentfilval,
          event.pageSize,
          event.pageIndex
        )
        .subscribe({
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
          },
        });
    } else {
      this.service
        .EntityCustomerview(this.id, event.pageSize, event.pageIndex)
        .subscribe((res: any) => {
          if (res.flag == 1) {
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
        });
    }
  }
}
