import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTransactionIndividualviewComponent } from '../customer-transaction-individualview/customer-transaction-individualview.component';
import { CustServiceService } from '../../Customer-service/cust-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-transactionviews',
  templateUrl: './customer-transactionviews.component.html',
  styleUrl: './customer-transactionviews.component.css'
})
export class CustomerTransactionviewsComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  currentYear: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  @ViewChild(MatSort) sort!: MatSort;
 
  pag: number = 1;
  displayedColumns: string[] = [
    'sno',
    'customername',
    'MobileNumber',
    'setupBoxNumber',
    'MerchantLegalName',
    'Paymentstatus',
    'endDate',
    "paydate",
    'View',
    'Receipt',
  ];
  FormSearch!: FormGroup;
 
  showDataValue: any;
  show: boolean = false;
  searchPerformed: boolean = false;
 
  image: any;
  created: any;
  MobileNumber: any;
  Transactionhistory: any;
  customername: any;
  strings = '@';
  view: any;
  datePipe = new DatePipe('en-US');
 
  constructor(
    private service: CustServiceService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
 
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
    });
 
    this.service
    .Customertransactioninfo(this.MobileNumber)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.Transactionhistory = res.response;
        
        this.Transactionhistory.forEach((item: { endDateFormatted: string | null; endDate: string | number | Date; startDateFormatted: string | null; startDate: string | number | Date; }) => {
          item.endDateFormatted = this.datePipe.transform(item.endDate, 'dd/MM/yyyy');
          item.startDateFormatted = this.datePipe.transform(item.startDate, 'dd/MM/yyyy');
        });
        this.dataSource = new MatTableDataSource(this.Transactionhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
       
      } else if (res.flag == 2) {
        // this.show=true
        this.Transactionhistory = res.response;
        this.dataSource = new MatTableDataSource(this.Transactionhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
 
  Receipts(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }
 
  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  //   this.searchPerformed = filterValue.length > 0;  
 
  //   if (this.isDate(filterValue)) {
  //     this.dataSource.filterPredicate = (data: any, filter: string) => {
  //       const formattedEndDate = data.endDateFormatted || '';
  //       return formattedEndDate.includes(filter);
  //     };
  //   }
  //   else {
  //     this.dataSource.filterPredicate = (data: any, filter: string) => {
  //       const customerName = data.customerId?.customerName?.toLowerCase() || '';
  //       const mobileNumber = data.customerId?.mobileNumber?.toLowerCase() || '';
  //       const Setupbox = data.customerStbId?.stbId?.setupBoxNumber?.toLowerCase() || '';
  //       const merchantLegalName = data.customerId?.merchantId?.merchantLegalName?.toLowerCase() || '';
  //       const paymentStatus = data.paymentStatus?.toLowerCase() || '';
  //       const formattedEndDate = data.endDateFormatted?.toLowerCase() || '';
  //       const formattedStartDate = data.startDateFormatted?.toLowerCase() || '';
  //       return customerName.includes(filter) ||
  //              mobileNumber.includes(filter) ||
  //              Setupbox.includes(filter) ||
  //              merchantLegalName.includes(filter) ||
  //              paymentStatus.includes(filter) ||
  //              formattedEndDate.includes(filter) ||
  //              formattedStartDate.includes(filter)
  //     };
  //   }
   
  //   this.dataSource.filter = filterValue;
   
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
 
    if (this.isDate(filterValue)) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const formattedDate = this.formatDate(data.createdDateTime);
        return formattedDate.includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const customerName = data.customerId?.customerName?.toLowerCase() || '';
        const mobileNumber = data.customerId?.mobileNumber?.toLowerCase() || '';
        const merchantLegalName = data.customerId?.merchantId?.merchantLegalName?.toLowerCase() || '';
        const paymentStatus = data.paymentStatus?.toLowerCase() || '';
        const formattedEndDate = data.endDateFormatted?.toLowerCase() || '';
        const formattedStartDate = data.startDateFormatted?.toLowerCase() || '';
       
        // Check multiple fields for the filter
        return customerName.includes(filter) ||
               mobileNumber.includes(filter) ||
               merchantLegalName.includes(filter) ||
               paymentStatus.includes(filter) ||
               formattedEndDate.includes(filter) ||
               formattedStartDate.includes(filter);
      };
    }
    this.dataSource.filter = filterValue;
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  formatDate(date: string | Date): string {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleDateString('en-GB'); // 'dd/MM/yyyy' format
    }
    return '';
  }
 
  
  isDate(value: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(value);
  }
 
  transactionview(id: any) {
    this.service.CustomersinglePaymentDetails(id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
        this.dialog.open(CustomerTransactionIndividualviewComponent, {
          data: { value2: this.view },
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '1000ms',
        });
      }
    });
  }
 
  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }
 
  reload() {
    this.service
    .Customertransactioninfo(this.MobileNumber)
    .subscribe((res: any) => {
      if (res.flag == 1) {
        this.Transactionhistory = res.response;
        
        this.Transactionhistory.forEach((item: { endDateFormatted: string | null; endDate: string | number | Date; startDateFormatted: string | null; startDate: string | number | Date; }) => {
          item.endDateFormatted = this.datePipe.transform(item.endDate, 'dd/MM/yyyy');
          item.startDateFormatted = this.datePipe.transform(item.startDate, 'dd/MM/yyyy');
        });
        this.dataSource = new MatTableDataSource(this.Transactionhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
       
      } else if (res.flag == 2) {
        // this.show=true
        this.Transactionhistory = res.response;
        this.dataSource = new MatTableDataSource(this.Transactionhistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
