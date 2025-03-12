import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stbhistory',
  templateUrl: './stbhistory.component.html',
  styleUrl: './stbhistory.component.css'
})
export class STBHistoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ["stbHistoryId", "setupBoxNumber", "serviceProviderName", "customerName",  "mobileNumber", "createdBy", "createdDateTime"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = localStorage.getItem('roleId');
  STBId: any;
  STBHistory: any;
  searchPerformed: boolean = false;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;

  constructor(private location:Location,private service: FarginServiceService, private toastr: ToastrService, private router: Router, private activaterouter: ActivatedRoute,) { }
  ngOnInit(): void {

    this.activaterouter.queryParams.subscribe((param: any) => {
      this.STBId = param.Alldata;
    });

    this.service.StbHistory(this.STBId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.STBHistory = res.response;
        this.STBHistory.reverse();
        this.dataSource = new MatTableDataSource(this.STBHistory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.STBHistory.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  reload() {
    window.location.reload()
  }

  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.STBHistory.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.setupBoxNumber);
      this.response.push(element?.serviceProviderName);
      this.response.push(element?.customerName);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

   excelexportCustomer() {
      // const title='Business Category';
      const header = [
        "SNo",
        "STB Number",
        "MSO",
        "Customer",
        "Mobile Number",
        "CreatedBy",
        "CreatedDateTime",
      ]
   
   
      const data = this.responseDataListnew;
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('STB Customers Log');
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
   
   
        FileSaver.saveAs(blob, 'STB Customers Log.xlsx');
   
      });
    }

    close(){
      this.location.back()
     }





}
