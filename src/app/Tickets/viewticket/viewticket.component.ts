import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddticketComponent } from '../addticket/addticket.component';
import { EditticketComponent } from '../editticket/editticket.component';
import { ViewDescriptionComponent } from '../view-description/view-description.component';
import { ViewCommentComponent } from '../view-comment/view-comment.component';
import { TicketImageComponent } from '../ticket-image/ticket-image.component';
import FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrl: './viewticket.component.css'
})
export class ViewticketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["raiseTicketId", "subject", "Criticallity", "description", "image", "Status", 'Comments', "createdDateTime", "action"]
  tickets: any;
  responseDataListnew: any = [];
  response: any = [];
  businesscategory: any;
  date1: any;
  date2: any;
  constructor(private router: Router, private service: FarginServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.viewTicket().subscribe((res: any) => {
      this.tickets = res.response;
      console.log(this.tickets);
      this.dataSource = new MatTableDataSource(this.tickets?.reverse())
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
  
  }


  description(id: any) {
    this.dialog.open(ViewDescriptionComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  comment(id:any){
    this.dialog.open(ViewCommentComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  image(id: any) {
    this.dialog.open(TicketImageComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }

  
  update(id:any){
    this.dialog.open(AddticketComponent,{
      data:{value:id},
      disableClose:true,
      width:"50%"
    })
  }
  response(){
    this.dialog.open(AddticketComponent, {
    
      disableClose: true,
      width: "50%",
    })
  }
  
  
  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.tickets.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedDateTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.categoryName);
      this.response.push(element?.merchantName);
      this.response.push(element?.ticketId);
      this.response.push(element?.subject);
      this.response.push(element?.ticketStatus)
      this.response.push(element?.description);
      this.response.push(element?.approvalStatus);
      this.response.push(element?.remarks)
      this.response.push(this.date2);

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "categoryname",
      "Merchant Name",
      "ticketId",
      "Subject",
      "Criticallity",
      "Description",
      "Approval Status",
      "remarks",
      "Created At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Tickets');
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
      // console.log("row loop");

      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);
      let qty3 = row.getCell(4);
      let qty4 = row.getCell(5);
      let qty5 = row.getCell(6);
      let qty6 = row.getCell(7);
      let qty7=row.getCell(8);
      let qty8=row.getCell(9);
      let qty9=row.getCell(10);




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
      FileSaver.saveAs(blob, 'Tickets.xlsx');
    });
}
