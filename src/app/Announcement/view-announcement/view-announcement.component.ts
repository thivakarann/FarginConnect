import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { EditAnnouncementComponent } from '../edit-announcement/edit-announcement.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { PageEvent } from '@angular/material/paginator';

import { AnnouncementviewComponent } from '../announcementview/announcementview.component';
import { announcestatus } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrl: './view-announcement.component.css'
})
export class ViewAnnouncementComponent implements OnInit {

  valueannouncementAdd: any;
  valueannouncementexport: any;
  valueannouncementstatus: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueannouncementEdit: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["announcementId", "Business", "Announcement", "startDate", "endDate", "status", "Edit", "createdBy", "createdDateTime", "modifiedBy", "modifiedDateTime"]
  data: any;
  responseDataListnew: any[] = [];
  response: any;
  date1: any;
  date2: any;
  isFullPolicyVisible: boolean = false;
  limit: number = 30;
  isChecked: any;
  id: any;
  fromDate: any;
  toDate: any
  announcementId: any;
  datefilter: any;
  dateSuccess: any;
  announcementexport: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;


  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  pageSize1: number = 5;
 
  filter: boolean = true;
  pageIndex1: number = 0;
  maxDate: any;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {

    const today = new Date();
    this.maxDate = moment(today).format('yyyy-MM-DD').toString()


    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == '1') {
            this.valueannouncementAdd = 'Announcement-Add'
            this.valueannouncementEdit = 'Announcement-Edit'
            this.valueannouncementexport = 'Announcement-Export'
            this.valueannouncementstatus = 'Announcement-Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Announcement-Add') {
                this.valueannouncementAdd = 'Announcement-Add'
              }
              if (this.actions == 'Announcement-Edit') {
                this.valueannouncementEdit = 'Announcement-Edit'
              }
              if (this.actions == 'Announcement-Export') {
                this.valueannouncementexport = 'Announcement-Export'
              }
              if (this.actions == 'Announcement-Status') {
                this.valueannouncementstatus = 'Announcement-Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });

    this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.data = res.response.content;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      // this.announcementValue.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
    })


  }

  checkDate(){
    this.toDate = ''
    // this.FromDateRange =''
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

  reload() {
    this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.data = res.response.content;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      // this.announcementValue.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
    })

  }
  search() {
    this.service.announcementDate(this.fromDate, this.toDate,this.pageSize1, this.pageIndex1).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.data = res.response.content;
         
        this.totalPages1 = res.pagination.totalElements;
        this.totalpage1 = res.pagination.totalPages;
        this.currentpage1 = res.pagination.currentPage + 1;
 
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.dateSuccess = res.responseMessage;
 
        // this.fromDate = '';
        // this.toDate = '';
        this.filter = true;
      }
 
      else if (res.flag == 2) {
        this.filter = true;
        this.data = [];
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }
      }
    })
  }

  togglePrivacyPolicy() {
    this.isFullPolicyVisible = !this.isFullPolicyVisible;
  }




  Edit(id: any) {
    this.dialog.open(EditAnnouncementComponent, {
      data: { value: id },
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
    this.dialog.afterAllClosed.subscribe(()=>{
     
      this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
        this.data = res.response.content;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.announcementValue.reverse();
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      })
  
    })
  }

  reset() {
  this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.data = res.response.content;
      this.totalPages = res.pagination.totalElements;
      this.totalpage = res.pagination.totalPages;
      this.currentpage = res.pagination.currentPage + 1;
      // this.announcementValue.reverse();
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filter = false;
      this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      this.fromDate='';
      this.toDate='';
    })
  }

  create() {
    this.dialog.open(AddAnnouncementComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      width: '80vw',// Use percentage to make it responsive
      maxWidth: '500px',
    });
    this.dialog.afterAllClosed.subscribe(()=>{
     
      this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
        this.data = res.response.content;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.totalPages;
        this.currentpage = res.pagination.currentPage + 1;
        // this.announcementValue.reverse();
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filter = false;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
      })
  
    })
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase().toUpperCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(event: Event) { const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); this.dataSource.filter = filterValue; if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); } }

  onSubmit(event: MatSlideToggleChange, id: any) {

    this.announcementId = id
    this.isChecked = event.checked;

    let submitModel: announcestatus = {
      activeStatus: this.isChecked ? 1 : 0,
      announcementId: this.announcementId
    };

    this.service.announcementStatus(submitModel).subscribe((res: any) => {

      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.service.announcementViewall(this.pageSize, this.pageIndex).subscribe((res: any) => {
          this.data = res.response.content;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.totalPages;
          this.currentpage = res.pagination.currentPage + 1;
          // this.announcementValue.reverse();
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filter = false;
          this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
        })
      }, 500);
    });
  }
 
  exportexcel() {
    this.service.announcementViewallExport().subscribe((res: any) => {
      this.announcementexport = res.response;
      if (res.flag == 1) {
 
 
        let sno = 1;
        this.responseDataListnew = [];
        this.announcementexport.forEach((element: any) => {
          // let createdate = element.createdDateTime;
          // this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
          // let moddate = element.updateDateTime;
          // this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.businessCategory?.categoryName);
          this.response.push(element?.announcementContentEnglish);
          this.response.push(element?.startDate);
          this.response.push(element?.endDate);
          this.response.push(element?.createdBy);
          if (element?.activeStatus == '1') {
            this.response.push('Active');
          }
          else {
            this.response.push('Inactive');
          }
         

          // this.response.push(this.date1 ||'-');
             if (element?.createdDateTime) {
                  this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
                }
                else {
                  this.response.push('-');
                }
         
          this.response.push(element?.updatedBy);
          if (element?.updateDateTime) {
            this.response.push(moment(element?.updateDateTime).format('DD/MM/yyyy-hh:mm a').toString());
          }
          else {
            this.response.push('-');
          }
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
      "Business Category",
      "Announcement",
      "Start date",
      "End date",
      "Created By",
      "Status",
      "Created Date/Time",
      "Modified By",
      "Modified At",
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Announcement');
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    headerRow.font = { bold: true };
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
      let qty9 = row.getCell(10);
 
 
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
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Announcement.xlsx');
    });
  }
 

  announcement(id: any) {
    this.dialog.open(AnnouncementviewComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
  }
  renderPage1(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex1 = event.pageIndex;  // Update current page index
    this.pageSize1 = event.pageSize;           // Update page size (if changed)
 
    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex1);
    console.log('New Page Size:', this.pageSize1);
 
    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.search();
  }
 
  changePageIndex1(newPageIndex1: number) {
    this.pageIndex1 = newPageIndex1;
    this.renderPage1({
      pageIndex: newPageIndex1,
      pageSize: this.pageSize1,
      // length: this.totalItems
    } as PageEvent);
  }
  
}
