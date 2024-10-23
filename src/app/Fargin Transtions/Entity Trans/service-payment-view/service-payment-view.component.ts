import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';

@Component({
  selector: 'app-service-payment-view',
  templateUrl: './service-payment-view.component.html',
  styleUrl: './service-payment-view.component.css'
})
export class ServicePaymentViewComponent {
  view: any;
  id: any;
  constructor(private service:FarginServiceService,@Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog){
   
  }
  ngOnInit(): void {
    this.id = this.data.value
    console.log(this.id);
   this.service.OneTimeTransactionsView(this.id).subscribe((res:any)=>{
  if(res.flag==1){
    this.view=res.response;
  }
  })
  }
}
