import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { RefundPeriodAddComponent } from '../refund-period-add/refund-period-add.component';
import { RefundPeriodEditComponent } from '../refund-period-edit/refund-period-edit.component';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload, Getallstatus } from '../../../fargin-model/fargin-model.module';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Refundstatus } from '../../../Fargin Model/fargin-model/fargin-model.module';

@Component({
  selector: 'app-refund-period-viewall',
  templateUrl: './refund-period-viewall.component.html',
  styleUrl: './refund-period-viewall.component.css'
})
export class RefundPeriodViewallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'refundDayId',
    'paymentMethod',
    'day',
    'status',
    'Edit',
    'View',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  getdashboard: any[] = [];
  valueexport: any;
  errorMessage: any;
  actions: any;
  valueadd: any;
  valueedit: any;
  searchPerformed: boolean = false;
  History: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  Roledetails: any;

  constructor(
    public refunddetails: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall();
  };

  Role() {
    const payload = {
      roleId: this.roleId,
    };

    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }

    this.refunddetails.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueexport = 'Refund Period-Export'
            this.valueadd = 'Refund Period-Add'
            this.valueedit = 'Refund Period-Edit'
            this.History = 'Refund Period-History'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Refund Period-Export') {
                this.valueexport = 'Refund Period-Export'
              }
              if (this.actions == 'Refund Period-Add') {
                this.valueadd = 'Refund Period-Add'
              }
              if (this.actions == 'Refund Period-Edit') {
                this.valueedit = 'Refund Period-Edit'
              }

              if (this.actions == 'Refund Period-History') {
                this.History = 'Refund Period-History'
              }

            }
          }
        }
        else {
          this.errorMessage = res.responseMessage;
        }
      }
    });
    this.Getall();
  };

  Getall() {
    let submitModel: Getallstatus = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: ''
    };

    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }

    this.refunddetails.RefundperiodGetall(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.totalPages = this.viewall.totalElements;
        console.log(this.totalPages)
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;

      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.dataSource = new MatTableDataSource(this.viewall.content);
        this.totalPages = this.viewall.totalElements;
        console.log(this.totalPages)
        this.totalpage = this.viewall.size;
        this.currentpage = this.viewall.number;
        this.currentfilvalShow = false;
      }
    });
  }

  Search(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.toastr.error('Please Enter the Text');
    }
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
      this.refunddetails.RefundperiodGetall(datamodal).subscribe((res: any) => {
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

  Addrefund() {
    const dialogRef = this.dialog.open(RefundPeriodAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  Editrefunds(id: any) {
    const dialogRef = this.dialog.open(RefundPeriodEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: "500ms",
      data: { value: id },
      disableClose: true
    })
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  view(id: any) {
    this.router.navigate([`dashboard/refund-period-history/${id}`], {
      queryParams: { Alldata: id },
    });
  };

  onSubmit(id: any) {
    const submitModel: Refundstatus = {
      refundPeriodId: id,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.refunddetails.Refunsupdatestatus(datamodal).subscribe((res: any) => {
      this.toastr.success(res.messageDescription);
      setTimeout(() => { this.Getall() }, 200);
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
      this.refunddetails.RefundperiodGetall(datamodal).subscribe((res: any) => {
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
      this.refunddetails.RefundperiodGetall(datamodal).subscribe((res: any) => {
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
        searchContent: ''
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.refunddetails.RefundperiodGetall(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.viewall.content);
        } else {
          console.error('NO Record Found');
        }
      });
    }
  }

  exportexcel(data: any[]) {
    let sno = 1;
    this.responseDataListnew = [];
    data.forEach((element: any) => {
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      if (element?.paymentMethod == 'UPI') { this.response.push("UPI/QR"); }
      else { this.response.push(element?.paymentMethod); }
      this.response.push(element?.refundPeriods);
      this.response.push(element?.createdby);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
      if (element?.modifiedDateTime != null) {
        let moddate = element.modifiedDateTime;
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
      "Payment Method",
      "Refund Period",
      "Created By",
      "Created At",
      "Modified By",
      "Modified At"
    ]
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Refund Period Details');
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
      FileSaver.saveAs(blob, 'Refund Period Details.xlsx');
    });
  }
}
