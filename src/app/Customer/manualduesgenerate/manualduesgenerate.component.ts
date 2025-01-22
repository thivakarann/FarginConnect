import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { customerMonthManual } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-manualduesgenerate',
  templateUrl: './manualduesgenerate.component.html',
  styleUrl: './manualduesgenerate.component.css',
})
export class ManualduesgenerateComponent implements OnInit {
  Button: boolean = false;
  customerIdsList: any;
  customerIndexList: any;
  showPaymentSection: boolean=false;
  billingMode: any = localStorage.getItem('billingMode')
  merchantid: any = localStorage.getItem('merchantId')

  constructor(
    private dialog: MatDialog,
    private service: FarginServiceService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.customerIdsList = this.data.customerIdsList;
    this.customerIndexList=this.data.customerIndexList

    console.log(this.customerIdsList);
    console.log(this.customerIndexList);
  }
  select(button: any) {
    this.Button;
  }
  openPaymentSection() { this.showPaymentSection = true;  }

  submit()
  {
    if(this.billingMode=='Month')
    {
        let submitModel: customerMonthManual = {
          merchantId:this.merchantid,
          customersId:this.customerIdsList
          }
          this.service.customeridmonthmanualdues(submitModel).subscribe((res: any) => {            
            if (res.flag == 1) {
              this.toastr.success(res.responseMessage);
              this.dialog.closeAll()
              setTimeout(() => {
                window.location.reload()
              }, 500);
            }
            else {
              this.toastr.error(res.responseMessage)
            }
          })
    }
    else if(this.billingMode=='Full || Prorated')
    {
      let submitModel: customerMonthManual = {
        merchantId:this.merchantid,
        customersId:this.customerIdsList
        }
        this.service.customeridfullmanualdues(submitModel).subscribe((res: any) => {            
          if (res.flag == 1) {
            this.toastr.success(res.responseMessage);
            this.dialog.closeAll()
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
          else {
            this.toastr.error(res.responseMessage)
          }
        })
    }
  }

}
