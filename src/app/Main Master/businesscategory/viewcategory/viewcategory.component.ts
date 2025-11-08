import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { ToastrService } from 'ngx-toastr';
import { Businessstatus, Payload, Getallstatus } from '../../../fargin-model/fargin-model.module';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { Workbook } from 'exceljs';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrl: './viewcategory.component.css',
})
export class ViewcategoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'businessCategoryId',
    'categoryname',
    'mccCode',
    'autoDebitDate',
    'status',
    'Edit',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  businesscategory: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  valueCategoryAdd: any;
  valueCategoryexport: any;
  valueCategorystatus: any;
  valueCategoryEdit: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  actions: any;
  errorMessage: any;
  searchPerformed: boolean = false;
  details: any;
  currentpage: any;
  totalpage: any;
  totalPages: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  categoryList: any;
  Roledetails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { this.Getall(); }

  ngOnInit() {
    this.Role();
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
            this.valueCategoryAdd = 'Bussiness Category-Add';
            this.valueCategoryEdit = 'Bussiness Category-Edit';
            this.valueCategorystatus = 'Bussiness Category-Status';
            this.valueCategoryexport = 'Bussiness Category-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Bussiness Category-Add') {
                this.valueCategoryAdd = 'Bussiness Category-Add';
              }
              if (this.actions == 'Bussiness Category-Edit') {
                this.valueCategoryEdit = 'Bussiness Category-Edit';
              }
              if (this.actions == 'Bussiness Category-Export') {
                this.valueCategoryexport = 'Bussiness Category-Export';
              }
              if (this.actions == 'Bussiness Category-Status') {
                this.valueCategorystatus = 'Bussiness Category-Status';
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
    this.service.Businesscategory(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategory = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.businesscategory.content);
        this.categoryList = this.businesscategory.content;
        this.totalPages = this.businesscategory.totalElements;
        this.totalpage = this.businesscategory.size;
        this.currentpage = this.businesscategory.number;
        this.currentfilvalShow = false;
      } else {
        this.businesscategory = [];
        this.dataSource = new MatTableDataSource(this.businesscategory.content);
        this.categoryList = this.businesscategory.content;
        this.totalPages = this.businesscategory.totalElements;
        this.totalpage = this.businesscategory.size;
        this.currentpage = this.businesscategory.number;
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
      this.service.Businesscategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategory = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
          this.currentfilvalShow = true;

        } else {
          this.businesscategory = [];
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  create() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  Edit(id: string) {
    const dialogRef = this.dialog.open(EditcategoryComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  onSubmit(id: any) {
    let submitModel: Businessstatus = {
      businessCategoryId: id,
      modifiedBy: this.adminName,
      modifierRole: this.adminName,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.Businessactive(datamodal).subscribe((res: any) => {
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
      this.service.Businesscategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategory = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
          this.currentfilvalShow = false;
        } else {
          this.businesscategory = [];
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
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
      this.service.Businesscategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategory = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
        } else {
          this.businesscategory = [];
          this.dataSource = new MatTableDataSource(this.businesscategory.content);
          this.totalPages = this.businesscategory.totalElements;
          this.totalpage = this.businesscategory.size;
          this.currentpage = this.businesscategory.number;
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
      this.service.Businesscategory(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategory = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.businesscategory.content);
        }
        else {
          this.toastr.error('No record found');
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
      this.response.push(element?.businessCategoryName);
      this.response.push(element?.mccCode);
      this.response.push(element?.autoDebitDate);
      if (element.status == 1) { this.response.push('Active'); }
      else { this.response.push('InActive'); }
      this.response.push(element?.createdby);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
      if (element.modifiedDateTime) {
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
      'Category Name',
      'Mcc Code',
      'Auto Debit Date',
      'Status',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];
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
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Business Category.xlsx');
    });
  }
}
