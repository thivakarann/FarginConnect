import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { setupStatus } from '../../../fargin-model/fargin-model.module';
import { AddSetupboxComponent } from '../../../main-master/setupbox/add-setupbox/add-setupbox.component';
import { EditSetupboxComponent } from '../../../main-master/setupbox/edit-setupbox/edit-setupbox.component';
import { CreateBulkComponent } from '../../../main-master/setupbox/setupbox-bulkupload/create-bulk/create-bulk.component';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-viewsetupboxreports',
  templateUrl: './viewsetupboxreports.component.html',
  styleUrl: './viewsetupboxreports.component.css',
})
export class ViewsetupboxreportsComponent {
  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId');
  displayedColumns: any[] = [
    'stbId',
    'MSO',
    'Region',
    'setupBoxNumber',
    'status',
    'bookingStatus',
    // 'CreatedBy',
    // 'createdAt',
    // 'modifiedBy',
    // 'modifiedat',
  ];
  bulkdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  isChecked: any;
  responseDataListnew: any[] = [];
  response: any[] = [];
  date1: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  channelexport: any;
  valuesetupadd: any;
  valuesetupexport: any;
  valuesetupimport: any;
  valuesetupuploadfile: any;
  valuesetupStatus: any;
  valuesetupedit: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId');
  roleName = localStorage.getItem('roleName');
  bulkdataexport: any;
  dialogRef: any;

  id: any;
  setupreports: any = FormGroup;

  setupBoxNumbers: any;
  mso: any;
  region: any;
  setupboxnumber: any;
  date2: any;
  booked: any;
  statused: any;
  showFooter: any = true;
  showentries:boolean=false;
  totalCount: any;
searchPerformed: boolean=false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service
      .bulkuploadViewall(this.merchantId, this.pageSize, this.pageIndex)
      .subscribe((res: any) => {
        if(res.flag==1)
        {
          this.bulkdata = res.response.content;
          this.totalPages = res.pagination?.totalElements;
          this.totalpage = res.pagination?.totalPages;
          this.currentpage = res.pagination?.currentPage + 1;
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if(res.flag==2){
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });

    if (this.roleName == 'Merchant Super admin') {

      this.valuesetupexport = 'Setup Box Reports-Export';


    } else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;

          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions;


            if (this.actions == 'Setup Box Reports-Export') {
              this.valuesetupexport = 'Setup Box Reports-Export';
            }


          }
        }
      });
    }
  }

  reload() {
    window.location.reload();
  }



  renderPage(event: PageEvent) {
    // Capture the new page index and page size from the event
    this.pageIndex = event.pageIndex; // Update current page index
    this.pageSize = event.pageSize; // Update page size (if changed)

    // Log the new page index and page size to the console (for debugging)
    console.log('New Page Index:', this.pageIndex);
    console.log('New Page Size:', this.pageSize);

    // You can now fetch or display the data for the new page index
    // Example: this.fetchData(this.currentPageIndex, this.pageSize);
    this.ngOnInit();
  }
  changePageIndex(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.renderPage({
      pageIndex: newPageIndex,
      pageSize: this.pageSize,
      // length: this.totalItems
    } as PageEvent);
  }



  exportexcel() {

    let sno = 1;
    this.responseDataListnew = [];
    this.bulkdata.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();

      this.response = [];
      this.response.push(sno);
      this.response.push(element?.service?.serviceProviderName);
      this.response.push(element?.regionEntity?.stateName);
      this.response.push(element?.setupBoxNumber);
      if (element.status == 1) {
        this.response.push('Active')
      }
      else {
        this.response.push('InActive')
      }
      if (element?.bookingStatus == '1') {
        this.response.push('Booked');
      } else if (element?.bookingStatus == '0') {
        this.response.push('Available');
      } else if (element?.bookingStatus == '2') {
        this.response.push('Damaged');
      }
      // this.response.push(element?.createdBy);
      // this.response.push(this.date1);
      // this.response.push(element?.modifiedBy);
      // if(element.modifiedAt){
      //   this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
      // }
      // else{
      //   this.response.push('');
      // }

      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
  excelexportCustomer() {
    const header = [
      'S.No',
      'MSO',
      'Region',
      'Setup Box Number',
      'Status',
      'Booking Status',
      // 'Created By',
      // 'Created At',
      // 'Updated By',
      // 'Updated At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Setupbox Reports');
    // Blank Row
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
      let qty5 = row.getCell(6);

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
      qty5.border = {
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
      FileSaver.saveAs(blob, 'Setupbox Reports.xlsx');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }







  reports() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true,
      position: { right: '0px' },
    });
  }
  setupbox() {
    let idParam = '';

    if (this.mso) {
      idParam += this.mso;
    }
    if (this.region) {
      idParam += this.region;
    }
    if (this.setupBoxNumbers) {
      idParam += this.setupBoxNumbers;
    }
    if (this.statused) {
      this.activestatus();
    }
    if (this.booked) {

      this.bookings();
    }

    if (idParam.endsWith('&')) {
      idParam = idParam.slice(0, -1);
    }
    if (this.mso || this.region || this.setupBoxNumbers) {
      this.sendcustomer(idParam);
    }
  }


  sendcustomer(idParam: any) {
    this.service.SetupBoxflag(this.merchantId, idParam, 1).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.bulkdata = res.response;
          this.bulkdata.reverse();
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.reset();
          this.showFooter = false;
          this.totalCount = this.bulkdata.length;
      
          console.log(this.totalCount)
          this.showentries=true;
        } else if (res.flag === 2) {
          this.totalCount = 0;
          this.bulkdata = [];
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.showFooter = false;
          this.showentries=true;
        }
        // this.reset();
      },
    });
  }

  bookings() {
    let idParam = this.booked;
    this.service.SetupBoxflag(this.merchantId, idParam, 2).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.bulkdata = res.response;
          this.bulkdata.reverse();
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();

          this.reset();
          this.showFooter = false;
          this.totalCount = this.bulkdata.length;
      
          console.log(this.totalCount)
          this.showentries=true;

        } else if (res.flag === 2) {
          this.totalCount = 0;
          this.bulkdata = [];
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.showentries=true;
          this.showFooter = false;


        }

      },
    });
  }
  activestatus() {
    let idParam = this.statused;
    this.service.SetupBoxflag(this.merchantId, idParam, 3).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.bulkdata = res.response;
          this.bulkdata.reverse();
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.reset();
          this.showFooter = false;
          this.totalCount = this.bulkdata.length;
      
          console.log(this.totalCount)
          this.showentries=true;


        } else if (res.flag === 2) {
          this.bulkdata = [];
          this.dataSource = new MatTableDataSource(this.bulkdata);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dialog.closeAll();
          this.totalCount = 0;
          this.showentries=true;
          this.showFooter = false;

        }
      },
    });
  }
  shouldDisable(fieldName: string): boolean {
    const fields = [
      this.mso,
      this.region,
      this.setupBoxNumbers,
      this.statused,
      this.booked,
    ];

    // Check if any field is filled except for the current field
    return (
      fields.filter(
        (value, index) => value && index !== this.getFieldIndex(fieldName)
      ).length > 0
    );
  }

  // custom filter disables fuctions
  private getFieldIndex(fieldName: string): number {
    const fieldNames = [
      'mso',
      'region',
      'setupBoxNumbers',
      'statused',
      'booked',
    ];

    return fieldNames.indexOf(fieldName);
  }
  reset(): void {
    this.mso = '';
    this.region = '';
    this.setupBoxNumbers = '';
    this.statused = '';
    this.booked = '';

  }
}
