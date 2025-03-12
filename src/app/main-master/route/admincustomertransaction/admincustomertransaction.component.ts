import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';

import { TransactionViewbyidComponent } from '../../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { ReturnDuesComponent } from '../../../Transaction/return-dues/return-dues.component';
import { TransactionManualpayComponent } from '../../../Transaction/transaction-manualpay/transaction-manualpay.component';

@Component({
  selector: 'app-admincustomertransaction',
  templateUrl: './admincustomertransaction.component.html',
  styleUrl: './admincustomertransaction.component.css'
})
export class AdmincustomertransactionComponent {
  id: any;
  transaction: any;
  showData: boolean = false;
  searchText: any;
  page4: number = 1;
  pageSize: any;
  pageIndex: any;
  constructor(
    public service: FarginServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ActivateRoute: ActivatedRoute,
    private location: Location
 
  ) {}

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((param: any) => {
      this.id = param.Alldata;
    });
    this.service.CustomerTransaction(this.id,this.pageSize, this.pageIndex).subscribe((res: any) => {
      if (res.flag == 1) {
        this.transaction = res.response;
        this.showData = true;
      } else {
        this.showData = false;
      }
    });
  }
  
  
  Receipt(id: any) {
    this.service.CustomerReceipt(id).subscribe({
      next: (res: any) => {
        var downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      },
    });
  }

  view(id: any) {
    this.dialog.open(TransactionViewbyidComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }
  
  dues(id: any) {
    this.dialog.open(ReturnDuesComponent, {
      width: '80vw',
      maxWidth: '400px',
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }
  viewpay(id: any) {
    this.dialog.open(TransactionManualpayComponent, {
      data: { value: id },
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    })
  }
  close() {
    this.location.back()     
  }

}
