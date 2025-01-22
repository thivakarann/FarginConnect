import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-smsviewhistory',
  templateUrl: './smsviewhistory.component.html',
  styleUrl: './smsviewhistory.component.css'
})
export class SmsviewhistoryComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sno',
    'smsType',
    'date',
 
  ];
  viewall: any;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  merchantId=localStorage.getItem('merchantId') || '';
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
  showData: boolean=false;
  smsResponse: any;
 
  merchantsmsId: any;
searchText: any;
 
 
  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog,private router:Router,  @Inject(MAT_DIALOG_DATA) public data:any,
) { }
 
 
 
  ngOnInit(): void {
    this.merchantsmsId=this.data.value1
    
 
    this.service.viewmerchantsmstypes(this.merchantId,this.merchantsmsId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.smsResponse=res.response;
        this.dataSource = new MatTableDataSource(this.smsResponse);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(res.flag==2){
        this.message=res.responseMessage;
      }
 
    })
  }
  reload(){
    window.location.reload()
  }
  transform(value: any[], searchText: string): any[] {
    if (!value || !searchText) {
      return value;
    }
    return value.filter(item =>
      item.subpermissionValue.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  onSearchTextChange(): void {
    // Reset to the first page whenever the search text changes
    this.currentPage = 1;
  }
}
