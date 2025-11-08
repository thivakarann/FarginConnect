import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddKyccategoryComponent } from '../add-kyccategory/add-kyccategory.component';
import { EditKyccategoryComponent } from '../edit-kyccategory/edit-kyccategory.component';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { kyccateforysts, Payload, Getallstatus } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-viewall-kyccategory',
  templateUrl: './viewall-kyccategory.component.html',
  styleUrl: './viewall-kyccategory.component.css',
})
export class ViewallKyccategoryComponent implements OnInit {
  categoryview: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  dataSource: any;
  displayedColumns: string[] = [
    'kycCategoryId',
    'kycCategoryName',
    'status',
    'Edit',
    'createdBy',
    'createdAt',
    'modifiedBy',
    'modifiedAt',
  ];
  responseDataListnew: any;
  response: any;
  date2: any;
  date1: any;
  valuekycadd: any;
  valuekycexport: any;
  valuekycstatus: any;
  valuekycedit: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  actions: any;
  errorMessage: any;
  searchPerformed: boolean = false;
  currentfilvalShow: boolean = false;
  currentpage: any;
  totalpage: any;
  totalPages: any;
  currentfilval: any;
  categoryList: any;
  Roledetails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
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
    this.service.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valuekycadd = 'Business Document Type-Add';
            this.valuekycexport = 'Business Document Type-Export';
            this.valuekycedit = 'Business Document Type-Edit';
            this.valuekycstatus = 'Business Document Type-Status';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Business Document Type-Add') {
                this.valuekycadd = 'Business Document Type-Add';
              }
              if (this.actions == 'Business Document Type-Export') {
                this.valuekycexport = 'Business Document Type-Export';
              }
              if (this.actions == 'Business Document Type-Edit') {
                this.valuekycedit = 'Business Document Type-Edit';
              }
              if (this.actions == 'Business Document Type-Status') {
                this.valuekycstatus = 'Business Document Type-Status';
              }
            }
          }
        } else {
          this.errorMessage = res.responseMessage;
        }
      },
    });
  }

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
    this.service.viewallkycCategory(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.categoryview.content);
        this.categoryList = this.categoryview.content;
        this.totalPages = this.categoryview.totalElements;
        this.totalpage = this.categoryview.size;
        this.currentpage = this.categoryview.number;
        this.currentfilvalShow = false;
      } else {
        this.categoryview = [];
        this.dataSource = new MatTableDataSource(this.categoryview.content);
        this.categoryList = this.categoryview.content;
        this.totalPages = this.categoryview.totalElements;
        this.totalpage = this.categoryview.size;
        this.currentpage = this.categoryview.number;
        this.currentfilvalShow = false;
      }
    });
  };

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
      this.service.viewallkycCategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;
          this.currentfilvalShow = true;

        } else {
          this.categoryview = [];
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  create() {
    const dialogRef = this.dialog.open(AddKyccategoryComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  };

  Edit(id: string) {
    const dialogRef = this.dialog.open(EditKyccategoryComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  onSubmit(id: string) {
    let submitModel: kyccateforysts = {
      documentTypeId: id,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.statuskycCategory(datamodal).subscribe((res: any) => {
      this.toastr.success(res.messageDescription);
      setTimeout(() => { this.Getall(); }, 200);
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
      this.service.viewallkycCategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;
          this.currentfilvalShow = false;

        } else {
          this.categoryview = [];
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;
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
      this.service.viewallkycCategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;

        } else {
          this.categoryview = [];
          this.dataSource = new MatTableDataSource(this.categoryview.content);
          this.totalPages = this.categoryview.totalElements;
          this.totalpage = this.categoryview.size;
          this.currentpage = this.categoryview.number;
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
      this.service.viewallkycCategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.categoryview = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.categoryview.content);
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
      let createdate = element.createdDateTime;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.documentType);
      if (element?.status == 1) { this.response.push('Active'); }
      else { this.response.push('InActive'); }
      this.response.push(element?.createdby);
      this.response.push(this.date1);
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
      'S.No',
      'Document Type',
      'Status',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('KYC Category');
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'Business Documents.xlsx');
    });
  }
}
