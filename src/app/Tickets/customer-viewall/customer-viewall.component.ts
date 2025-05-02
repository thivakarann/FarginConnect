import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Workbook } from 'exceljs';
import { PageEvent } from '@angular/material/paginator';
import FileSaver from 'file-saver';
import { CustomerTicketapprovalComponent } from '../customer-ticketapproval/customer-ticketapproval.component';
import { CustDescriptionCommentComponent } from '../cust-description-comment/cust-description-comment.component';
import { CustomerticketImageComponent } from '../customerticket-image/customerticket-image.component';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-viewall',
  templateUrl: './customer-viewall.component.html',
  styleUrl: './customer-viewall.component.css'
})
export class CustomerViewallComponent implements OnInit {
  strings = "@";
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
    "merchantLegalName",
    'Customername',
    'mobileNumber',
    'categoryName',
    'logo',
    'description',
    'ticketStatus',
    'action',
    'createdDateTime',
    'ticketStatusModifedBy',
    'ticketModifedDateTime'
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
  searchPerformed:boolean=false
  constructor(
    private service: FarginServiceService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();


    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.MobileNumber = param.Alldata;

    });

    this.service
    .Ticketscustomer(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
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
    })

  }

  reload() {
    this.service
    .Ticketscustomer(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
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
  }

  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(id: any) {
    const dialogRef =this.dialog.open(CustomerTicketapprovalComponent, {
      data: { value: id },
      disableClose: true,
      width: '50%',
    });

    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });
  }
  fetch()
  {
    this.service
    .Ticketscustomer(this.pageSize, this.pageIndex)
    .subscribe((res: any) => {
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
  }

  viewlogo(id: any) {
    this.dialog.open(CustomerticketImageComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      // disableClose: true,
      data: {
        value: id,
        // value1: Link
      },
    });
  }

  exportexcel() {
    this.service.TicketscustomerExport().subscribe((res: any) => {
      this.ticketexport = res.response;
      if (res.flag == 1) {
 
        let sno = 1;
        this.responseDataListnew = [];
        this.ticketexport.forEach((element: any) => {
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.ticketId);
          this.response.push(element?.entity.merchantLegalName);
          this.response.push(element?.customer.customerName);
          this.response.push(element?.mobileNumber);
          this.response.push(element?.categoryName);
          this.response.push(element?.ticketStatus)
          this.response.push(element?.createdDateTime);
          this.response.push(element?.ticketStatusModifedBy);
          this.response.push(element?.ticketModifedDateTime);
 
          sno++;
          this.responseDataListnew.push(this.response);
        });
        this.excelexportCustomer();
      }
    });
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Ticket Id",
      "Entity Name",
      "Customer Name",
      "Mobile Number",
      "Category Name",
      "Ticket Status",
      "Created Date/Time",
      "Status Updated By",
      "Status Updated Date/Time",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Tickets');
    // Blank Row
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
 
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Customer Tickets.xlsx');
    });
  }


  description(id: any, id2: any) {
    this.dialog.open(CustDescriptionCommentComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, Title: id2 },
      width: '90vw',
      maxHeight:'500px',
      maxWidth: '500px',
    });
  }


  Ticketcomment(id: any, id2: any) {

    this.dialog.open(CustDescriptionCommentComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      width: '90vw',
      maxHeight:'500px',
      maxWidth: '500px',
      data: { value: id, Title: id2 }
    });
  }

  customerpay(filterValue: string) {
    if (filterValue) {
      console.log(filterValue);
      this.service
      .Ticketssearchcustomer(filterValue, this.pageSize, this.pageIndex)
      .subscribe({
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
        // error: (err: any) => {
        //   this.toastr.error('No Data Found');
        // }
      });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }
  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service
      .Ticketssearchcustomer(
        this.currentfilval,
        event.pageSize,
        event.pageIndex
      )
      .subscribe({
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
        // error: (err: any) => {
        //   this.toastr.error('No Data Found');
        // }
      });
    } else {
      this.service
      .Ticketscustomer(event.pageSize, event.pageIndex)
      .subscribe((res: any) => {
        if (res.flag == 1) {
          this.ticket = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.ticket);
        } else if (res.flag == 2) {
          this.ticket = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.ticket);
        }
      });
    }
  }
}
