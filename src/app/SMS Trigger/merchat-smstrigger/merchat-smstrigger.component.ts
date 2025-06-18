import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { smstrigger } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-merchat-smstrigger',
  templateUrl: './merchat-smstrigger.component.html',
  styleUrl: './merchat-smstrigger.component.css'
})
export class MerchatSMSTriggerComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'smstitle',
    'smsCharge',
    'totalCount',
    'successCount',
    'failureCount',
    'createdDateTime',
    'SMSTrigger',
    'view',
  ];
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  merchantid: any;
  viewall: any;
  totalPages: any;
  totalpage: any;
  currentpage: any;
  pageSize = 5;
  pageIndex: number = 0;
  currentfilvalShow: boolean = false;
  searchPerformed: boolean = false;
  roleId: any = sessionStorage.getItem('roleId');



  constructor(private service: FarginServiceService, private router: Router, private toastr: ToastrService, private ActivateRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.merchantid = param.Alldata;
    });
    this.Getall();
  }

  Getall() {
    this.service.monthlyMerchantsms(this.merchantid, this.pageSize, this.pageIndex).subscribe((res: any) => {
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

  manuvaltrigger(id: any) {
    let submitModel: smstrigger = {
      monthlySmsLogId: id
    }
    this.service.monthlysmstriggermerchant(submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
      }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }

  manuvaltriggerlogs(id: any) {
    this.router.navigate([`dashboard/smstrigger-logs/${id}`], {
      queryParams: { Alldata: id }
    })
  }

  getData(event: any) {
    this.service.monthlyMerchantsms(this.merchantid, event.pageSize, event.pageIndex).subscribe((res: any) => {
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
