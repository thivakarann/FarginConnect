import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';

@Component({
  selector: 'app-surveyviewall',
  templateUrl: './surveyviewall.component.html',
  styleUrl: './surveyviewall.component.css'
})
export class SurveyviewallComponent {
  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "entityname",
      "questions",
      "view",
      "createdDateTime",

    ]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantid: any = sessionStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isFullPolicyVisible: boolean = false;





  isChecked: boolean = false;
  survey: any;
  isSurveyVisible: boolean = false;

  limit: number = 30;
  date1: any;
  date2: any;
  valuesurveyexport: any;
  valuesurveyview: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  pageIndex: number=0 ;
  pageSize:number=5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  surveyexport: any;
  filter:boolean=false;
      
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;

  currentfilval:any;
  currentfilvalShow:boolean=false;
  searchPerformed: boolean=false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        

        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valuesurveyexport = 'Survey-Export';
            this.valuesurveyview = 'Survey-View'

          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;


              if (this.actions == 'Survey-Export') {
                this.valuesurveyexport = 'Survey-Export';
              }
              if (this.actions == 'Survey-View') {
                this.valuesurveyview = 'Survey-View'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });


    this.service.SurveyViewAll(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.survey = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.survey = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = false;
        }
      });
  }

  reload() {
    this.service.SurveyViewAll(this.pageSize,this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.survey = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.survey = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = false;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportexcel() {
    this.service.SurveyViewAllExport().subscribe((res: any) => {
        this.surveyexport = res.response;
        if (res.flag == 1) {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.surveyexport.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      // let moddate = element.modifiedDateTime;
      // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.merchantId.entityName );
      this.response.push(element?.questions);
      this.response.push(element?.createdDatetime);
 
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
});
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      "Entity Name",
      "Questions",
      "Created Date"
    ]
 
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Survey');
  
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
 
     
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   
    }
    );
 
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'Survey.xlsx');
 
    });
  }


  excelexportDetails() {
    const header = [
      "customerName",
      "area",
      "cityName",
      "pincodeName",
      "stateName",
      "countryName",
      "emailAddress",
      "alterMobileNumber",
      "apartmentName",
      "flatNumber",
      "blockNumber",
      "doorNumber",
      "landmark",
      "houseName",
      "age",
      "advanceStatus",
      "advanceAmount",
      "streetName",
      "mobileNumber",
      "freeLine"

      // "setupBoxNumber",
      // "channelName",
      // "planName",
      // "bouquetName"
    ];

    const data = this.responseDataListnew;

    // Prepare CSV content
    const csvContent = [];

    // Add header to CSV
    csvContent.push(header.map(item => `"${item}"`).join(','));

    data.forEach((d: any) => {
      // Access the first element and remove single quotes if present
      // const channelNames = Array.isArray(d.channelName) ? d.channelName[0].replace(/'/g, '') : d.channelName;
      // const planNames = Array.isArray(d.planName) ? d.planName[0].replace(/'/g, '') : d.planName;
      // const bouquetNames = Array.isArray(d.bouquetName) ? d.bouquetName[0].replace(/'/g, '') : d.bouquetName;

      // Prepare the row data with double quotes
      const rowData = [
        d.customerName,
        d.area,
        d.cityName,
        d.pincodeName,
        d.stateName,
        d.countryName,
        d.emailAddress,
        d.alterMobileNumber,
        d.apartmentName,
        d.flatNumber,
        d.blockNumber,
        d.doorNumber,
        d.landmark,
        d.houseName,
        d.age,
        d.advanceStatus,
        d.advanceAmount,
        d.streetName,
        d.mobileNumber,
        d.freeLine
        // d.setupBoxNumber,
        // channelNames,
        // planNames,
        // bouquetNames
      ].map(item => `"${item}"`); // Wrap each item in double quotes

      csvContent.push(rowData.join(','));
    });

    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'Customer.csv');
  }
  viewQuestions(id: any) {
    this.dialog.open(ViewQuestionsComponent, {
      data: { value: id },
      disableClose: true,
    });
  }
  view(id: any) {


    this.router.navigate([`dashboard/view-surveyquestions/${id}`], {
      queryParams: { Alldata: id }
    })
  }

 
  search(filterval:any){
  
  if (filterval) {

  this.service.SurveySearch(filterval,this.pageSize,this.pageIndex).subscribe({
    next: (res: any) => {
      if (res.response) {
        this.survey = res.response.content;  
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = true;
      } else if (res.flag == 2) {
        this.survey = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.survey);
        this.currentfilvalShow = true;
        }
    },
    error: (err: any) => {
      this.toastr.error('No Data Found');
    }
  });
}
else if (!filterval) {
  this.toastr.error('Please enter a value to search');
  return;
}
} 

getData(event: any) {
  if (this.currentfilvalShow) {
    this.service.SurveySearch(this.currentfilval,event.pageSize,event.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.survey = res.response.content;  
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.survey); 
        } else if (res.flag == 2) {
          this.survey = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.survey); 
          }
      },
      error: (err: any) => {
        this.toastr.error('No Data Found');
      }
    });
  }
 else {
  this.service.SurveyViewAll(event.pageSize,event.pageIndex).subscribe((res: any) => {
    if (res.flag == 1) {
      this.survey = res.response;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.pageSize;
      this.currentpage = res.pagination.currentPage;
      this.dataSource = new MatTableDataSource(this.survey); 
    } else if (res.flag == 2) {
      this.survey = [];
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.pageSize;
      this.currentpage = res.pagination.currentPage;
      this.dataSource = new MatTableDataSource(this.survey); 
      }
    });
    }
}

}
