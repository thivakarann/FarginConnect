import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { CusTicketEditComponent } from '../../Customer Transtions/customer Tickets/cus-ticket-edit/cus-ticket-edit.component';
import { CusTicketeCreateComponent } from '../../Customer Transtions/customer Tickets/cus-tickete-create/cus-tickete-create.component';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CustomerTicketraiseComponent } from '../../servicetickets/customer-ticketraise/customer-ticketraise.component';
import { ServicecustomerTicketImageComponent } from '../../servicetickets/servicecustomer-ticket-image/servicecustomer-ticket-image.component';
import { ViewDiscriptioncustomerComponent } from '../../servicetickets/view-discriptioncustomer/view-discriptioncustomer.component';
import moment from 'moment';

@Component({
  selector: 'app-dashboardviewclosedticket',
  templateUrl: './dashboardviewclosedticket.component.html',
  styleUrl: './dashboardviewclosedticket.component.css'
})
export class DashboardviewclosedticketComponent {
strings = "@";
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  MobileNumber: any;
  Description = "Description";
  comments = "Comments";
  pag: number = 1;
  merchantId = localStorage.getItem('merchantId') || '';
  displayedColumns: string[] = [
    'sno',
    'customerName',
    'ticketId',
    'mobileNumber',
    'categoryName',
    'logo',
    'description',
    'Comment',
    'ticketStatus',
    'action',
    'createdDateTime',
    'ticketStatusModifedBy',
    'ticketModifedDateTime'

  ];
  FormSearch!: FormGroup;
  ticketmerchant: any;
  pageIndex: number=0 ;
  pageSize:number=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentYear: any;
  responseDataListnew: any = [];
  response: any = [];
  valuecusticketexport: any;
  valuecusticketEdit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  valuecusticketview: any;
  roleName = localStorage.getItem('roleName')
  valuecusticketImage: any;
  ticketmerchantexport: any;
searchPerformed: boolean=false;

  constructor(private service: FarginServiceService, private dialog: MatDialog, private ActivateRoute: ActivatedRoute, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();


   

    this.service.dashboardticketstatus(this.merchantId, 'Close').subscribe((res: any) => {
  if(res.flag==1)
  {
    this.ticketmerchant = res.response;
    this.dataSource = new MatTableDataSource(this.ticketmerchant.reverse());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  
  }
  else if(res.flag==2){
    this.dataSource = new MatTableDataSource([]);
    this.dataSource = new MatTableDataSource(this.ticketmerchant.reverse());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
       
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valuecusticketexport = 'Customer Request-Export'
      this.valuecusticketEdit = 'Customer Request-Edit'
      this.valuecusticketview = 'Customer Request-View'
      this.valuecusticketImage = 'Customer Request-Image'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions
            if (this.actions == 'Customer Request-Export') {
              this.valuecusticketexport = 'Customer Request-Export'
            }
            if (this.actions == 'Customer Request-Edit') {
              this.valuecusticketEdit = 'Customer Request-Edit'
            }
            if (this.actions == 'Customer Request-View') {
              this.valuecusticketview = 'Customer Request-View'
            }
            if (this.actions == 'Customer Request-Image') {
              this.valuecusticketImage = 'Customer Request-Image'
            }
          }
        }

      })
    }


  }


  Back(id: any) {
    this.router.navigate([`customer-verify-view/${id}`], {
      queryParams: { Alldata: id },
    });

  }
  reload() {
    window.location.reload()
  }
  ticketcreate() {
    this.dialog.open(CusTicketeCreateComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      // data:{value:id},
    });
  }

  TicketEdit() {
    this.dialog.open(CusTicketEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '800ms',
      disableClose: true,
      // data:{value:id},
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(id: any) {
    this.dialog.open(CustomerTicketraiseComponent, {
      data: { value: id },
      disableClose: true,
      width: "50%"
    })
  }

  description(id: any, id2: any) {
    this.dialog.open(ViewDiscriptioncustomerComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, Title: id2 }
    });
  }


  Ticketcomment(id: any, id2: any) {
    // this.router.navigate([`dashboard/customer-description/${id2}`], {
    //   queryParams: { title2:id2,description3:id3 },
    // });
    this.dialog.open(ViewDiscriptioncustomerComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      data: { value: id, Title: id2 }
    });
  }

  viewlogo(id: any) {
    this.dialog.open(ServicecustomerTicketImageComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      // disableClose: true,
      data: {
        value: id,
        // value1: Link
      }
    })
  }


  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.ticketmerchant.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customer.customerName);
      this.response.push(element?.ticketId);
      this.response.push(element?.mobileNumber);
 
      this.response.push(element?.categoryName);
      this.response.push(element?.description);
      this.response.push(element?.ticketComment);
      if(element?.ticketStatus=='Open'){
        this.response.push("Open")
      }
      else if(element?.ticketStatus=='close'){
        this.response.push("Closed")
      }
      else if(element?.ticketStatus=='hold'){
        this.response.push("Inprogress")
      }
      else{
        this.response.push('')
      }
      // this.response.push(element?.createdDateTime)
      if (element?.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('-');
      }
      this.response.push(element?.ticketStatusModifedBy);
      if (element?.ticketModifedDateTime) {
        this.response.push(moment(element?.ticketModifedDateTime).format('DD/MM/yyyy hh:mm a').toString());
      }
      else {
        this.response.push('-');
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
 
 
}
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Customer Name",
      "Ticket Id",
      "Mobile Number",
      "Category Name",
      "Description",
      "Comments",
      "Ticket Status",
      "Created At",
      "Status Updated By",
      "Status Updated At"
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Closed Ticket');
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
      let qty10 = row.getCell(11);
 
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
 
 
    }
    );
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Closed Ticket.xlsx');
    });
  }
 



  customerticket(id:any,filterValue: string) {
    if (!filterValue) {
        this.toastr.error('Please enter a value to search');
        return;
    }
 
    this.service.CustomerTickets(id,filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.ticketmerchant = res.response;  
          this.ticketmerchant.reverse();
          this.dataSource = new MatTableDataSource(this.ticketmerchant);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         
        }
        else if (res.flag === 2) {
          this.ticketmerchant = [];  
          this.dataSource = new MatTableDataSource(this.ticketmerchant);  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
}
