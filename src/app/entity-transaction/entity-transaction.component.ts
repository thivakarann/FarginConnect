import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { CustomerTransViewComponent } from '../Fargin Transtions/Customer Trans/customer-trans-view/customer-trans-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-transaction',
  templateUrl: './entity-transaction.component.html',
  styleUrl: './entity-transaction.component.css',
})
export class EntityTransactionComponent {
  valuetransaction: any;
  valuetransactionExport: any;
  valuetransactionview: any;

  dataSource: any;
  displayedColumns: string[] = [
    'settlementId',
    'payoutId',
    'customername',
    'mobileNumber',
    "STB",
    "ServiceProvider",
    'amount',
    'reference',
    'status',
    'Receipt',
    'View',
    'createdAt',
    'paidAt'
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
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  responseDataListnew: any = [];
  response: any = [];
  AccountId: any;
  searchPerformed: boolean = false;
  valueinvoice:any;
  pageIndex: number = 0;
  pageSize = 5;
currentfilval: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  transactionValue: any;
  currentfilvalShow!: boolean;

  transdetails: any;
  transaction: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ActivateRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuetransactionExport = 'Entity View Transaction-Export';
            this.valuetransactionview = 'Entity View Transaction-View';
            this.valueinvoice = 'Entity View Transaction-Receipt';
          } else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Entity View Transaction-Export') {
                this.valuetransactionExport = 'Entity View Transaction-Export';
              }
              if (this.actions == 'Entity View Transaction-View') {
                this.valuetransactionview = 'Entity View Transaction-View';
              }
              if (this.actions == 'Entity View Transaction-Receipt') {
                this.valueinvoice = 'Entity View Transaction-Receipt';
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

    this.service.EntityTraansaction(this.id, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag === 1) {
        this.details = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.details);
     
      } else if (res.flag === 2) {
        this.dataSource = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage
     

      }

    });
  }

  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },

    });
  }


  transactionview(id: any) {

    this.dialog.open(CustomerTransViewComponent, {
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      disableClose: true,
      data: {
        value: id,
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportexcel() {
    this.service.EntityTransactionexport(this.id).subscribe((res: any) => {
      this.transaction = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.transaction.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.pgPaymentId || '-');
          this.response.push(element?.customerName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.setUpBoxNumber)
          this.response.push(element?.serviceProviderName)
          this.response.push(element?.paidAmount);
          this.response.push(element?.paymentMethod);
          this.response.push(element?.paymentStatus);
      
    
            if (element.createdDateTime) {
                      this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
                    }
                    else {
                      this.response.push('');
                    }

          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }

  excelexportCustomer() {

    const header = [
      'S No',
      'Payment Id',
      'Customer Name',
      'Customer Mobile Number',
      'STB Number',
      'Service Provider',
      'Amount',
      'Payment Method',
      'Payment Status',
      'Bank Reference',
      'CreatedAt',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Transaction');

    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
        bgColor: { argb: 'FF0000FF' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d: any) => {
      //

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7 = row.getCell(8);
      let qty8 = row.getCell(9);
      let qty9 = row.getCell(10);
      qty.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty1.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty2.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty3.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty4.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty5.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };



    });



    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(blob, 'Entity Transaction.xlsx');
    });
  }


  close() {
    this.location.back();
  }

  reload() {
    window.location.reload();
  }

  customerpay(filterValue: string) {

    if (filterValue) {

      this.service.EntityTraansactionSearch(this.id, filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.flag === 1) {
            this.transdetails = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transdetails);
            this.currentfilvalShow=true;
         
          } else if (res.flag === 2) {
            this.dataSource = new MatTableDataSource([]);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage
         
    
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
      this.service.EntityTraansactionSearch(this.id, this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.flag === 1) {
            this.transdetails = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.transdetails);
         
          } else if (res.flag === 2) {
            this.dataSource = new MatTableDataSource([]);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage
         
    
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }

    else  {
      this.service.EntityTraansaction(this.id, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag === 1) {
          this.details = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.details);
       
        } else if (res.flag === 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage
       
  
        }
  
      });
    }
  }
 
}
