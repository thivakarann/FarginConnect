import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddbankDetailsComponent } from '../addbank-details/addbank-details.component';
import { EditBankDetailsComponent } from '../edit-bank-details/edit-bank-details.component';
import { Payload, UpdateBankdetailStatus, Getallstatus } from '../../../fargin-model/fargin-model.module';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-bank-viewall',
  templateUrl: './bank-viewall.component.html',
  styleUrl: './bank-viewall.component.css'
})
export class BankViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'bankId',
    'bankName',
    'activeStatus',
    'Edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt',
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
  valuebanklistexport: any;
  valuebanklistadd: any;
  valuebankstatus: any;
  valuebankedit: any;
  errorMessage: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  actions: any;
  valuetermViews: any;
  searchPerformed: boolean = false;
  categoryList: any;
  totalPages: any;
  totalpage: any;
  currentfilvalShow: boolean = false;
  currentpage: any;
  currentfilval: any;
  Roledetails: any;

  constructor(
    public bankdetails: FarginServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {
    this.Role();
    this.fetchBankDetails()
  };

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.bankdetails.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valuebanklistadd = 'Bank Details-Add'
            this.valuebanklistexport = 'Bank Details-Export'
            this.valuebankstatus = 'Bank Details-Status'
            this.valuebankedit = 'Bank Details-Edit'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Bank Details-Add') {
                this.valuebanklistadd = 'Bank Details-Add'
              }
              if (this.actions == 'Bank Details-Export') {
                this.valuebanklistexport = 'Bank Details-Export'
              }
              if (this.actions == 'Bank Details-Status') {
                this.valuebankstatus = 'Bank Details-Status'
              }
              if (this.actions == 'Bank Details-Edit') {
                this.valuebankedit = 'Bank Details-Edit'
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

  fetchBankDetails() {
    let submitModel: Getallstatus = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: '',
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.bankdetails.bankdetailsViewall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.viewall?.content);
        this.categoryList = this.viewall.content;
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall?.content);
        this.categoryList = this.viewall.content;
        this.totalPages = this.viewall.totalElements;
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
    });
  };

  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) { this.toastr.error('Please Enter the Text'); }
    else {
      let submitModel: Getallstatus = {
        pageNumber: '',
        pageSize: 5,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: filterValue
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.bankdetails.bankdetailsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = true;

        } else {
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

  AddBankDetails() {
    const dialogRef = this.dialog.open(AddbankDetailsComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchBankDetails();
    });
  };

  Editbankdetails(id: any) {
    const dialogRef = this.dialog.open(EditBankDetailsComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.fetchBankDetails();
    });
  }

  ActiveStatus(id: any) {
    let submitModel: UpdateBankdetailStatus = {
      bankDetailsId: id,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.bankdetails.activebankdetailsstatus(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.messageDescription);
        setTimeout(() => { this.fetchBankDetails() }, 200);
      }
      else {
        this.toastr.error(res.messageDescription);
      }
    });
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: ''
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.bankdetails.bankdetailsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
          this.currentfilvalShow = false;
        }
      });
    }
    else {
      let submitModel: Getallstatus = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: this.currentfilval
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(submitModel))
      }
      this.bankdetails.bankdetailsViewall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
        } else {
          this.viewall = [];
          this.dataSource = new MatTableDataSource(this.viewall.content);
          this.totalPages = this.viewall.totalElements;
          this.totalpage = this.viewall.size;
          this.currentpage = this.viewall.number;
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
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.bankdetails.bankdetailsViewall(datamodal).subscribe((res: any) => {
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
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.bankName);
      if (element?.status == 1) {
        this.response.push("Active");
      }
      else {
        this.response.push("InActive");
      }
      this.response.push(element?.createdby);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
      if (element?.modifiedAt != null) {
        let moddate = element.modifiedAt;
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

  excelexportCustomer() {
    const header = [
      "S.No",
      "Bank Name",
      "Status",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Bank Details');
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

      qty.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty3.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty4.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty5.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      qty6.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Bank Details.xlsx');
    });
  }
}
