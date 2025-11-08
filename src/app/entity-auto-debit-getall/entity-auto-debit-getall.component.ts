import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import moment from 'moment';
import { EncyDecySericeService } from '../Encrypt-Decrypt Service/ency-decy-serice.service';
import { Payload } from '../fargin-model/fargin-model.module';

@Component({
  selector: 'app-entity-auto-debit-getall',
  templateUrl: './entity-auto-debit-getall.component.html',
  styleUrl: './entity-auto-debit-getall.component.css'
})
export class EntityAutoDebitGetallComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'merchantLogId',
    'accountId',
    'merchantLegalName',
    'categoryName',
    'planName',
    'rentalAmount',
    'rentalPeriod',
    'fromLedger',
    "toLedger",
    'reason',
    'createAt'
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
  pageIndex: number = 0;
  pageSize = 5;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  viewallexport: any;
  getdashboard: any[] = [];
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  valueautodebitexport: any;
  maxScroll = 100;
  scrollValue = 0;
  pageIndex1: number = 0;
  pageSize1 = 5;
  totalpage1: any;
  totalPages1: any;
  currentpage1: any;
  filter: boolean = true;
  currentFilterValue: string = '';
  searchPerformed: boolean = false;
  currentfilvalShow: boolean = false;
  Roledetails: any;

  constructor(
    public autodebitdetails: FarginServiceService,
    private toastr: ToastrService,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {
    this.Role();
    this.Getall()
  }

  Role() {
    const payload = {
      roleId: this.roleId,
    };
    let datamodal: Payload = {
      data: this.cryptoService.encrypt(JSON.stringify(payload))
    }
    this.autodebitdetails.rolegetById(datamodal).subscribe({
      next: (res: any) => {
        if (res.flag == 1) {
          this.Roledetails = JSON.parse(this.cryptoService.decrypt(res.data));;
          this.getdashboard = this.Roledetails.SubPermissionsAccess;
          if (this.roleId == 1) {
            this.valueautodebitexport = 'Cloud Fee AutoDebit-Export'
          }
          else {
            for (let datas of this.getdashboard) {
              this.actions = datas.subPermissionName;
              if (this.actions == 'Cloud Fee AutoDebit-Export') {
                this.valueautodebitexport = 'Cloud Fee AutoDebit-Export'
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

  onSliderChange(event: any) {
    const scrollPercentage = event.target.value / this.maxScroll;
    const container = this.tableContainer.nativeElement;
    if (container) {
      container.scrollLeft = container.scrollWidth * scrollPercentage;
    }
  }

  Getall() {
    this.autodebitdetails.autodebitgetall(this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;
      }
      else if (res.flag == 2) {
        this.viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;

      }
    })
  }

  autodebit(filterValue: string) {
    if (!filterValue) {
      this.toastr.error('Please enter a value to search');
      return;
    }
    this.autodebitdetails.Mmcautodebit(filterValue, this.pageSize, this.pageIndex).subscribe({
      next: (res: any) => {
        if (res.response) {
          this.viewall = res.response;
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
      }
    });
  }

  getData(event: any) {
    if (this.currentfilvalShow) {
      this.autodebitdetails.Mmcautodebit(this.currentFilterValue, event.pageSize, event.pageIndex).subscribe({
        next: (res: any) => {
          if (res.response) {
            this.viewall = res.response;
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
          }
          else if (res.flag == 2) {
            this.viewall = [];
            this.totalPages = res.pagination.totalElements;
            this.totalpage = res.pagination.pageSize;
            this.currentpage = res.pagination.currentPage;
            this.dataSource = new MatTableDataSource(this.viewall);
          }
        },
        error: (err: any) => {
          this.toastr.error('No Data Found');
        }
      });
    }
    else {
      this.autodebitdetails.autodebitgetall(event.pageSize, event.pageIndex).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = res.response;
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
        }
        else if (res.flag == 2) {
          this.viewall = [];
          this.totalPages = res.pagination.totalElements;
          this.totalpage = res.pagination.pageSize;
          this.currentpage = res.pagination.currentPage;
          this.dataSource = new MatTableDataSource(this.viewall);
        }
      })
    }
  }

}
