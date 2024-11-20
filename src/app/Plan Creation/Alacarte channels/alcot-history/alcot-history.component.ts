import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { Location } from '@angular/common';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-alcot-history',
  templateUrl: './alcot-history.component.html',
  styleUrl: './alcot-history.component.css'
})
export class AlcotHistoryComponent implements OnInit{
  merchantid: any = localStorage.getItem('merchantId')
  history: any;
  date2: any;
  date1: any;
  pageIndex: number = 0;
  pageSize=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  historyexport: any;

  constructor(private location:Location,private service:FarginServiceService){
  }

  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "name",
      "number",
      "price",
      "type",
      "lang",
      "generic",
      "createdBy",
      "createdDateTime",
      
    ]

  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

ngOnInit(): void {
  this.service.AlcotHistoryViewAll(this.pageSize,this.pageIndex).subscribe((res:any)=>{
    if(res.flag==1){
      this.history=res.response;
      this.history.reverse();
      this.totalPages=res.pagination.totalElements;
      this.totalpage=res.pagination.totalPages;
     this.currentpage=res.pagination.currentPage+1;
    
      this.dataSource = new MatTableDataSource(this.history);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
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
    this.service.AlcotHistoryViewAllExport().subscribe((res:any)=>{
        this.historyexport=res.response.reverse();
      if(res.flag==1){
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.historyexport.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.channelName);
      this.response.push(element?.channelNo);
      this.response.push(element?.price);
      this.response.push(element?.language);
      this.response.push(element?.generic);
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
 
     
 
 
 
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
      "Channel Name",
      "Channel Number",
      "Price",
      "language",
      "Type",
      "Generic",
      "Created By",
      "Created At",
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Alcot History');
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

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Alcot History.xlsx');

    });
  }

  close(){
   this.location.back()
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
}
