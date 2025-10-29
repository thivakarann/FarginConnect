import { Component, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewTermComponent } from '../view-term/view-term.component';
import { ViewDisclaimerComponent } from '../view-disclaimer/view-disclaimer.component';
import { ViewPrivacypolicyComponent } from '../view-privacypolicy/view-privacypolicy.component';
import { ViewRefundpolicyComponent } from '../view-refundpolicy/view-refundpolicy.component';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrl: './view-policy.component.css',
})
export class ViewPolicyComponent implements OnInit {
  policyvalue: any;
  valuetermCreate: any;
  valuetermExport: any;
  dataSource: any;
  valuetermView: any;
  isFullPolicyVisible: boolean = false;
  hidecreate: boolean = false;
  limit: number = 30;
  valuetermAction: any;
  displayedColumns: string[] = [
    'policyId',
    'termAndCondition',
    'disclaimer',
    'privacyPolicy',
    'refundPolicy',
    'Edit',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  responseDataListnew: any[] = [];
  response: any[] = [];
  date1: any;
  date2: any;
  valuefarginpolicyadd: any;
  valuefarginpolicyexport: any;
  valuetermedits: any;
  errorMessage: any;
  getdashboard: any[] = [];
roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  valuetermViews: any;
  searchPerformed: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private cryptoService:EncyDecySericeService,

  ) { }

  ngOnInit(): void {

    this.service.rolegetById(this.roleId).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.getdashboard = res.response?.subPermission;
          if (this.roleId == 1) {
            this.valuefarginpolicyadd = 'Fargin Policy-Add';
            this.valuefarginpolicyexport = 'Fargin Policy-Export';
            this.valuetermViews = 'Fargin Policy-View';
            this.valuetermedits = 'Fargin Policy-Edit';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissions;
              if (this.actions == 'Fargin Policy-Add') {
                this.valuefarginpolicyadd = 'Fargin Policy-Add';
              }
              if (this.actions == 'Fargin Policy-Export') {
                this.valuefarginpolicyexport = 'Fargin Policy-Export';
              }
              if (this.actions == 'Fargin Policy-View') {
                this.valuetermViews = 'Fargin Policy-View';
              }
              if (this.actions == 'Fargin Policy-Edit') {
                this.valuetermedits = 'Fargin Policy-Edit';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
    this.Getall();
  }

  Getall() {
    this.service.viewfarginPolicy().subscribe((res: any) => {
      if (res.flag == 1) {
        this.policyvalue = res.response;
        this.dataSource = new MatTableDataSource(this.policyvalue.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.hidecreate = true;
      }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  create() {
    this.router.navigateByUrl('dashboard/add-policy');
  };

  Edit(id: any) {
    this.router.navigate([`dashboard/edit-policy/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  togglePrivacyPolicy() {
    this.isFullPolicyVisible = !this.isFullPolicyVisible;
  };

  Terms(id: any) {
    this.dialog.open(ViewTermComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id }
    });
  }
  Disclaimer(id: any) {
    this.dialog.open(ViewDisclaimerComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id }
    });
  }
  privacypolicy(id: any) {
    this.dialog.open(ViewPrivacypolicyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  }
  refundpolicy(id: any) {
    this.dialog.open(ViewRefundpolicyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  };

  exportexcel() {
    let sno = 1;
    this.responseDataListnew = [];
    this.policyvalue.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.termAndCondition);
      this.response.push(element?.disclaimer);
      this.response.push(element?.privacyPolicy);
      this.response.push(element?.refundPolicy);
      this.response.push(element?.createdBy);
      if (element?.createdDateTime != null) {
        let createdate = element?.createdDateTime;
        this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
        this.response.push(this.date1);
      } else {
        this.response.push();
      }
      this.response.push(element?.modifiedBy);
      if (element?.modifiedDateTime != null) {
        let moddate = element?.modifiedDateTime;
        this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
        this.response.push(this.date2);
      } else {
        this.response.push();
      }
      sno++;
      this.responseDataListnew.push(this.response);
    });
    this.excelexportCustomer();
  }

  excelexportCustomer() {
    const header = [
      'S.No',
      'Terms and Condition',
      'Disclaimer',
      'Privacy Policy',
      'Refund Policy',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Terms and Policy');
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
      qty6.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty7.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty8.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Fargin Terms and Policy.xlsx');
    });
  }
}
