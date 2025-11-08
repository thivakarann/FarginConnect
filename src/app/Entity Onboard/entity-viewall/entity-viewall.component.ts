import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EntityStatus, Payload } from '../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-entity-viewall',
  templateUrl: './entity-viewall.component.html',
  styleUrl: './entity-viewall.component.css'
})
export class EntityViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantId',
    'accountId',
    'referenceNo',
    'merchantLegalName',
    'businessCategoryModel',
    'contactMobile',
    'contactEmail',
    'finalapproval',
    'pgonboard',
    'status',
    'View',
    'createdDatetime',
    'failedLoginCount',
    'unblock'
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: boolean = false;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valueEntityAdd: any;
  valueEntityExport: any;
  valueEntityStatus: any;
  valueEntityView: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  actions1: any;
  errorMessage: any;
  unblockvalue: any;
  valueEntityUnblock: any;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter: boolean = false;
  currentfilval: any;
  entitytrans: any;
  entityoffline: any;
  entitysettle: any;
  entityrefund: any;
  entityQR: any;
  entitycustomer: any;
  entitypaylink: any;
  entitygeneral: any;
  entitybank: any;
  entityKYC: any;
  entitybussi: any;
  entityfinal: any;
  entityonetime: any;
  entitycusti: any;
  entitysms: any;
  entityAgrrement: any;
  entitybranch: any;
  valuecloud: any;
  entitybranchtrans: any;
  currentfilvalShow: boolean = false;
  service: any;
  transactionValue: any;
  setupboxhistory: any;
  searchPerformed: boolean = false;
  RenewelFee: any;
  valueWhatsappsetting: any;
  Roledetails: any;
  entitypermission: any;

  constructor(
    public EntityViewall: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
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
    this.EntityViewall.RolebyIDnew(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueEntityAdd = 'Entity Onboard-Add';
            this.valueEntityExport = 'Entity Onboard-Export';
            this.valueEntityStatus = 'Entity Onboard-Status';
            // this.valueEntityView = 'Entity Onboard-View';
            this.valueEntityUnblock = 'Entity Onboard-Unblock';
            this.entitytrans = 'Entity View Due Transactions';
            this.entitybranchtrans = 'Entity View-Branch-Transactions';
            this.entityoffline = 'Entity View Offline';
            this.entitysettle = 'Entity View Settlement';
            this.entityrefund = 'Entity View Refund';
            this.entityQR = "Entity View QR";
            this.entitycustomer = 'Entity View Customer';
            this.entitypaylink = 'Entity View Payment Link';
            this.entitygeneral = 'Entity View General Information';
            this.entitybank = 'Entity View Bank Information';
            this.entityKYC = 'Entity View KYC Document';
            this.entitybussi = 'Entity View Bussiness Document';
            this.entityfinal = 'Entity View Final Approval';
            this.entityonetime = 'One Time Setup Payment';
            this.entitycusti = 'Entity View Customized Payment';
            this.entitysms = 'Entity View-SMS Settings';
            this.entityAgrrement = 'Entity View Agreement';
            this.entitybranch = 'Entity View Branch';
            this.valuecloud = 'Entity View Cloud Fee AutoDebit';
            this.RenewelFee = 'Entity View Renewal Fee AutoDebit';
            this.valueWhatsappsetting = 'Entity View-WhatsApp Settings';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              this.actions1 = datas.permission.permissionName
              if (this.actions == 'Entity Onboard-Add') {
                this.valueEntityAdd = 'Entity Onboard-Add';
              }
              if (this.actions == 'Entity Onboard-Export') {
                this.valueEntityExport = 'Entity Onboard-Export'
              }
              if (this.actions == 'Entity Onboard-Status') {
                this.valueEntityStatus = 'Entity Onboard-Status'
              }
              if (this.actions == 'Entity Onboard-View') {
                this.valueEntityView = 'Entity Onboard-View'
              }
              if (this.actions == 'Entity Onboard-Unblock') {
                this.valueEntityUnblock = 'Entity Onboard-Unblock'
              }
              if (this.actions == 'Entity View Cloud Fee AutoDebit') {
                this.valuecloud = 'Entity View Cloud Fee AutoDebit'
              }
              if (this.actions1 == 'Entity View Due Transactions') {
                this.entitytrans = 'Entity View Due Transactions'
              }
              if (this.actions1 == 'Entity View-Branch-Transactions') {
                this.entitybranchtrans = 'Entity View-Branch-Transactions'
              }
              if (this.actions1 == 'Entity View Offline') {
                this.entityoffline = 'Entity View Offline'
              }
              if (this.actions1 == 'Entity View Settlement') {
                this.entitysettle = 'Entity View Settlement'
              }
              if (this.actions1 == 'Entity View Refund') {
                this.entityrefund = 'Entity View Refund'
              }
              if (this.actions1 == 'Entity View QR') {
                this.entityQR = 'Entity View QR'
              }
              if (this.actions1 == 'Entity View Customer') {
                this.entitycustomer = 'Entity View Customer'
              }
              if (this.actions1 == 'Entity View Payment Link') {
                this.entitypaylink = 'Entity View Payment Link'
              }
              if (this.actions1 == 'Entity View General Information') {
                this.entitygeneral = 'Entity View General Information'
              }
              if (this.actions1 == 'Entity View Bank Information') {
                this.entitybank = 'Entity View Bank Information'
              }
              if (this.actions1 == 'Entity View KYC Document') {
                this.entityKYC = 'Entity View KYC Document'
              }
              if (this.actions1 == 'Entity View Bussiness Document') {
                this.entitybussi = 'Entity View Bussiness Document'
              }
              if (this.actions1 == 'Entity View Final Approval') {
                this.entityfinal = 'Entity View Final Approval'
              }
              if (this.actions1 == 'One Time Setup Payment') {
                this.entityonetime = 'One Time Setup Payment'
              }
              if (this.actions1 == 'Entity View Customized Payment') {
                this.entitycusti = 'Entity View Customized Payment'
              }
              if (this.actions1 == 'Entity View-SMS Settings') {
                this.entitysms = 'Entity View-SMS Settings'
              }
              if (this.actions1 == 'Entity View Agreement') {
                this.entityAgrrement = 'Entity View Agreement'
              }
              if (this.actions1 == 'Entity View Branch') {
                this.entitybranch = 'Entity View Branch'
              }
              if (this.actions1 == 'Entity View Renewal Fee AutoDebit') {
                this.RenewelFee = 'Entity View Renewal Fee AutoDebit'
              }
              if (this.actions1 == 'Entity View-WhatsApp Settings') {
                this.valueWhatsappsetting = 'Entity View-WhatsApp Settings'
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
    this.EntityViewall.EntityViewall(this.pageSize, this.pageIndex).subscribe(
      (res: any) => {
        if (res.flag === 1) {
          this.viewall = res.response;

          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        } else if (res.flag == 2) {
          this.viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
          this.currentfilvalShow = false;
        }
      }
    );
  };

  Entity(filterValue: string) {
    if (filterValue) {
      this.EntityViewall.EntitySearch(filterValue, this.pageSize, this.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewall = res.response.content;
            this.viewall.reverse();
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
            this.currentfilvalShow = true;
          } else if (res.flag == 2) {
            this.viewall = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
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
      this.EntityViewall.EntitySearch(this.currentfilval, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewall = res.response.content;
            this.viewall.reverse();
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
          } else if (res.flag == 2) {
            this.viewall = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        },
      });
    } else {
      this.EntityViewall.EntityViewall(event.pageSize, event.pageIndex).subscribe(
        (res: any) => {
          if (res.flag === 1) {
            this.viewall = res.response;

            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
          } else if (res.flag == 2) {
            this.viewall = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);

          }
        }
      );
    }
  }

  add() {
    this.router.navigateByUrl('dashboard/entity-add');
  }

  Viewdata(id: any) {
    this.router.navigate([`dashboard/entity-view/${id}`], {
      queryParams: { Alldata: id },
    });
  }

  onSubmit(event: MatSlideToggleChange, id: any) {
    this.isChecked = event.checked;
    let submitModel: EntityStatus = {
      merchantId: id,
      accountStatus: this.isChecked ? 1 : 0,
    };

    this.EntityViewall.EntityActiveStatus(submitModel).subscribe((res: any) => {
      this.toastr.success(res.responseMessage);
      setTimeout(() => {
        this.Getall();
      }, 500);
    });
  }

  unblock(id: any) {
    this.EntityViewall.unblockentityAccount(id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.unblockvalue = res.response;
        this.toastr.success(res.responseMessage);
        setTimeout(() => {
          this.Getall()
        }, 500);
      } else {
        this.toastr.error(res.responseMessage);
      }
    });
  }

  exportexcel() {
    this.EntityViewall.EntityViewallExport().subscribe((res: any) => {
      this.viewallexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.viewallexport.forEach((element: any) => {
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.accountId);
          this.response.push(element?.referenceNo);
          this.response.push(element?.entityName);
          this.response.push(element?.businessCategoryModel?.categoryName);
          this.response.push(element?.contactEmail);
          if (element?.approvalStatusL2 == 'approved') {
            this.response.push('Approved');
          }
          else if (element?.approvalStatusL2 == 'Pending') {
            this.response.push('Pending');
          }
          else {
            this.response.push('Rejected');
          }
          if (element?.onBoardStatus == 'true') {
            this.response.push('Approved');
          }
          else {
            this.response.push('Pending');
          }
          if (element?.accountStatus == 1) {
            this.response.push('Active');
          }
          else {
            this.response.push('Inactive');
          }
          if (element.createdDatetime) {
            this.response.push(moment(element?.createdDatetime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
          }

          if (element?.failedLoginCount != 6) {
            this.response.push('Unblocked');
          }
          else {
            this.response.push('blocked');
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
      "S.No",
      'Account Id',
      'Reference No',
      'Entity Name',
      'Business Category',
      'Entity Email',
      'Final approval',
      'PG Onboard',
      'Status',
      "Created At",
      "Login Account Status"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entity Details');
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

    }
    );

    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Details.xlsx');
    });
  }

}
