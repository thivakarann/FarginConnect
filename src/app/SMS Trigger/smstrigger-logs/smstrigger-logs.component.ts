import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SMSContentComponent } from '../smscontent/smscontent.component';

@Component({
  selector: 'app-smstrigger-logs',
  templateUrl: './smstrigger-logs.component.html',
  styleUrl: './smstrigger-logs.component.css'
})
export class SMSTriggerLogsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'responseCode',
    'responseStatus',
    'mobileNumber',
    'smsMessage',
    'createdDateTime',
  ];
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Logid: any;
  viewall: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageSize = 5;
  pageIndex: number = 0;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;
  roleId: any = sessionStorage.getItem('roleId');
  limit: number = 30;
  Visible: boolean = false;


  constructor(private dialog: MatDialog, private service: FarginServiceService, private router: Router, private toastr: ToastrService, private ActivateRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.Logid = param.Alldata;
    });
    this.Getall();
  }

  Getall() {
    this.service.monthlyMerchantsmslogs(this.Logid, this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.location.back()

  }

  description(id: any) {
    this.dialog.open(SMSContentComponent, {
      data: { value: id },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true
    })
  }

  getData(event: any) {
    this.service.monthlyMerchantsmslogs(this.Logid, event.pageSize, event.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.filterPredicate = (data: any, filter: string) => { const transformedFilter = filter.trim().toLowerCase(); const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => { return currentTerm + (typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]); }, '').toLowerCase(); return dataStr.indexOf(transformedFilter) !== -1; };
        this.currentfilvalShow = false;
      } else if (res.flag == 2) {
        this.viewall = [];
        this.totalPages = res.pagination.totalElements;
        this.totalpage = res.pagination.pageSize;
        this.currentpage = res.pagination.currentPage;
        this.dataSource = new MatTableDataSource(this.viewall);
        this.currentfilvalShow = false;
      }
    })

  }

}
