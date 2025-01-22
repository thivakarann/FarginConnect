import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import moment from 'moment';
import { FarginServiceService } from '../../service/fargin-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-historyforreminder',
  templateUrl: './historyforreminder.component.html',
  styleUrl: './historyforreminder.component.css'
})
export class HistoryforreminderComponent {
  merchantid: any = localStorage.getItem('merchantId');
  history: any;
  date2: any;
  date1: any;
  dataSource: any;
  displayedColumns: string[] = [
    'sno',
    'number',
     'method',
    'createdBy',
    'createdDateTime',
  ];

  showcategoryData: boolean = false;
  errorMsg: any;
  responseDataListnew: any = [];
  response: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customerid: any;
  setupboxhistory: any;
  id: any;
searchPerformed: boolean=false;
  constructor(
    private location: Location,
    private service: FarginServiceService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.service.customerhistoryremainders(this.id).subscribe((res: any) => {
      if (res.flag == 1) {
        this.setupboxhistory = res.response;
        this.dataSource = new MatTableDataSource(this.setupboxhistory.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.dataSource = new MatTableDataSource([]);
        this.dataSource = new MatTableDataSource(this.setupboxhistory.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
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
  close() {
    this.location.back()
  }

  reload(){
    window.location.reload()
  }

}
