import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { AddfacheckkeyComponent } from '../addfacheckkey/addfacheckkey.component';
import { EditfacheckkeyComponent } from '../editfacheckkey/editfacheckkey.component';
import moment from 'moment';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { Statusfacheckkey, Getallstatus } from '../../../fargin-model/fargin-model.module';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-viewfacheckkey',
  templateUrl: './viewfacheckkey.component.html',
  styleUrl: './viewfacheckkey.component.css',
})
export class ViewfacheckkeyComponent {
  [x: string]: any;
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'apikey',
    'secretKey',
    'ApplicationId',
    'mode',
    'Edit',
    'status',
    'createdBy',
    'createdDateTime',
    'modifiedBy',
    'modifiedDateTime',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  facheck: any;
  showcategoryData: any;
  errorMsg: any;
  isChecked: any;
  date1: any;
  date2: any;
  responseDataListnew: any = [];
  response: any = [];
  valuefacheckAdd: any;
  valuefacheckexport: any;
  valuefacheckedit: any;
  valuefacheckstatus: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  copySuccess: boolean = false;
  copiedIndex: number = -1;
  copiedIndex2: number = -1;
  searchPerformed: boolean = false;
  totalPages: any;
  currentpage: any;
  totalpage: any;
  currentfilval: any;
  currentfilvalShow: boolean = false;
  Roledetails: any;

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit() {
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
    this.service.viewfacheck(datamodal).subscribe((res: any) => {
      if (res.flag == 1) {
        this.facheck = JSON.parse(this.cryptoService.decrypt(res.data));
        this.dataSource = new MatTableDataSource(this.facheck.content);
        this.totalPages = this.facheck.totalElements;
        console.log(this.totalPages)
        this.totalpage = this.facheck.size;
        this.currentpage = this.facheck.number;
        this.currentfilvalShow = false;
      }
      else {
        this.facheck = [];
        this.dataSource = new MatTableDataSource(this.facheck.content);
        this.totalPages = this.facheck.totalElements;
        console.log(this.totalPages)
        this.totalpage = this.facheck.size;
        this.currentpage = this.facheck.number;
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
      this.service.viewfacheck(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.facheck = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;
          this.currentfilvalShow = true;

        } else {
          this.facheck = [];
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;
          this.currentfilvalShow = true;
        }
      });
    }
  };

  add() {
    const dialogRef = this.dialog.open(AddfacheckkeyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  Edit(id: string) {
    const dialogRef = this.dialog.open(EditfacheckkeyComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true,
      data: { value: id },
    });
    dialogRef.componentInstance.bankDetailsUpdated.subscribe(() => {
      this.Getall();
    });
  }

  copyText(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex = index;
    setTimeout(() => (this.copiedIndex = -1), 2000);
  }

  copyText1(text: string, index: number) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copiedIndex2 = index;
    setTimeout(() => (this.copiedIndex2 = -1), 2000);
  }

  onSubmit(id: any) {
    let submitModel: Statusfacheckkey = {
      facheckKeyId: id,
    };
    let datamodal = {
      data: this.cryptoService.encrypt(JSON.stringify(submitModel))
    }
    this.service.statusfacheck(datamodal).subscribe((res: any) => {
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
      this.service.viewfacheck(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.facheck = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;
          this.currentfilvalShow = false;

        } else {
          this.facheck = [];
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;
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
      this.service.viewfacheck(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.facheck = JSON.parse(this.cryptoService.decrypt(res.data));
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;

        } else {
          this.facheck = [];
          this.dataSource = new MatTableDataSource(this.facheck.content);
          this.totalPages = this.facheck.totalElements;
          this.totalpage = this.facheck.size;
          this.currentpage = this.facheck.number;
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
      this.service.viewfacheck(datamodal).subscribe((res: any) => {
        if (res.flag == 1) {
          this.facheck = JSON.parse(this.cryptoService.decrypt(res.data));
          this.exportexcel(this.facheck.content);
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
      let createdate = element.createdAt;
      this.date1 = moment(createdate).format('DD/MM/yyyy-hh:mm a').toString();
      this.response = [];
      this.response.push(sno);
      this.response.push(element?.apiKey);
      this.response.push(element?.secretKey);
      this.response.push(element?.applicationId);
      this.response.push(element?.mode);
      if (element?.status == '1') { this.response.push('Active'); }
      else { this.response.push('Inactive'); }
      this.response.push(element?.createdby);
      if (element?.createdDateTime) {
        this.response.push(moment(element?.createdDateTime).format('DD/MM/yyyy-hh:mm a').toString());
      }
      else {
        this.response.push('');
      }
      this.response.push(element?.modifiedDateTime);
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
      'Api Key',
      'Secret Key',
      'Application Id',
      'Mode',
      'Status',
      'Created By',
      'Created At',
      'Modified By',
      'Modified At',
    ];
    const data = this.responseDataListnew;
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Facheck');
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
    });
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', });
      FileSaver.saveAs(blob, 'Facheck.xlsx');
    });
  }
}
