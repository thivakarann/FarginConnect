import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { BusinessKycCreateComponent } from './business-kyc-create/business-kyc-create.component';
import { Payload, kycstatus } from '../../../fargin-model/fargin-model.module';
import { BusinessKycEditComponent } from './business-kyc-edit/business-kyc-edit.component';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-kyc',
  templateUrl: './business-kyc.component.html',
  styleUrl: './business-kyc.component.css',
})
export class BusinessKycComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'businessCategoryId',
    'kycDocName',
    'categoryName',
    'status',
    'Edit',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  businesscategorykyc: any;
  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked: any;
  date1: any;
  date2: any;
  businesscategory: any;
  businessCategoryId: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  adminName: any = this.cryptoService.decrypt(sessionStorage.getItem('Three') || '');
  actions: any;
  errorMessage: any;
  valueKycadd: any;
  valueKycexport: any;
  valueKycstatus: any;
  valueKycedit: any;
  searchPerformed: boolean = false;
  categoryList: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  currentfilvalShow: boolean = false;
  currentfilval: any;
  Roledetails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit() {
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
          if (this.roleId == '1') {
            this.valueKycexport = 'Business Category Doc-Export';
            this.valueKycadd = 'Business Category Doc-Add';
            this.valueKycedit = 'Business Category Doc-Edit';
            this.valueKycstatus = 'Business Category Doc-Status';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Business Category Doc-Export') {
                this.valueKycexport = 'Business Category Doc-Export';
              }
              if (this.actions == 'Business Category Doc-Add') {
                this.valueKycadd = 'Business Category Doc-Add';
              }
              if (this.actions == 'Business Category Doc-Edit') {
                this.valueKycedit = 'Business Category Doc-Edit';
              }
              if (this.actions == 'Business Category Doc-Status') {
                this.valueKycstatus = 'Business Category Doc-Status';
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
    const payload = {
      pageNumber: 0,
      pageSize: 5,
      fromDate: '',
      toDate: '',
      status: -1,
      searchContent: '',
      businessCategoryIds: []
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.service.BusinesscategoryKyc(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
        this.categoryList = this.businesscategorykyc.content;
        this.totalPages = this.businesscategorykyc.totalElements;
        this.totalpage = this.businesscategorykyc.size;
        this.currentpage = this.businesscategorykyc.number;
        this.currentfilvalShow = false;
      }
      else if (res.flag == 2) {
        this.businesscategorykyc = [];
        this.dataSource = new MatTableDataSource(this.businesscategorykyc.content);
        this.categoryList = this.businesscategorykyc.content;
        this.totalPages = this.businesscategorykyc.totalElements;
        this.totalpage = this.businesscategorykyc.size;
        this.currentpage = this.businesscategorykyc.number;
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
        pageNumber: '',
        pageSize: 5,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: filterValue,
        businessCategoryIds: []

      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.BusinesscategoryKyc(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
          this.currentfilvalShow = true;

        } else {
          this.businesscategorykyc = [];
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  getData(event: any) {
    if (this.currentfilvalShow) {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: '',
        businessCategoryIds: []

      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.BusinesscategoryKyc(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
          this.currentfilvalShow = true;

        } else {
          this.businesscategorykyc = [];
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
          this.currentfilvalShow = true;
        }
      });
    }
    else {
      const payload = {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: '',
        businessCategoryIds: []
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.BusinesscategoryKyc(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
        } else {
          this.businesscategorykyc = [];
          this.dataSource = new MatTableDataSource(this.businesscategorykyc?.content);
          this.categoryList = this.businesscategorykyc.content;
          this.totalPages = this.businesscategorykyc.totalElements;
          this.totalpage = this.businesscategorykyc.size;
          this.currentpage = this.businesscategorykyc.number;
        }
      });
    }
  }

  create() {
    const dialogRef = this.dialog.open(BusinessKycCreateComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  Edit(id: any) {
    const dialogRef = this.dialog.open(BusinessKycEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { value: id },
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  onSubmit(id: any) {
    let submitModel: kycstatus = {
      businessCategoryDocumentId: id,
      modifiedBy: this.adminName,
      modifierRole: this.adminName
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.BusinesskycActive(datamodal).subscribe((res: any) => {
      this.toastr.success(res.messageDescription);
      setTimeout(() => { this.Getall() }, 200);
    });
  };


  Exportall() {
    if (this.totalPages != 0) {
      const payload = {
        pageNumber: 0,
        pageSize: this.totalPages,
        fromDate: '',
        toDate: '',
        status: -1,
        searchContent: '',
        businessCategoryIds: []
      };
      let datamodal = {
        data: this.cryptoService.encrypt(JSON.stringify(payload))
      }
      this.service.BusinesscategoryKyc(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.businesscategorykyc = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.businesscategorykyc.content);
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
      this.response.push(element?.businessCategoryEntity?.businessCategoryName);
      this.response.push(element.businessDocumentTypeEntities.map((doc: any) => doc.documentType).join(', '));
      if (element?.status == 1) { this.response.push('Active'); }
      else { this.response.push('InActive'); }
      this.response.push(element?.createdby);
      this.response.push(this.date1);
      this.response.push(element?.modifiedBy);
      if (element?.modifiedDateTime) { this.response.push(element?.modifiedDateTime); }
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
      'Business Category',
      'Document Type',
      'Status',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Business KYC');
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Business KYC.xlsx');
    });
  }


  documenttype(data: any) {
    if (data?.businessDocumentTypeEntities?.length > 0) {
      const documentTypes = data.businessDocumentTypeEntities.map(
        (doc: any) => doc.documentType
      );

      Swal.fire({
        html: documentTypes.join('<br>'),
        width: '400px'
      });
    } else {
      Swal.fire({
        text: 'No document types found for this category.',
      });
    }
  }



}
