import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-refund-getall',
  templateUrl: './refund-getall.component.html',
  styleUrl: './refund-getall.component.css'
})
export class RefundGetallComponent {
  dataSource: any;
  displayedColumns: string[] = ["sno", "type", "entityname", "custname", "custmobile", "pgPaymentId", "reqid", "activityid", "paidAmount", "refund", "status", "refundDate"]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = sessionStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  refund: any;
  merchantPayId: any;
  apikey: any;
  pgModelID: any;
  transactionId: any;
  orderReference: any;
  hashKey: any;
  entityName: any;
  contactEmail: any;
  contactMobile: any;
  billingAddress: any;
  zipcode: any;
  city: any;
  stateName: any;
  secretKey: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = sessionStorage.getItem('roleId')
  valuerenewexport: any;
  valuerenewview: any;
  valuerenewpay: any;
  valuerenewinvoice: any;
  roleName = sessionStorage.getItem('roleName')
  searchPerformed: boolean = false;
  date1: any;
  date2: any;
  date3: any;

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
  refundexport: any;
  valuerefundexport: any;
  errorMessage: any;
  FromDateRange: string='';
  ToDateRange: string='';

  pageIndex2: number = 0;
  pageSize2 = 5;

  totalpage2: any;
  totalPages2: any;
  currentpage2: any;

  filter1: boolean = false;
  filters: boolean = false;
  transaction: any;
  maxDate: any;
  currentfilvalShow: boolean=false;
  transactionValue: any;
   filterAction:any = 0;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    
    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuerefundexport = 'Online Refunds-Export'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Online Refunds-Export') {
                this.valuerefundexport = 'Online Refunds-Export'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.service.RefundGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
     
      } else if (res.flag == 2) {
        this.refund = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
     
      }
    });


  }

  checkDate(){
    this.ToDateRange = ''
    // this.FromDateRange =''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reload() {
    this.service.RefundGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
     
      } else if (res.flag == 2) {
        this.refund = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
     
      }
    });
  }

  refundsearch(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.RefundGetAllSearch(filterValue, this.pageSize, this.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.refund = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
          this.currentfilvalShow=true;
       
        } else if (res.flag == 2) {
          this.refund = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
          this.currentfilvalShow=true;
       
        }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }

  exportexcel() {
    this.service.RefundExport().subscribe((res: any) => {
      this.refundexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.refundexport.forEach((element: any) => {

          this.response = [];
          this.response.push(sno);
          this.response.push(element?.type);
          this.response.push(element?.customerId?.merchantId?.merchantLegalName);
          this.response.push(element?.customerId?.customerName);
          this.response.push(element?.customerId?.mobileNumber);
          this.response.push(element?.paymentId);
          this.response.push(element?.requestId);
          this.response.push(element?.activityId);this.response.push(element?.paymentModel?.paidAmount);
          this.response.push(element?.refundAmount);
          this.response.push(element?.refundStatus);


          if (element.createdAt) {
            this.response.push(moment(element?.createdAt).format('DD/MM/yyyy hh:mm a').toString());
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
    // const title='Entity Details';
    const header = [
      "SNo", "Type", "EntityName", "CustomerName",  "CustomerMobile", "PgPaymentId", "ReqId", "ActivityId","PaidAmount", "RefundAmount", "Status", "Requested Date"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Online Refunds');

    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Times New Roman', family: 4, size: 16, bold: true };


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

      }

      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
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
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);


      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty9.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    }
    );

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Online Refunds.xlsx');
    });
  }

  filterdate() {
    this.service.RefundGetAllDateFilter(this.FromDateRange, this.ToDateRange, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {

        this.transaction = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
       this.filterAction = 1
     
      } else if (res.flag == 2) {
        this.transaction = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.transaction);
     
     
      }
    })
  }
  reset() {
    this.service.RefundGetAll(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.refund = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
        this.FromDateRange='';
        this.ToDateRange='';
     
      } else if (res.flag == 2) {
        this.refund = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.refund);
        this.currentfilvalShow=false;
        this.FromDateRange='';
        this.ToDateRange='';
     
      }
    
    });
  }
  

  getData(event: any) {
    if (this.filterAction== 1) {
      this.service.RefundGetAllDateFilter(this.FromDateRange, this.ToDateRange, event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
  
          this.transaction = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
         
       
        } else if (res.flag == 2) {
          this.transaction = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.transaction);
       
       
        }
  
      })
    } else if (this.currentfilvalShow) {
      this.service.RefundGetAllSearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.refund = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.refund);
        
         
          } else if (res.flag == 2) {
            this.refund = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.refund);
        
         
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    } else {
      this.service.RefundGetAll(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.refund = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
         
       
        } else if (res.flag == 2) {
          this.refund = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.refund);
         
       
        }
      
      });
    }
  }
}
