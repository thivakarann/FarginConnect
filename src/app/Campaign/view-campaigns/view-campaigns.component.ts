import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { CreateCampaignsComponent } from '../create-campaigns/create-campaigns.component';
import { ViewImagecampaignsComponent } from '../view-imagecampaigns/view-imagecampaigns.component';
import { CreateCommentcampaignsComponent } from '../create-commentcampaigns/create-commentcampaigns.component';
import { EditCampaignComponent } from '../edit-campaign/edit-campaign.component';
import { UpdateBulkcampaignComponent } from '../update-bulkcampaign/update-bulkcampaign.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-view-campaigns',
  templateUrl: './view-campaigns.component.html',
  styleUrl: './view-campaigns.component.css'
})
export class ViewCampaignsComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'raiseTicketId',
    'ticketid',
    'Comments',
    'Date',
    'image',
    'status',
    'edit',
    'emailrecord',
    'Record',
  ];
  tickets: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseDataListnew: any[] = [];
  response: any[] = [];
  date2: any;
  date1: any;
  viewall: any;
  ticketId: any;
  merchantId: any = sessionStorage.getItem('merchantId');
  showcategoryData: any;
  valueTickets: any;
  valueTicketsAdd: any;
  valueTicketsExport: any;
  valueTicketsImage: any;
  valueTicketsedit: any;
  valueTicketsview: any;
  responseExcelData: any = [];
  dataPush: any = [];
  responseData: any;
  getdashboard: any[] = [];
  actions: any;
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  roleName = sessionStorage.getItem('roleName');
  searchPerformed: boolean = false;
  isChecked: any;
  status: any;
  errorMessage: any;
  valueAdd: any;
  valueExport: any;
  valueImage: any;
  valueedit: any;
  valueview: any;
  valuedownload: any;
  ValueUpdateEmail: any;
  valueUplodedstatus: any;
  valuestatus: any;

  constructor(
    private router: Router,
    private service: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService:EncyDecySericeService,

  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valueAdd = 'Campaign-Add';
            this.valueExport = 'Campaign-Export';
            this.valueImage = 'Campaign-Image';
            this.valueedit = 'Campaign-Edit';
            this.valueview = 'Campaign-View';
            this.valuedownload = 'Campaign-Download-Template';
            this.ValueUpdateEmail = 'Campaign-Update-Email'
            this.valueUplodedstatus = 'Campaign-Uploaded-EmailDetails'
            this.valuestatus = 'Campaign-Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Campaign-Add') {
                this.valueAdd = 'Campaign-Add';
              }
              if (this.actions == 'Campaign-Export') {
                this.valueExport = 'Campaign-Export';
              }
              if (this.actions == 'Campaign-Image') {
                this.valueImage = 'Campaign-Image';
              }
              if (this.actions == 'Campaign-Edit') {
                this.valueedit = 'Campaign-Edit';
              }
              if (this.actions == 'Campaign-View') {
                this.valueview = 'Campaign-View';
              }
              if (this.actions == 'Campaign-Download-Template') {
                this.valuedownload = 'Campaign-Download-Template';
              }
              if (this.actions == 'Campaign-Update-Email') {
                this.ValueUpdateEmail = 'Campaign-Update-Email';
              }
              if (this.actions == 'Campaign-Uploaded-EmailDetails') {
                this.valueUplodedstatus = 'Campaign-Uploaded-EmailDetails';
              }
              if (this.actions == 'Campaign-Status') {
                this.valuestatus = 'Campaign-Status';
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.Getall();
  }

  Getall() {
    this.service.viewcampaign(1).subscribe((res: any) => {
      if (res.flag == 1) {
        this.tickets = res.response;
        this.dataSource = new MatTableDataSource(this.tickets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.tickets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  };

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.isDate(filterValue)) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const formattedDate = this.formatDate(data.emailDate).toLowerCase();
        return formattedDate.includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const subject = data.subject?.toLowerCase() || '';
        return subject.includes(filter);
      };
    }
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  isDate(value: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(value);
  }

  formatDate(date: string | Date): string {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toLocaleDateString('en-GB');
    }
    return '';
  }

  addCampaign() {
    const dialogRef = this.dialog.open(CreateCampaignsComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '610px',
      maxHeight: '570px'
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  comments(id: any) {
    this.dialog.open(CreateCommentcampaignsComponent, {
      disableClose: true,
      data: { value: id },
      width: '90vw',
      maxHeight: '500px',
      maxWidth: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }

  image(id: any) {
    const dialogRef = this.dialog.open(ViewImagecampaignsComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '500px',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  edit(id: any) {
    const dialogRef = this.dialog.open(EditCampaignComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '90vw',
      maxWidth: '500px',
      maxHeight: '600px',
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    this.status = this.isChecked ? 1 : 0
    this.service.campaignstatus(id, this.status).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else if (res.flag == 2) {
        this.toastr.warning(res.responseMessage);
      }
      else {
        this.toastr.error(res.responseMessage);

      }
      setTimeout(() => {
        this.Getall()
      }, 200);
    });
  }

  Viewcustomer(id: any) {
    this.router.navigate([`dashboard/view-record/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  openExcel() {
    const header = ['emailAddress'];
    const data = this.responseDataListnew;
    // Prepare CSV content
    const csvContent = [];
    // Add header to CSV
    csvContent.push(header.map((item) => `"${item}"`).join(','));
    const emailAddresses = [];
    data.forEach((d: any) => {
      // Collect email address
      if (d.emailAddress) {
        emailAddresses.push(d.emailAddress);
      }
      // Prepare the row data
      const rowData = [
        d.emailAddress || ''
        // Add any other fields as needed
      ].map((item) => `"${item.replace(/"/g, '""')}"`); // Escape double quotes
      csvContent.push(rowData.join(','));
    });
    // Create a Blob and save as CSV
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;', });
    FileSaver.saveAs(blob, 'Campaign.csv');
  }

  responseDownload(uploadId: any) {
    this.service.viewemailsendresponsecampaigns(uploadId).subscribe((res: any) => {
      this.responseData = res.response.data;
      if (res.flag == 1) {
        let sno = 1;
        this.responseExcelData = [];
        this.responseData?.forEach((element: any) => {
          this.dataPush = [];
          this.dataPush.push(sno);
          this.dataPush.push(element?.email);
          this.dataPush.push(element?.message);
          sno++;
          this.responseExcelData.push(this.dataPush);
        });
        this.responseExcel();
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }
  responseExcel() {
    const header = ['S.No', 'Email Address', 'Remarks'];
    const data = this.responseExcelData;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Campaign Upload Response');
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
      let row = worksheet.addRow(d);
      let qty = row.getCell(1);
      let qty1 = row.getCell(2);
      let qty2 = row.getCell(3);


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
    });
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Campaign.csv');
    });
  }

  editbulk(id: any) {
    const dialogRef = this.dialog.open(UpdateBulkcampaignComponent, {
      data: { value: id },
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      position: { right: '0px' },
      width: '35%'
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }


  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.tickets.forEach((element: any) => {
      let createdate = element.emailDate;
      this.date1 = moment(createdate).format('DD/MM/yyyy').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.subject);
      this.response.push(element?.emailContent);
      this.response.push(this.date1);
      if (element?.activeStatus == '1') { this.response.push('Active'); }
      else if (element?.activeStatus == '0') { this.response.push('Inactive'); }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Subject',
      'Content',
      'Date',
      'Email Status',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Campaign Reports');
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
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Campaign Reports.xlsx');
    });
  }



}
