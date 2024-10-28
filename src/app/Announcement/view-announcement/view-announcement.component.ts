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
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  valueannouncementEdit: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ["announcementId", "Business", "Announcement", "startDate", "endDate", "status", "Edit", "createdBy", "createdDateTime", "modifiedBy", "modifiedDateTime"]
  announcementValue: any;
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
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {

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

    this.service.announcementViewall().subscribe((res: any) => {
      this.announcementValue = res.response;
      
      this.announcementValue.reverse();
      this.dataSource = new MatTableDataSource(this.announcementValue);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })


  }

  reload() {
    window.location.reload()
  }

  search() {
    this.service.announcementDate(this.fromDate, this.toDate).subscribe({
      next: (res: any) => {

        this.datefilter = res.response;
        

        this.dataSource = new MatTableDataSource(this.datefilter);
        

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dateSuccess = res.responseMessage;
        
        this.fromDate = '';
        this.toDate = '';

      }
    })
  }

  togglePrivacyPolicy() {
    this.isFullPolicyVisible = !this.isFullPolicyVisible;
  }


  Edit(id: any) {
    this.dialog.open(EditAnnouncementComponent, {
      data: { value: id },
      width: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
  }

  reset(){
    window.location.reload()
  }

  create() {
    this.dialog.open(AddAnnouncementComponent, {
      width: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
        window.location.reload();
      }, 1000);
    });
  }
  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.announcementValue.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
 
      let moddate = element.updateDateTime;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
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
      else  {
        this.response.push('Inactive');
      }
   
      this.response.push(this.date1);
      this.response.push(element?.updatedBy);
      this.response.push(this.date2);
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
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
      "Created Date",
      "Modified By",
      "Modified Date and Time",
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
}
