import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';


@Component({
  selector: 'app-overall-customer-view',
  templateUrl: './overall-customer-view.component.html',
  styleUrl: './overall-customer-view.component.css'
})
export class OverallCustomerViewComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  displayedColumns: string[] = [
    'customerId',
    'entityName',
    'categoryName',
    'customerReferenceId',
    'customerName',
    'mobileNumber',
    'communicationType',
    'communicationLanguage',
    'routeassigned',
    'QRImage',
    'Viewcustomer',
    'createdDatetime',
    'qrcreated',

  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  id: any;
  showcategoryData: boolean = false;
  overallcustomer: any;
  valueCustomerExport: any;
  valueCustomerView: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  overallcustomerexport: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  currentfilval: any;
  filter: boolean = false;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;
  QRimage: any;
  Roledetails: any;

  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.EntityViewall.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueCustomerView = 'Customers-View';
            this.valueCustomerExport = 'Customers-Export';
            this.QRimage = 'Customer-QR'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Customers-View') {
                this.valueCustomerView = 'Customers-View';
              }
              if (this.actions == 'Customers-Export') {
                this.valueCustomerExport = 'Customers-Export'
              }
              if (this.actions == 'Customer-QR') {
                this.QRimage = 'Customer-QR'
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

  Getall() {
    this.EntityViewall.OverallCustomer(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.overallcustomer = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.overallcustomer);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.overallcustomer = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.overallcustomer);
        this.currentfilvalShow = false;
      }
    });
  };

  customer(filterValue: string) {
    if (filterValue) {
      this.EntityViewall.CustomerSearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.overallcustomer = res.response.content;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.overallcustomer);
            this.currentfilvalShow = true;
          }
          else if (res.flag == 2) {
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

  Viewparticularcustomer(id: any) {
    this.router.navigate([`dashboard/Overall-IndividualCustomer-view/${id}`], {
      queryParams: { Alldata: id },
    });

  };

  viewQr(id: any, id2: any) {
    this.EntityViewall.CustomerQRImageView(id).subscribe((res: Blob) => {
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
  };

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.EntityViewall.CustomerSearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.overallcustomer = res.response.content;
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
    }
    else {
      this.EntityViewall.OverallCustomer(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
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
      });
    }
  };
}
