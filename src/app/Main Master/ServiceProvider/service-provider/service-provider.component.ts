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
    "companyname",
    "providername",
    "email",
    "mobile",
    "address",
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


  constructor(private service: FarginServiceService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }
  ngOnInit() {
    this.service.ServiceProviderView().subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.showcategoryData = false;
      }
      else {
        this.errorMsg = res.responseMessage;
        this.showcategoryData = true;
      }
    });
  }

  create() {
    this.dialog.open(ServiceproviderAddComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
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
    console.log(this.serviceId)
    this.isChecked = event.checked;

    let submitModel: Providerstatus = {
      serviceId: this.serviceId,
      status: this.isChecked ? 1 : 0,
    };
    this.service.UpdateProviderStatus(submitModel).subscribe((res: any) => {
      console.log(res);
      if (res.flag == 1) {
        this.data = res.response;
        console.log(this.data)
        this.toastr.success(res.responseMessage);
        window.location.reload();
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
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();

      let moddate = element.modifiedAt;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.companyName);
      this.response.push(element?.serviceProviderName);
      this.response.push(element?.emailAddress);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.location);
      if (element?.status == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }

      this.response.push(element?.createdBy);

      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);

      this.response.push(this.date2);



      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    // const title='Business Category';
    const header = [
      "S.No",
      "Companyname",
      "Providername",
      "Email",
      "Mobile",
      "Address",
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: any) {
    this.dialog.open(ServiceproviderEditComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
}

