import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Adminstatus } from '../../fargin-model/fargin-model.module';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  displayedColumns: string[] = [
    "sno",
    "name",
    'roleName',
    "email",
    "mobile",
    "loginFailedCount",
    "unblock",
    "status",
    "Edit",
    "view",
    "createdBy",
    "createdDateTime",
    "modifiedBy",
    "modifiedDateTime",
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
  unblockvalue: any;
  searchPerformed: boolean = false;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.Getall()
  }

  Getall() {
    this.service.GetAdminDetails().subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };

      }
      else {
        this.data = [];
        this.dataSource = new MatTableDataSource(this.data.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
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

  admincreate() {
    this.router.navigate([`/dashboard/admincreate`], {
      // queryParams: { blockId:  this.blockId},
    });
  }

  adminview(id: any) {
    this.adminuserId = id;
    this.router.navigate([`/dashboard/view-admin/${this.adminuserId}`], {
      queryParams: { AdminUserId: this.adminuserId },
    });
  }

  adminedit(id: any) {
    this.adminuserId = id;
    this.router.navigate([`/dashboard/adminedit/${this.adminuserId}`], {
      queryParams: { AdminUserId: this.adminuserId },
    });
  }

  unblock(id: any) {
    this.service.unblockAccount(id).subscribe((res: any) => {
      this.unblockvalue = res.response;
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall();
        }, 200);
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    });

  }

  ActiveStatus(event: MatSlideToggleChange, id: string) {
    this.adminUserId = id;
    this.isChecked = event.checked;
    let submitModel: Adminstatus = {
      adminUserId: this.adminUserId,
      accountStatus: this.isChecked ? 1 : 0,
    };
    this.service.UpdateAdminStatus(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.data = res.response;
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall();
        }, 200);
      }
      else {
        this.toastr.error(res.responseMessage);
      }

    });

  };

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.data.forEach((element: any) => {
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      let moddate = element.modifiedAt;
      this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.adminName);
      this.response.push(element?.roleModel?.roleName)
      this.response.push(element?.gender);
      this.response.push(element?.emailAddress);
      this.response.push(element?.mobileNumber);
      this.response.push(element?.address);
      this.response.push(element?.country);
      this.response.push(element?.city);
      this.response.push(element?.state);
      this.response.push(element?.pincode);
      if (element?.accountStatus == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }
      if (element?.loginFailedCount == 6) {
        this.response.push("blocked");
      }
      else {
        this.response.push("Unblocked");
      }
      this.response.push(element?.createdBy);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
      if (element?.modifiedAt) {
        this.response.push(moment(element?.modifiedAt).format('DD/MM/yyyy-hh:mm a').toString());
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
    const header = [
      "S No",
      "Name",
      "Role Name",
      "Gender",
      "Email",
      "Mobile",
      "Address",
      "Country",
      "City",
      "State",
      "Pincode",
      "Status",
      "Block/unblock Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business Category');

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
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);
      let qty12 = row.getCell(13);
      let qty13 = row.getCell(14);
      let qty14 = row.getCell(15);
      let qty15 = row.getCell(16);
      let qty16 = row.getCell(17);

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
      qty10.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty11.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty12.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty13.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty14.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty15.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty16.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }


    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'User Creation.xlsx');

    });
  }



}
