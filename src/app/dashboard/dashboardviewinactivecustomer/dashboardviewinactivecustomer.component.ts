import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomerStatusComponent } from '../../Customer/customer-status/customer-status.component';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-dashboardviewinactivecustomer',
  templateUrl: './dashboardviewinactivecustomer.component.html',
  styleUrl: './dashboardviewinactivecustomer.component.css'
})
export class DashboardviewinactivecustomerComponent {

  dataSource: any;
  displayedColumns: string[] = ["sno", "roletype", "role", "name", "mobilenumber", "email", "status","routestatus", "View"]
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  merchantId: any = localStorage.getItem('merchantId')
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  admin: any;
  valueadminadd: any;
  valueadminexport: any;
  valueadminedit: any;
  valueadminstatus: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  merchantAdminId: any;
  adminactive: any;
searchPerformed: boolean=false;

  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.dashboardviewactivecustomers(this.merchantId, 0).subscribe((res: any) => {
   if(res.flag==1)
   {
    this.adminactive = res.response;
    this.dataSource = new MatTableDataSource(this.adminactive.reverse());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

   }
   else if(res.flag==2){
    this.dataSource = new MatTableDataSource([]);
    this.dataSource = new MatTableDataSource(this.adminactive.reverse());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

      
    });
    if (this.roleName == 'Merchant Super admin') {
      this.valueadminadd = 'Employee-Add'
      this.valueadminedit = 'Employee-Edit'
      this.valueadminexport = 'Employee-Export'
      this.valueadminstatus = 'Employee-Status'
    }
    else {
      this.service.viewRole(this.roleId).subscribe((res: any) => {

        if (res.flag == 1) {
          this.getdashboard = res.response?.merchantSubPermission;


          for (let datas of this.getdashboard) {
            this.actions = datas.subPermissions

            if (this.actions == 'Employee-Add') {
              this.valueadminadd = 'Employee-Add'
            }
            if (this.actions == 'Employee-Edit') {
              this.valueadminedit = 'Employee-Edit'
            }
            if (this.actions == 'Employee-Export') {
              this.valueadminexport = 'Employee-Export'
            }
            if (this.actions == 'Employee-Status') {
              this.valueadminstatus = 'Employee-Status'
            }
          }
        }

      })
    }

  }



  adminview(id: any) {
    this.merchantAdminId = id;
    this.router.navigate([`/dashboard/admin-view/${this.merchantAdminId}`], {
      queryParams: { AdminUserId: this.merchantAdminId },
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  add() {
    this.router.navigateByUrl('dashboard/add-admin');
  }
  edit(id: any) {
    this.router.navigate([`dashboard/edit-admin/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  exportexcel() {
 
    let sno = 1;
    this.responseDataListnew = [];
    this.adminactive.forEach((element: any) => {
   
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.roleType);
 
      this.response.push(element?.merchantRoleId?.roleName);
      this.response.push(element?.adminName);
      this.response.push(element?.mobileNumber)
      this.response.push(element?.adminEmail)
      if (element?.accountStatus == '0') {
        this.response.push('Inactive')
      }
     
      if (element?.customerAssignedStatus == '1') {
        this.response.push('Assigned')
      }
      else {
        this.response.push('Not Assigned')
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }
 
  excelexportCustomer() {
    const header = [
      "S.No",
      "Role Type",
      "Role",
      "Employee Name",
      "Mobile Number",
      "Email",
      "Status",
      "Route Assigned Status",
    ]
 
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Inactive Employee');
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
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Inactive Employee.xlsx');
    });
  }


  reload() {
    window.location.reload()
  }
  viewadmin(id: any, filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }

    this.service.Employeedetails(id, filterValue).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.admin = res.response;
          this.admin.reverse();
          this.dataSource = new MatTableDataSource(this.admin);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        else if (res.flag === 2) {
          this.admin = [];
          this.dataSource = new MatTableDataSource(this.admin);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err: any) => {
        this.toastr.error('Error fetching filtered regions');
      }
    });
  }
}
