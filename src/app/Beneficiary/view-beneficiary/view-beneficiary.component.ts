import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AddBeneficiaryComponent } from '../add-beneficiary/add-beneficiary.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { employeeStatus, primaryStatus } from '../../fargin-model/fargin-model.module';
import moment from 'moment';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-view-beneficiary',
  templateUrl: './view-beneficiary.component.html',
  styleUrl: './view-beneficiary.component.css'
})
export class ViewBeneficiaryComponent implements OnInit {

  dataSource: any;
  merchantId: any = localStorage.getItem('merchantId')
  displayedColumns: any[] =
    ["employeeBeneficiaryId",
      "type",
      "accountHolderName",
      "emailAddress",
      "mobileNumber",
      " UPI",
      "accountNumber",
      "bankName",
      "branchName",
      "ifscCode",
      "accountType",
      "Primarystatus",
      "status",
      "actions"];
  viewData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  responseDataListnew: any = [];
  response: any = [];
  isChecked: any;
  date1: any;
  valueBeneficiaryAdd: any;
  valueBeneficiaryExport: any;
  valueBeneficiaryedit: any;
  valueBeneficiaryStatus: any;
  valueBeneficiaryprimarysts: any;
  getdashboard: any[] = [];
  actions: any;
  roleId: any = localStorage.getItem('roleId')
  roleName = localStorage.getItem('roleName')
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.service.BeneficiaryViewall(this.merchantId).subscribe((res: any) => {
      this.viewData = res.response;
      
      this.dataSource = new MatTableDataSource(this.viewData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.service.viewRole(this.roleId).subscribe((res: any) => {
      
      if (res.flag == 1) {
        this.getdashboard = res.response?.merchantSubPermission;
        if (this.roleName == 'Merchant Super admin')          {
        this.valueBeneficiaryAdd = 'Beneficiary-Add';
        this.valueBeneficiaryExport='Beneficiary-Export';
        this.valueBeneficiaryStatus='Beneficiary-Status';
        this.valueBeneficiaryedit='Beneficiary-Edit';
        this.valueBeneficiaryprimarysts='Beneficiary-Primary Status'
      }
      else {
        for (let datas of this.getdashboard) {
          this.actions = datas.subPermissions
          
          if(this.actions=='Beneficiary-Add'){
            this.valueBeneficiaryAdd='Beneficiary-Add'
          }
          if(this.actions=='Beneficiary-Export'){
            this.valueBeneficiaryExport='Beneficiary-Export';
          }
          if(this.actions=='Beneficiary-Status'){
            this.valueBeneficiaryStatus='Beneficiary-Status'
          }
          if(this.actions=='Beneficiary-Edit'){
            this.valueBeneficiaryedit='Beneficiary-Edit'
          }
          if(this.actions=='Beneficiary-Primary Status'){
            this.valueBeneficiaryprimarysts='Beneficiary-Primary Status'
          }
              }
      }
    }
    })


  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel() {
    
    let sno = 1;
    this.responseDataListnew = [];
    this.viewData.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.employeeId?.adminName || '--');
      this.response.push(element?.type || '--');
      this.response.push(element?.emailAddress || '--');
      this.response.push(element?.mobileNumber || '--')
      this.response.push(element?.accountHolderName || '--')
      this.response.push(element?.accountNumber || '--')
      this.response.push(element?.bankName || '--')
      this.response.push(element?.branchName || '--')
      this.response.push(element?.accountType || '--')
      this.response.push(element?.ifscCode || '--')
      this.response.push(element?.upiId || '--')
      this.response.push(element?.primaryAccountStatus || '--')
      // if (element.activeStatus == 1) {
      //   this.response.push("Active" || '--')
      // }
      // else {
      //   this.response.push("Inactive" || '--')
      // }
      this.response.push(element?.createdBy || '--');
      let createdate = element?.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response.push(this.date1 || '--');



      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      "S.No",
      "Beneficiary Name",
      "type",
      "Email Address",
      "Mobile Number",
      "Account Holder Name",
      "Account Number",
      "Bank",
      "Branch Name",
      "accountType",
      "ifscCode",
      "upiId",
      "Primary Account Status",
      "Status",
      "Created By",
      "Created At",

    ]


    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Payout Reports');
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
    }
    );
    worksheet.getColumn(1).protection = { locked: true, hidden: true }
    worksheet.getColumn(2).protection = { locked: true, hidden: true }
    worksheet.getColumn(3).protection = { locked: true, hidden: true }
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Payout Reports.xlsx');
    });
  }



  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: employeeStatus = {
      activeStatus: this.isChecked ? 1 : 0,
    };
    this.service.Beneficiarystatus(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  onSubmit1(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: primaryStatus = {
      primaryAccountStatus: this.isChecked ? 1 : 0,
    };
    this.service.BeneficiaryPrimarystatus(id, submitModel).subscribe((res: any) => {
      
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  create() {
    this.router.navigateByUrl('/dashboard/add-beneficiary')

  }
  edit(id: any) {
    

    this.router.navigate([`dashboard/edit-beneficiary/${id}`], {
      queryParams: { Alldata: id },
    });
  }
  reload(){
    window.location.reload()
  }
}
