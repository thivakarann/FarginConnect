import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-success-offtransactions',
  templateUrl: './success-offtransactions.component.html',
  styleUrl: './success-offtransactions.component.css'
})
export class SuccessOfftransactionsComponent {
 
  viewall: any;
  
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
  valueTransactionExport: any;
  valueTransactionView: any;
  getdashboard: any[] = [];
  roleId: any = sessionStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  id:any;
  accountId:any;
  paymentId:any;
  successres:any;
  merchantid: any;

  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data:any ) { }
  ngOnInit(): void {

    this.merchantid=this.data.value;
    this.paymentId=this.data.value1;
    
  this.service.SuccessOffTransaction(this.merchantid,this.paymentId).subscribe((res:any)=>{
  if(res.flag==1){
    this.content = JSON.parse(res.response);
    // this.content = this.Viewall?.attempt;
    // console.log(this.content)
    // this.filteredData = this.content;
    
    // this.getallData = this.Viewall.data.totalElements;
    
    // this.toastr.success(res.responseMessage);
    // this.dataSource = new MatTableDataSource(this.content);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator; 
   }
})
  }



  




}
