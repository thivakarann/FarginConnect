import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-customer-response',
  templateUrl: './view-customer-response.component.html',
  styleUrl: './view-customer-response.component.css'
})
export class ViewCustomerResponseComponent {
  merchantid: any = localStorage.getItem('merchantId')
  history: any;
  date2: any;
  date1: any;
  custresponse: any = [];
  customerresponse: any;
  customerSurveyEntity: any;
  currentPage: string | number | undefined;
  searchText: any;
  questionId: any;
  searchPerformed: boolean = false;

  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, private activaterouter: ActivatedRoute, private location: Location, private toastr: ToastrService) {
  }

  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      // "Entity Name",
      "customerReferenceId",
      "Customer Name",
      "Customer Mobile",
      // "Questions",
      "Answers",
      "createdDatetime"
    ]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.activaterouter.queryParams.subscribe((res: any) => {
      this.questionId = res.Alldata;

    })
    this.service.ViewByIdCustomerResponse(this.questionId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.customerresponse = res.response;
        this.dataSource = new MatTableDataSource(this.customerresponse);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })

  }
  reload() {
    window.location.reload()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.searchPerformed = filterValue.length > 0;


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.customerresponse.forEach((element: any) => {
      let createdate = element.createdDatetime;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();

      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerId.merchantId.merchantLegalName);
      this.response.push(element?.customerId.customerReferenceId);
      this.response.push(element?.customerId.customerName);
      this.response.push(element?.customerId.mobileNumber);
      this.response.push(element?.questionId.questions);

      if (element.answers = 1) {

        this.response.push("Yes");

      }

      else {
        this.response.push("No");
      }
      this.response.push(this.date1);





      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S No",
      "Entity Name",
      "customer Id",
      "Customer Name",
      "Customer Mobile",
      "Questions",
      "Answers",
      "Submitted At"
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Setupbox History');
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




      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty7.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Submitted Details.xlsx');

    });
  }

  close() {
    this.location.back()
  }
  search(filterval: any) {
    if (!filterval) {
      this.toastr.error('Please enter a value to search');
      return;
    }


    this.service.CustomerQtsAnsSearch(this.questionId, filterval).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.customerresponse = res.response;
          // this.viewall.reverse();
          this.dataSource = new MatTableDataSource(this.customerresponse);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.customerresponse = [];
          this.dataSource = new MatTableDataSource(this.customerresponse);
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
