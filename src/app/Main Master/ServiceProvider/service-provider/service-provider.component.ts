import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import moment from 'moment';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { ServiceproviderAddComponent } from '../serviceprovider-add/serviceprovider-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceproviderEditComponent } from '../serviceprovider-edit/serviceprovider-edit.component';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Providerstatus } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.css'
})
export class ServiceProviderComponent implements OnInit {
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  displayedColumns: string[] = [
    "sno",
    "providername",
    "serviceProviderLink",
    "status",
    "Edit",
    "createdBy",
    "createdDateTime",
    "modifiedBy",
    "modifiedDateTime"
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  isChecked: any;
  date1: any;
  date2: any;
  data: any;
  adminuserId: any;
  accountStatus: any;
  adminUserId: any;
  serviceId: any;
  valueMSOadd: any;
  valueMSOexport: any;
  valueMSOstatus: any;
  valueMSOedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  searchPerformed:boolean=false;


  constructor(private service: FarginServiceService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }
  ngOnInit() {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {


        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;

          if (this.roleId == 1) {
            this.valueMSOadd = 'MSO-Add';
            this.valueMSOexport = 'MSO-Export';
            this.valueMSOstatus = 'MSO-Status';
            this.valueMSOedit = 'MSO-Edit';
          }
          else {
            for (let datas of this.getdashboard) {

              this.actions = datas.subPermissions;



              if (this.actions == 'MSO-Add') {
                this.valueMSOadd = 'MSO-Add';
              }

              if (this.actions == 'MSO-Export') {
                this.valueMSOexport = 'MSO-Export';
              }

              if (this.actions == 'MSO-Status') {
                this.valueMSOstatus = 'MSO-Status';
              }

              if (this.actions == 'MSO-Edit') {
                this.valueMSOedit = 'MSO-Edit';
              }
            }
          }

        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });



    this.service.ServiceProviderView().subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;

        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      } else if (res.flag == 2) {
        this.data = []
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
      }
    });

  }

  create() {
    const dialogRef = this.dialog.open(ServiceproviderAddComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      disableClose: true
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });
  }

  fetch()
  {
    this.service.ServiceProviderView().subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      } else if (res.flag == 2) {
        this.data = []
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
      }
    });

  }


  reload() {
    this.service.ServiceProviderView().subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      } else if (res.flag == 2) {
        this.data = []
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
      }
    });
  }

  adminedit(id: any) {
    this.adminuserId = id;
    this.router.navigate([`/dashboard/adminedit/${this.adminuserId}`], {
      queryParams: { AdminUserId: this.adminuserId },
    });
  }

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.serviceId = id;

    this.isChecked = event.checked;

    let submitModel: Providerstatus = {
      serviceId: this.serviceId,
      status: this.isChecked ? 1 : 0,
    };
    this.service.UpdateProviderStatus(submitModel).subscribe((res: any) => {

      if (res.flag == 1) {
        this.data = res.response;

        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.service.ServiceProviderView().subscribe((res: any) => {
            if (res.flag == 1) {
              this.data = res.response;
              this.dataSource = new MatTableDataSource(this.data.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
           
            } else if (res.flag == 2) {
              this.data = []
              this.dataSource = new MatTableDataSource(this.data.reverse());
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          
            }
          });
       
        }, 500); 
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  }
  exportexcel() {
    console.log('check');
    let sno = 1;
    this.responseDataListnew = [];
    this.data.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy hh:mm a').toString();

      let moddate = element.modifiedAt;
      this.date2 = moment(moddate).format('DD/MM/yyyy hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.serviceProviderName);
      this.response.push(element?.serviceProviderLink);
      if (element?.status == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }

      this.response.push(element?.createdBy);

      if (element?.createdAt) {
        let issuedatas = element?.createdAt;
        this.date1 = moment(issuedatas).format(('DD/MM/yyyy hh:mm a')).toString();
        this.response.push(this.date1);
      }
      else {
        this.response.push('');
      }
      this.response.push(element?.modifiedBy);

      if (element?.modifiedAt) {
        let issuedatas = element?.modifiedAt;
        this.date2 = moment(issuedatas).format('DD/MM/yyyy hh:mm a').toString();
        this.response.push(this.date2);
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
    // const title='Business Category';
    const header = [
      "S.No",
      "Provider Name",
      "Service Provider Link",
      "Status",
      "CreatedBy",
      "CreatedDateTime",
      "ModifiedBy",
      "ModifiedDateTime",
    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business Category');
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
      // console.log("row loop");

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


      FileSaver.saveAs(blob, 'Service-Provider.xlsx');

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

  edit(id: any) {
    const dialogRef = this.dialog.open(ServiceproviderEditComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {

      this.fetch();

    });
  }
}

