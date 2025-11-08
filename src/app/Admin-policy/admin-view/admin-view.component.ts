import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminTermsConditionComponent } from '../admin-terms-condition/admin-terms-condition.component';
import { AdminDisclaimerComponent } from '../admin-disclaimer/admin-disclaimer.component';
import { AdminPrivacypolicyComponent } from '../admin-privacypolicy/admin-privacypolicy.component';
import { AdminRefundpolicyComponent } from '../admin-refundpolicy/admin-refundpolicy.component';
import { PolicyApprovalComponent } from '../policy-approval/policy-approval.component';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent implements OnInit {
  dataSource: any;
  searchPerformed: boolean = false;
  displayedColumns: string[] = [
    "adminId",
    "merchantname",
    "termAndCondition",
    "disclaimer",
    "privacyPolicy",
    "refundPolicy",
    "Edit",
    "approval",
    "approvalstatus",
    "approvedBy",
    "approvedAt",
    "createdBy",
    "createdDateTime",
    "modifiedBy",
    "modifiedDateTime"
  ]
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  merchantpolicyexport: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  isFullPolicyVisible: boolean = false;
  limit: number = 30;
  valuetermAction: any;
  valuetermView: any;
  valuetermCreate: any;
  valuetermExport: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  date3: any;
  valuetermApproval: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  transactionValue: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  Roledetails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valuetermCreate = 'Merchant Policy-Add';
            this.valuetermExport = 'Merchant Policy-Export';
            this.valuetermView = 'Merchant Policy-View';
            this.valuetermAction = 'Merchant Policy-Edit'
            this.valuetermApproval = 'Merchant Policy-Approval'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Merchant Policy-Add') {
                this.valuetermCreate = 'Merchant Policy-Add';
              }
              if (this.actions == 'Merchant Policy-Export') {
                this.valuetermExport = 'Merchant Policy-Export'
              }
              if (this.actions == 'Merchant Policy-View') {
                this.valuetermView = 'Merchant Policy-View'
              }
              if (this.actions == 'Merchant Policy-Edit') {
                this.valuetermAction = 'Merchant Policy-Edit'
              }
              if (this.actions == 'Merchant Policy-Approval') {
                this.valuetermApproval = 'Merchant Policy-Approval'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  }

  Getall() {
    this.service.adminPolicyget(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategory = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.businesscategory);
        this.currentfilvalShow = false;
      } else if (res.flag === 2) {
        this.dataSource = new MatTableDataSource([]);
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.currentfilvalShow = false;
      }
    });
  }

  create() {
    this.router.navigateByUrl('dashboard/Termspolicy-create');
  }

  Edit(id: any) {
    this.router.navigate([`dashboard/policy-edit/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  togglePrivacyPolicy() {
    this.isFullPolicyVisible = !this.isFullPolicyVisible;
  }

  policyApproval(id: any) {
    const dialogRef = this.dialog.open(PolicyApprovalComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      width: '80vw',
      maxWidth: '500px',
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  Terms(id: any) {
    this.dialog.open(AdminTermsConditionComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });

  }

  Disclaimer(id: any) {
    this.dialog.open(AdminDisclaimerComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },

    });
  }

  privacypolicy(id: any) {
    this.dialog.open(AdminPrivacypolicyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  }

  refundpolicy(id: any) {
    this.dialog.open(AdminRefundpolicyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
  };

  customerpay(filterValue: string) {
    if (filterValue) {
      this.service.termspolicysearch('2', filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
            this.transactionValue = res.response;
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          } else if (res.flag === 2) {
            this.transactionValue = [];
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.service.termspolicysearch('2', this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.flag == 1) {
            this.transactionValue = res.response;
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.transactionValue = [];
            this.dataSource = new MatTableDataSource(this.transactionValue);
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.currentfilvalShow = true;
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    }
    else {
      this.service.adminPolicyget(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategory = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.businesscategory);

        } else if (res.flag === 2) {
          this.dataSource = new MatTableDataSource([]);
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
        }
      });
    }
  }

  exportexcel() {
    this.service.adminPolicygetExport().subscribe((res: any) => {
      this.merchantpolicyexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.merchantpolicyexport.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.entityModel?.entityName);
          this.response.push(element?.termAndCondition);
          this.response.push(element?.disclaimer);
          this.response.push(element?.privacyPolicy);
          this.response.push(element?.refundPolicy);
          this.response.push(element?.approvedStatus);
          this.response.push(element?.approvedBy);
          if (element?.approvedDateTime != null) {
            let createdate1 = element?.approvedDateTime;
            this.date3 = moment(createdate1).format('DD/MM/yyyy-hh:mm a').toString();
            this.response.push(this.date3);
          }
          else {
            this.response.push();
          }
          this.response.push(element?.createdBy);
          if (element?.createdDateTime != null) {
            let createdate = element?.createdDateTime;
            this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
            this.response.push(this.date1);
          }
          else {
            this.response.push();
          }
          this.response.push(element?.modifiedBy);
          if (element?.modifiedDateTime != null) {
            let moddate = element?.modifiedDateTime;
            this.date2 = moment(moddate).format('DD/MM/yyyy-hh:mm a').toString();
            this.response.push(this.date2);
          }
          else {
            this.response.push();
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
      'S.No',
      'Entity Name',
      'Terms and Condition',
      'Disclaimer',
      'Privacy Policy',
      'Refund Policy',
      'Approval Status',
      'Approval By',
      'Approval At',
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
      let qty9 = row.getCell(10);
      let qty10 = row.getCell(11);
      let qty11 = row.getCell(12);

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
      qty9.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty10.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      qty11.border = {
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
      FileSaver.saveAs(blob, 'Entity Terms and Policy.xlsx');
    });
  }












}
