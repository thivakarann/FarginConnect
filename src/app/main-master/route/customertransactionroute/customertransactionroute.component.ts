import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { Location } from '@angular/common';
import { ReturnDuesComponent } from '../../../Transaction/return-dues/return-dues.component';
import { TransactionManualpayComponent } from '../../../Transaction/transaction-manualpay/transaction-manualpay.component';
import { TransactionViewbyidComponent } from '../../../Transaction/transaction-viewbyid/transaction-viewbyid.component';
import { ManuvalpayWithoutOtpComponent } from '../../../Transaction/manuvalpay-without-otp/manuvalpay-without-otp.component';

@Component({
  selector: 'app-customertransactionroute',
  templateUrl: './customertransactionroute.component.html',
  styleUrl: './customertransactionroute.component.css',
})
export class CustomertransactionrouteComponent {
  id: any;
  transaction: any;
  showData: boolean = false;
  searchText: any;
  page4: number = 1;
  manuvalpaymentstatus: any = localStorage.getItem('customerManualStatus');

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
    this.service.CustomerTransaction(this.id).subscribe((res: any) => {
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
    this.dialog.afterAllClosed.subscribe(()=>{
      this.service.CustomerTransaction(this.id).subscribe((res: any) => {
        if (res.flag == 1) {
          this.transaction = res.response;
          this.showData = true;
        } else {
          this.showData = false;
        }
      });
    })

  }
  viewpay(id: any) {
    if (this.manuvalpaymentstatus == 1) {
      this.dialog.open(TransactionManualpayComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.CustomerTransaction(this.id).subscribe((res: any) => {
          if (res.flag == 1) {
            this.transaction = res.response;
            this.showData = true;
          } else {
            this.showData = false;
          }
        });
      })

    }

    else if (this.manuvalpaymentstatus == 0) {
      this.dialog.open(ManuvalpayWithoutOtpComponent, {
        data: { value: id },
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '800ms',
      })
      this.dialog.afterAllClosed.subscribe(()=>{
        this.service.CustomerTransaction(this.id).subscribe((res: any) => {
          if (res.flag == 1) {
            this.transaction = res.response;
            this.showData = true;
          } else {
            this.showData = false;
          }
        });
      })
    }

  }
  close() {
    this.location.back()     
  }
}
