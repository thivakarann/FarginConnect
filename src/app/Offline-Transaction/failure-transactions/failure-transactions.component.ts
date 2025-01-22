import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';

@Component({
  selector: 'app-failure-transactions',
  templateUrl: './failure-transactions.component.html',
  styleUrl: './failure-transactions.component.css'
})
export class FailureTransactionsComponent {
  viewall: any;


  Viewall: any;
  content: any;
  filteredData: any;
  getallData: any;
  term: any;
  responseDataListnew: any = [];
  response: any = [];
  date1: any;
  date2: any;
  
  getdashboard: any[] = [];
  roleId: any = localStorage.getItem('roleId')
  actions: any;
  errorMessage: any;
  id:any;
  accountId:any;
  paymentId:any;
  successres:any;
  accountid: any;
  merchantId: any = localStorage.getItem('merchantId')


  constructor(private service: FarginServiceService, private toastr: ToastrService, private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data:any ) { }
  ngOnInit(): void {

    this.accountid=this.data.value;
    this.paymentId=this.data.value1;
    console.log(this.accountid)
    
  this.service.FailureOffTransaction(this.merchantId,this.paymentId).subscribe((res:any)=>{
  if(res.flag==1){
    this.content = JSON.parse(res.response);

   }
})
  }

}
