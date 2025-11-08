import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MerchantPlanAddComponent } from '../merchant-plan-add/merchant-plan-add.component';
import { MerchantPlanStatus, Payload } from '../../fargin-model/fargin-model.module';
import { EditMerchantPlanComponent } from '../edit-merchant-plan/edit-merchant-plan.component';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { EncyDecySericeService } from '../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-merchant-plan-viewall',
  templateUrl: './merchant-plan-viewall.component.html',
  styleUrl: './merchant-plan-viewall.component.css'
})
export class MerchantPlanViewallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantPlanId',
    'businessCategoryName',
    'planName',
    'countLimit',
    'activeStatus',
    'Edit',
    'serviceAmount',
    'renewalAmount',
    'maintenanceAmount',
    'voiceBoxSetupFee',
    'voiceBoxAdvRent',
    'frequency',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
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
  Emptylist: any = [];
  valueMerchantAdd: any;
  valueMerchantExport: any;
  valueMerchantStatus: any;
  valueMerchantEdit: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  searchPerformed: boolean = false;
  currentfilvalShow: boolean = false;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilval: any;
  Roledetails: any;

  constructor(
    public Merchantplanviewall: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,
  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall()
  };

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.Merchantplanviewall.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueMerchantAdd = 'Entity Plan-Add';
            this.valueMerchantEdit = 'Entity Plan-Edit'
            this.valueMerchantExport = 'Entity Plan-Export'
            this.valueMerchantStatus = 'Entity Plan-Status'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Entity Plan-Add') {
                this.valueMerchantAdd = 'Entity Plan-Add';
              }
              if (this.actions == 'Entity Plan-Edit') {
                this.valueMerchantEdit = 'Entity Plan-Edit'
              }
              if (this.actions == 'Entity Plan-Export') {
                this.valueMerchantExport = 'Entity Plan-Export'
              }
              if (this.actions == 'Entity Plan-Status') {
                this.valueMerchantStatus = 'Entity Plan-Status'
              }
            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
  };

  Getall() {
    const payload = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: '',
      businessCategoryIds: this.Emptylist
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.Merchantplanviewall.merchantplanviewall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
    });
  };

  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.toastr.error('Please Enter the Text');
    }
    else {
      const payload = {
        pageNumber: 0,
        pageSize: 5,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: filterValue,
        businessCategoryIds: this.Emptylist
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.Merchantplanviewall.merchantplanviewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
        else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  Add() {
    const dialogRef = this.dialog.open(MerchantPlanAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  Edit(id: any) {
    const dialogRef = this.dialog.open(EditMerchantPlanComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  ActiveStatus(id: any) {
    let submitModel: MerchantPlanStatus = {
      entityPlanId: id
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.Merchantplanviewall.merchantplanstatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.Getall() }, 200);
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    });
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: '',
        businessCategoryIds: this.Emptylist
      };
      let datamodal: Payload = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.Merchantplanviewall.merchantplanviewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        }
        else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        }
      });
    } else {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: this.currentfilval,
        businessCategoryIds: this.Emptylist
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.Merchantplanviewall.merchantplanviewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
        else if (res.flag == 2) {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;
        }
      });
    }
  }

  Exportall() {
    if (this.totalPages != 0) {
      const payload = {
        pageNumber: 0,
        pageSize: this.totalPages,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: '',
        businessCategoryIds: this.Emptylist
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.Merchantplanviewall.merchantplanviewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.exportexcel(this.viewall.content);
        }
      });
    } else {
      this.toastr.error('No record found');
    }
  }

  exportexcel(data: any[]) {
    let sno = 1;
    this.responseDataListnew = [];
    data.forEach((element: any) => {
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.businessCategoryEntity?.businessCategoryName);
      this.response.push(element?.planName);
      this.response.push(element?.customerOnboardLimit);
      if (element?.status == 1) { this.response.push("Active"); }
      else { this.response.push("InActive"); }
      this.response.push(element?.oneTimeSetupFee);
      this.response.push(element?.yearlyRenewalFee);
      this.response.push(element?.cloudFee);
      this.response.push(element?.voiceBoxSetupFee);
      this.response.push(element?.voiceBoxRent);
      this.response.push(element?.cloudFeeFrequency);
      this.response.push(element?.createdby);
      if (element?.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else {
        this.response.push('');
      }
      this.response.push(element?.modifiedBy);
      if (element?.modifiedDateTime) {
        this.response.push(moment(element?.modifiedDateTime).format('DD/MM/yyyy-hh:mm a').toString());
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
      "S.No",
      'Business Category',
      "PlanName",
      "Customer Onboard Limit",
      "Plan Status",
      "One-Time Setup Fee",
      "Yearly Renewal Fee",
      "Cloud Fee",
      "Voice Box Setup Fee",
      "Voice Box Rent",
      "Cloud Fee Frequency",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Merchant Plan Details');
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
    }
    );
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Entity Plans.xlsx');
    });
  }

}


