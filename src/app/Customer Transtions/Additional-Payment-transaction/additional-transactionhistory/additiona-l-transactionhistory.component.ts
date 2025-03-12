import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionaltransactionIndividualviewComponent } from '../additionaltransaction-individualview/additionaltransaction-individualview.component';
import { CustServiceService } from '../../../Customer-service/cust-service.service';

@Component({
  selector: 'app-additiona-l-transactionhistory',
  templateUrl: './additiona-l-transactionhistory.component.html',
  styleUrl: './additiona-l-transactionhistory.component.css'
})
export class AdditionaLTransactionhistoryComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  currentYear: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  pag: number = 1;
  displayedColumns: string[] = [
    'sno',
    'customername',
    'MobileNumber',
    'MerchantLegalName',
    'Paymentstatus',
    'PaidDate',
    'View',
    'Receipt',
  ];
  FormSearch!: FormGroup;

  showDataValue: any;
  show: boolean = false;

  image: any;
  created: any;
  MobileNumber: any;
  Transactionhistory: any;
  customername: any;
  strings = '@';
  view: any;
  datePipe = new DatePipe('en-US');
searchPerformed: boolean = false;


  constructor(
    private service: CustServiceService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;
    });

    this.service
      .CustomerPaymentsDetailView(this.MobileNumber)
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
    this.service.AdditionalPaymentReciept(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
  
    // If the filter is a date string, ensure it matches the 'dd/MM/yyyy' format
    if (this.isDate(filterValue)) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const formattedEndDate = data.endDateFormatted || '';
        return formattedEndDate.includes(filter); // Match formatted date string
      };
    } else {
      // Default filter predicate for non-date filters (search by any of the fields)
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        // Check multiple fields (Customer Name, Mobile Number, Merchant Legal Name, Payment Status)
        const customerName = data.customerId?.customerName?.toLowerCase() || '';
        const mobileNumber = data.customerId?.mobileNumber?.toLowerCase() || '';
        const merchantLegalName = data.customerId?.merchantId?.merchantLegalName?.toLowerCase() || '';
        const paymentStatus = data.paymentStatus?.toLowerCase() || '';
        const formattedEndDate = data.endDateFormatted?.toLowerCase() || '';
        const formattedStartDate = data.startDateFormatted?.toLowerCase() || '';
        return customerName.includes(filter) ||
          mobileNumber.includes(filter) ||
          merchantLegalName.includes(filter) ||
          paymentStatus.includes(filter) ||
          formattedEndDate.includes(filter) ||
          formattedStartDate.includes(filter);
      };
    }

    // Apply the filter to the dataSource
    this.dataSource.filter = filterValue;

    // If the filter is applied, reset the paginator to the first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  isDate(value: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(value);
  }

  transactionview(id: any) {
    this.service.AdditionalPaymentcustomerview(id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.view = res.response;
        this.dialog.open(AdditionaltransactionIndividualviewComponent, {
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
    .CustomerPaymentsDetailView(this.MobileNumber)
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
