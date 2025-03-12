import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ViewTicketcommentComponent } from '../view-ticketcomment/view-ticketcomment.component';
import { ViewTicketimageComponent } from '../view-ticketimage/view-ticketimage.component';
import { EditServiceticketComponent } from '../edit-serviceticket/edit-serviceticket.component';
import { ViewTicketdescriptionComponent } from '../view-ticketdescription/view-ticketdescription.component';
import { AddServiceticketComponent } from '../add-serviceticket/add-serviceticket.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-serviceticket',
  templateUrl: './view-serviceticket.component.html',
  styleUrl: './view-serviceticket.component.css'
})
export class ViewServiceticketComponent {
  dataSource: any;
  displayedColumns: string[] = ["raiseTicketId", "ticketid", "subject", "stickerCount","Criticallity", "description", "image", "Status", "Comments", 'edit', "createdDateTime"]
  tickets: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseDataListnew: any[] = [];
  response: any[] = [];
  date2: any;
  date1: any;
  viewall: any;
  ticketId: any;
  merchantId: any = localStorage.getItem('merchantId')
  showcategoryData: any;
  valueTickets: any;
  valueTicketsAdd: any;
  valueTicketsExport: any;
  valueTicketsImage: any;
  valueTicketsedit: any;
  valueTicketsview: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
searchPerformed: boolean=false;

  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.service.viewTicket(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.tickets = res.response;

        this.dataSource = new MatTableDataSource(this.tickets?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.tickets.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
     
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valueTicketsAdd = 'Support Request-Add';
      this.valueTicketsExport = 'Support Request-Export';
      this.valueTicketsImage = 'Support Request-Image';
      this.valueTicketsedit = 'Support Request-Edit';
      this.valueTicketsview = 'Support Request-View'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Support Request-Add') {
              this.valueTicketsAdd = 'Support Request-Add'
            }
            if (this.actions == 'Support Request-Export') {
              this.valueTicketsExport = 'Support Request-Export'
            }
            if (this.actions == 'Support Request-Image') {
              this.valueTicketsImage = 'Support Request-Image'
            }
            if (this.actions == 'Support Request-Edit') {
              this.valueTicketsedit = 'Support Request-Edit'
            }
            if (this.actions == 'Support Request-View') {
              this.valueTicketsview = 'Support Request-View'
            }

          }
        }

      })
    }


  }

  reload() {
    this.service.viewTicket(this.merchantId).subscribe((res: any) => {
      if(res.flag==1)
      {
        this.tickets = res.response;

        this.dataSource = new MatTableDataSource(this.tickets?.reverse())
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.tickets.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
     
    });
  }

  addTicket() {
    this.dialog.open(AddServiceticketComponent, {

      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      width: '90vw',
      maxWidth: '500px',
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewTicket(this.merchantId).subscribe((res: any) => {
        if(res.flag==1)
        {
          this.tickets = res.response;
  
          this.dataSource = new MatTableDataSource(this.tickets?.reverse())
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.tickets.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
       
      });
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.tickets.forEach((element: any) => {
  let createdate = element.createdDateTime;
       this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.ticketId);
      this.response.push(element?.subject);
      this.response.push(element?.stickerCount);
      this.response.push(element?.ticketStatus);
      this.response.push(element?.description);
     
   
    
      if(element?.approvalStatus=='Open'){
        this.response.push("Open")
      }
      else if(element?.approvalStatus=='close'){
        this.response.push("Closed")
      }
      else if(element?.approvalStatus=='hold'){
        this.response.push("Hold")
      }
      else{
        this.response.push('')
      }
      this.response.push(element?.remarks);
      this.response.push(this.date1);
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      "Ticket Id",
      "Subject",
      "Sticker Count",
      "Criticality",
      "Description",
      "Status",
      "Comments",
      "Created At",
 
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Ticket Reports');
    // Blank Row
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
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty8.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Ticket Reports.xlsx');
    });
  }



  description(id: any) {
    this.dialog.open(ViewTicketdescriptionComponent, {
      disableClose: true,
      data: { value: id },
      width: '90vw',
      maxHeight:'500px',
      maxWidth: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  comments(id: any) {
    this.dialog.open(ViewTicketcommentComponent, {
      disableClose: true,
      data: { value: id },
      width: '90vw',
      maxHeight:'500px',
      maxWidth: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }

  image(id: any) {
    this.dialog.open(ViewTicketimageComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
    })
  }

  edit(id: any) {
    this.dialog.open(EditServiceticketComponent, {
      data: { value: id },
      // disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      width: '90vw',
      maxWidth: '500px',
    })
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.viewTicket(this.merchantId).subscribe((res: any) => {
        if(res.flag==1)
        {
          this.tickets = res.response;
  
          this.dataSource = new MatTableDataSource(this.tickets?.reverse())
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.tickets.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
       
      });
    })
  }

  serviceticket(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.ServiceTickets(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.tickets = res.response;
          this.tickets.reverse();
          this.dataSource = new MatTableDataSource(this.tickets);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.tickets = [];
          this.dataSource = new MatTableDataSource(this.tickets);
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

