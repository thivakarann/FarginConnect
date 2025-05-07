import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';

@Component({
  selector: 'app-sticker-history',
  templateUrl: './sticker-history.component.html',
  styleUrl: './sticker-history.component.css'
})
export class StickerHistoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'S.No',
    'stickerPerAmount',
    'deliveryDays',
    'createdBy',
    'createdDateTime',
  ];
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  roleId: any = sessionStorage.getItem('roleId');
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  getdashboard: any[] = [];
  actions: any;
  Id: any;
  viewall: any;
  searchPerformed: boolean = false;

  constructor(
    public service: FarginServiceService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit(): void {

    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.Id = param.Alldata;
    });

    this.Details();
  }

  Details() {
    this.service.Stickerhistory(this.Id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }

      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }


    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };
  close() {
    this.location.back()
  };

  reload() {
    this.Details();
  };

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.viewall.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.stickerPerAmount);
      this.response.push(element?.deliveryDays);
      this.response.push(element?.createdBy);
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

  excelexportCustomer() {
    const header = [
      'S.No',
      'Sticker Per Amount',
      'Delivery Days',
      'Updated By',
      'Updated At'
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Setupbox History');

    // Blank Row
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
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

    });
    worksheet.getColumn(1).protection = { locked: true, hidden: true };
    worksheet.getColumn(2).protection = { locked: true, hidden: true };
    worksheet.getColumn(3).protection = { locked: true, hidden: true };
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Sticker History.xlsx');
    });
  }



}
