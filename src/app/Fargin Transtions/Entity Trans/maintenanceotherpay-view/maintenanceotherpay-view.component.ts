import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-maintenanceotherpay-view',
  templateUrl: './maintenanceotherpay-view.component.html',
  styleUrl: './maintenanceotherpay-view.component.css'
})
export class MaintenanceotherpayViewComponent {
  dataSource: any;
  displayedColumns: string[] = ["Sno", "type", "otherFeeCount", "otherFeeAmount", "requestDate"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = localStorage.getItem('roleId');
  Merchatid: any;
  searchPerformed: boolean = false;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  details: any;
  payid: any;

  constructor(private location: Location, private service: FarginServiceService, private toastr: ToastrService, private router: Router, private activaterouter: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activaterouter.queryParams.subscribe((param: any) => {
      this.payid = param.alldata;
    });

    this.service.OtherPaymentsView(this.payid).subscribe((res: any) => {
      if (res.flag == 1) {
        this.details = res.response;
        this.dataSource = new MatTableDataSource(this.details)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.details);
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


  reload() {
    window.location.reload()
  }

  close(){
    this.location.back()
   }

  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.details.forEach((element: any) => {
      let createdate = element.requestDate;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.type);
      this.response.push(element?.otherFeeCount);
      this.response.push(element?.otherFeeAmount);
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
        "Service Type",
        "Count",
        "Service Amount",
        "Request Date",
       
      ]
   
   
      const data = this.responseDataListnew;
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Other Payment Details');
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
     
     
   
   
   
        qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
   
   
      }
      );
      workbook.xlsx.writeBuffer().then((data: any) => {
   
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
   
   
        FileSaver.saveAs(blob, 'Other Payment Details.xlsx');
   
      });
    }


}
