import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { surveyQuestionsActive } from '../../fargin-model/fargin-model.module';
import { UpdateSurveyquestionsComponent } from '../update-surveyquestions/update-surveyquestions.component';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';

@Component({
  selector: 'app-view-surveyquestions',
  templateUrl: './view-surveyquestions.component.html',
  styleUrl: './view-surveyquestions.component.css'
})
export class ViewSurveyquestionsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] =
    [
      "sno",
      "questions",
      "status",
      "edit",
      "view",
      // "createdBy",
      // "createdDateTime",
      // "modifiedBy",
      // "modifiedDateTime"
    ]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantid: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isFullPolicyVisible: boolean = false;
  isChecked: boolean = false;
  survey: any;
  isSurveyVisible: boolean = false;

  limit: number =30;
  date1: any;
  date2: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  valuesurveyedit: any;
  valuesurveyadd: any;
  valuesurveyanswer: any;
  valuesurveystatus: any;
  valuesurveyview: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleNames = localStorage.getItem('roleName')
  surveyexport: any;
  valuesurveyExport:any;
  filter:boolean=false;
  pageIndex1: number = 0;
  pageSize1 = 5;
 
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  transactionValue: any;  
  currentfilval: any;
searchPerformed: boolean=false;
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {


    this.service.SurveyQuestionsViewById(this.merchantid, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.survey = res.response.content;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.survey);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=true;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
      }

      
    })
    if (this.roleNames == 'Merchant Super admin') {
      this.valuesurveyadd = "Customer Survey-Add"
      this.valuesurveyanswer = 'Customer Survey-Answer'
      this.valuesurveyedit = 'Customer Survey-Edit'
      this.valuesurveystatus = 'Customer Survey-Status'
      this.valuesurveyview = 'Customer Survey-View'
      this.valuesurveyExport='Customer Survey-Export'

    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Customer Survey-Add') {
              this.valuesurveyadd = 'Customer Survey-Add'
            }
            if (this.actions == 'Customer Survey-Answer') {
              this.valuesurveyanswer = 'Customer Survey-Answer'
            }
            if (this.actions == 'Customer Survey-Edit') {
              this.valuesurveyedit = 'Customer Survey-Edit'
            }
            if (this.actions == 'Customer Survey-Status') {
              this.valuesurveystatus = 'Customer Survey-Status'
            }
            if (this.actions == 'Customer Survey-View') {
              this.valuesurveyview = 'Customer Survey-View'
            }
            if(this.actions=='Customer Survey-Export'){
              this.valuesurveyExport='Customer Survey-Export'
            }
          }
        }

      })
    }


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
  add() {

    this.router.navigateByUrl(`dashboard/add-surveyquestions`);
  }

  reload() {
    window.location.reload()
  }

  edit(id: any) {

    this.dialog.open(UpdateSurveyquestionsComponent, {
      data: { value: id },
      disableClose: true,
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.SurveyQuestionsViewById(this.merchantid, this.pageSize, this.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.survey = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.survey);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter=true;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          this.filter=false;
        }
  
        
      })
    })
  }
  ActiveStatus(event: any, id: any) {
    this.isChecked = event.checked;
    let submitModel: surveyQuestionsActive = {
      activeStatus: this.isChecked ? 1 : 0
    }
    this.service.Surveyactivesstatus(id, submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        setTimeout(() => {
          
    this.service.SurveyQuestionsViewById(this.merchantid, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.survey = res.response.content;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.dataSource = new MatTableDataSource(this.survey);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter=true;
      }
      else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        this.filter=false;
      }

      
    })
        }, 1000);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }


  exportexcel() {
    this.service.SurveyQuestionsviewExport(this.merchantid).subscribe((res: any) => {
      this.surveyexport = res.response;
      if (res.flag == 1) {
 
 
        let sno = 1;
        this.responseDataListnew = [];
        this.surveyexport?.forEach((element: any) => {
          // let createdate = element.createdDatetime;
          // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
          // let moddate = element.modifiedDateTime;
          // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
 
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.questions);
          if(element.activeStatus==1){
            this.response.push("Active")
          }
          else if(element.activeStatus==0){
            this.response.push("Inactive")
          }
       
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
      "S No",
      "Questions",
      "Status"
    ]
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('View-SurveyQuestions');
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
 
      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
 
    }
    );
 
    // worksheet.getColumn(1).protection = { locked: true, hidden: true }
    // worksheet.getColumn(2).protection = { locked: true, hidden: true }
    // worksheet.getColumn(3).protection = { locked: true, hidden: true }
 
 
    workbook.xlsx.writeBuffer().then((data: any) => {
 
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
 
      FileSaver.saveAs(blob, 'View-SurveyQuestions.xlsx');
 
    });
  }



  viewQuestions(id: any) {
    this.dialog.open(ViewQuestionsComponent, {
      data: { value: id },
      disableClose: true,
    });
  }
  addans() {
    this.router.navigateByUrl(`dashboard/customerresponse-create`);

  }
  view(id: any) {
    this.router.navigate([`dashboard/view-customer-response/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
