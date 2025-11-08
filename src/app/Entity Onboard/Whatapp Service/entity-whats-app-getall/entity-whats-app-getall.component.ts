import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-whats-app-getall',
  templateUrl: './entity-whats-app-getall.component.html',
  styleUrl: './entity-whats-app-getall.component.css'
})
export class EntityWhatsAppGetallComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'entityName',
    'Vendor',
    'templateType',
    'Title',
    'Status',
    'Charges',
    'Lan',
    'count',
    'createdBy',
    'date',
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  FromDateRange!: string;
  currentPage!: number;
  ToDateRange!: string;
  Daterange!: string;
  Viewall: any;
  content: any;
  filteredData: any;
  getallData: any;
  term: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  transaction: any;
  message: any;
  showData: boolean = false;
  WhatsappResponseexport: any;
  valueentitysmsexport: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  pageIndex2: number = 0;
  pageSize2 = 5;
  totalpage2: any;
  totalPages2: any;
  currentpage2: any;
  filter: boolean = false;
  filter1: boolean = false;
  filters: boolean = false;
  smsResponseexport: any;
  currentfilval: any;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;
  SearchApi = false;
  Empty = "";
  Roledetails: any;

  constructor(
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
            this.valueentitysmsexport = 'Entity WhatsApp-Export';
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;

              if (this.actions == 'Entity WhatsApp-Export') {
                this.valueentitysmsexport = 'Entity WhatsApp-Export';
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
    const formData = new FormData();
    formData.append('content', '');
    formData.append('size', '5');
    formData.append('pageNumber', '0');

    this.service.MerchatWhatsAPPGetall(formData).subscribe((res: any) => {
      if (res.flag == 1) {
        this.Viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.Viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.Viewall);
        this.currentfilvalShow = false;
      }
    })
  };

  Search(filterValue: string) {
    if (filterValue) {
      const formData = new FormData();
      formData.append('content', filterValue);
      formData.append('size', '5');
      formData.append('pageNumber', '0');

      this.service.MerchatWhatsAPPGetall(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.currentfilvalShow = true;
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
          this.currentfilvalShow = true;
        }
      })
    }
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
  };

  getData(event: any) {
    if (this.currentfilvalShow) {
      const formData = new FormData();
      formData.append('content', this.currentfilval);
      formData.append('size', event.pageSize);
      formData.append('pageNumber', event.pageIndex);

      this.service.MerchatWhatsAPPGetall(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
      })
    }
    else {
      const formData = new FormData();
      formData.append('content', '');
      formData.append('size', event.pageSize);
      formData.append('pageNumber', event.pageIndex);
      this.service.MerchatWhatsAPPGetall(formData).subscribe((res: any) => {
        if (res.flag == 1) {
          this.Viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);

        }
        else if (res.flag == 2) {
          this.Viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.Viewall);
        }
      });
    }
  };

  exportexcel() {
    this.service.MerchatWhatsAppGetallExport().subscribe((res: any) => {
      this.WhatsappResponseexport = res.response;
      if (res.flag == 1) {
        let sno = 1;
        this.responseDataListnew = [];
        this.WhatsappResponseexport.forEach((element: any) => {
          let createdate = element.createdDateTime;
          this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
          this.response = [];
          this.response.push(sno);
          this.response.push(element?.entityName);
          this.response.push(element?.vendorName);
          if (element?.templateType == 'Merchant') { this.response.push('Merchant'); }
          else if (element?.templateType == 'Customer') { this.response.push('Customer'); }
          this.response.push(element?.templateTitle);
          if (element?.smsEnableStatus == 'ACTIVE') { this.response.push('Active'); }
          else { this.response.push('InActive'); }
          this.response.push(element?.smsCharge);
          if (element?.templateLanguage == 'en') { this.response.push('English'); }
          else if (element?.templateLanguage == 'ta') { this.response.push('Tamil'); }
          this.response.push(element?.smsCount);
          this.response.push(element?.createdBy);
          if (element.createdDateTime) {
            this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy hh:mm a').toString());
          }
          else {
            this.response.push('');
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
      'S.NO',
      'EntityName',
      'Vendor',
      'Recipient',
      'Title',
      'Status',
      'Charges',
      'Language',
      'count',
      'createdBy',
      'Craeteed At',
    ];

    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sms Settings');
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Entity WhatsApp Services.xlsx');
    });
  }
}
