import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';
import { Location } from '@angular/common';
import { ReadquestionsComponent } from '../readquestions/readquestions.component';

@Component({
  selector: 'app-customer-surveyquestions',
  templateUrl: './customer-surveyquestions.component.html',
  styleUrl: './customer-surveyquestions.component.css'
})
export class CustomerSurveyquestionsComponent {
  merchantid: any = sessionStorage.getItem('merchantId')
  history: any;
  date2: any;
  date1: any;
  custresponse: any = [];
  customerresponse: any;
  customerSurveyEntity: any;
  currentPage: number=1;
  searchText: any;
  questionId: any;
  isFullPolicyVisible:boolean=false;
  limit: number = 30;
  constructor(private service: FarginServiceService, private router: Router, private dialog: MatDialog, private activaterouter: ActivatedRoute, private location: Location) {
  }

  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "question",
      "answer",
      "remark",
      "createdBy",
      "createdDateTime",
      "view"
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
    
    let sno = 1;
    this.responseDataListnew = [];
    this.customerresponse.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.customerId?.merchantId?.merchantLegalName );
      this.response.push(element?.customerId?.customerName);
      this.response.push(element?.customerId?.mobileNumber);
      this.response.push(element?.questionId?.questions );
      // this.response.push(element?.emailAddress);
      if(element?.answers==1)
      {
        this.response.push('Yes');

      }
      else{
        this.response.push('No');
      }
      // this.response.push(element?.createdBy);
      // this.response.push(this.date1);
      // this.response.push(element?.modifiedBy);

      // if (element?.modifiedDateTime) {
      //   let issuedatas = element?.modifiedDateTime;
      //   this.date2 = moment(issuedatas).format('yyyy-MM-DD hh:mm a').toString();
      //   this.response.push(this.date2);
      // }
      // else {
      //   this.response.push('');
      // }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Entity Name",
      "Customer Name",
      "Customer Mobile",
      "Questions",
      "Answers",
    
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
      // let qty5 = row.getCell(6);
  
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }



    }
    );

    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }


    workbook.xlsx.writeBuffer().then((data: any) => {

      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });


      FileSaver.saveAs(blob, 'Questions & Answers.xlsx');

    });
  }

  close() {
    this.location.back()
  }

  read(id: any) {
    this.dialog.open(ReadquestionsComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }

}
