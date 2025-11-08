import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { EncyDecySericeService } from '../../../Encrypt-Decrypt Service/ency-decy-serice.service';

@Component({
  selector: 'app-success-offtransactions',
  templateUrl: './success-offtransactions.component.html',
  styleUrl: './success-offtransactions.component.css',
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
  roleId: any = this.cryptoService.decrypt(sessionStorage.getItem('Nine') || '');
  actions: any;
  errorMessage: any;
  id: any;
  accountId: any;
  paymentId: any;
  successres: any;
  merchantid: any;

  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cryptoService: EncyDecySericeService,

  ) { }

  ngOnInit(): void {

    this.merchantid = this.data.value;
    this.paymentId = this.data.value1;

    this.service.SuccessOffTransaction(this.merchantid, this.paymentId).subscribe((res: any) => {
      if (res.flag == 1) {
        this.content = JSON.parse(res.response);
      }
    });
  }
}
