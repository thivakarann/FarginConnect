import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-failure-offtransactions',
  templateUrl: './failure-offtransactions.component.html',
  styleUrl: './failure-offtransactions.component.css',
})
export class FailureOfftransactionsComponent {
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
  roleId: any = sessionStorage.getItem('roleId');
  actions: any;
  errorMessage: any;
  id: any;
  accountId: any;
  paymentId: any;
  successres: any;
  merchantid: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.merchantid = this.data.value;
    this.paymentId = this.data.value1;

    this.service.FailureOffTransaction(this.merchantid, this.paymentId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.content = JSON.parse(res.response);

      }
    });
  }
}
