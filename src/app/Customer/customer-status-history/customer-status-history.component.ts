import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-status-history',
  templateUrl: './customer-status-history.component.html',
  styleUrl: './customer-status-history.component.css'
})
export class CustomerStatusHistoryComponent {
  merchantid: any = localStorage.getItem('merchantId')
  history: any;
  date2: any;
  date1: any;

  constructor(private location:Location,private service:FarginServiceService,private ActivatedRoute:ActivatedRoute){
  }

  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "name",
      "mobilenumber",
      "email",
      'status',
      "createdBy",
      "createdDateTime",
      
    ]

  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customerId:any;

ngOnInit(): void {
  this.ActivatedRoute.queryParams.subscribe((param: any) => {
    this.customerId = param.Alldata;

  });



this.service.CustomerActiveInactiveStatusHIstory(this.customerId).subscribe((res:any)=>{
if(res.flag==1){
  this.history=res.response;
  this.history.reverse();
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

  reload(){
    window.location.reload()
  }

  exportexcel() {
   
    let sno = 1;
    this.responseDataListnew = [];
    this.history.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerEntity?.customerName);
      this.response.push(element?.customerEntity?.mobileNumber);
      this.response.push(element?.customerEntity?.emailAddress);
      if (element?.Status == '1') {
        this.response.push('Active');
      } else {
        this.response.push('Inactive');
      }
      this.response.push(element?.modifiedBy);
 
      if (element?.modifiedAt) {
        let issuedatas = element?.modifiedAt;
        this.date2 = moment(issuedatas).format('yyyy-MM-DD hh:mm a').toString();
        this.response.push(this.date2);
      }
      else {
        this.response.push('');
      }
 
 
 
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "SNo",
      "Name",
      "Mobilenumber",
      "Email",
      "Status",
      "MreatedBy",
      "ModifiedDateTime",
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Customer Status History');
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
 
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'Customer Status History.xlsx');
 
    });
  }

  close(){
   this.location.back()
  }
}

