import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ExportReportsAddComponent } from '../export-reports-add/export-reports-add.component';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../Loader Service/loader.service';

@Component({
  selector: 'app-export-reports-view',
  templateUrl: './export-reports-view.component.html',
  styleUrl: './export-reports-view.component.css'
})
export class ExportReportsViewComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'exportId',
    'exportDataName',
    'exportStartDate',
    'exportEndDate',
    'paymentStatus',
    'resultStatus',
    'Download',
    'createdBy',
    'createdAt'
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
  valuesmsadd: any;
  valuesmsstatus: any;
  valuesmsedit: any;
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  merchantId: any = localStorage.getItem('merchantId')
  actions: any;
  errorMessage: any;
  download: any;
  searchPerformed: boolean = false;
  private subscription!: Subscription;
  private intervalId: any;

  constructor(
    public service: FarginServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    // this.service.ExportReportGet(this.merchantId).subscribe((res: any) => {
    //   if(res.flag==1)
    //   {
    //     this.viewall = res.response;
    //     this.viewall.reverse();
    //     this.dataSource = new MatTableDataSource(this.viewall);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   }
    //   else if(res.flag==2){
    //     this.dataSource = new MatTableDataSource([]);
    //     this.dataSource = new MatTableDataSource(this.viewall.reverse());
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });

    this.loaderService.setExcludeLoader(true);
    this.loadData();
    this.intervalId = setInterval(() => {
      this.loadData();
    }, 30000); // 30000 milliseconds = 30 seconds

  }

  ngOnDestroy(): void {
    this.loaderService.setExcludeLoader(false);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  loadData(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.service.ExportReportGet(this.merchantId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.viewall = res.response;
        this.viewall.reverse();
        this.dataSource = new MatTableDataSource(this.viewall);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else if (res.flag == 2) {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.viewall.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  AddReport() {
    this.dialog.open(ExportReportsAddComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "800ms",
      disableClose: true
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.service.ExportReportGet(this.merchantId).subscribe((res: any) => {
        if (res.flag == 1) {
          this.viewall = res.response;
          this.viewall.reverse();
          this.dataSource = new MatTableDataSource(this.viewall);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else if (res.flag == 2) {
          this.dataSource = new MatTableDataSource([]);
          this.dataSource = new MatTableDataSource(this.viewall.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    })
  }


  reload() {
    this.service.ExportReportGet(this.merchantId).subscribe((res: any) => {
      this.viewall = res.response;
      // this.viewall.reverse();
      this.dataSource = new MatTableDataSource(this.viewall);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ExportDownload(id: any) {
    this.service.ExportReportDownload(id).subscribe((res: any) => {
      var downloadURL = URL.createObjectURL(res);
      window.open(downloadURL);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.searchPerformed = filterValue.length > 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

