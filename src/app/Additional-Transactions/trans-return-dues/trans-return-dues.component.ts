import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { transactionreturndues } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-trans-return-dues',
  templateUrl: './trans-return-dues.component.html',
  styleUrl: './trans-return-dues.component.css'
})
export class TransReturnDuesComponent implements OnInit {
  addreturn: any = FormGroup;
  customerPayId: any;
 
  getadminname = localStorage.getItem('fullname');
  status:any;
 
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any ) {
    this.customerPayId=data.value;
  }
 
 
  ngOnInit(): void {
 
 
    this.addreturn = new FormGroup({
      paymentstatus: new FormControl('', [Validators.required]),
      commentsBy: new FormControl('', [Validators.required]),
    });
 
  }
  get commentsBy() {
    return this.addreturn.get('commentsBy');
  }
  get paymentstatus() {
    return this.addreturn.get('paymentstatus');
  }
 
  submit() {
    if(this.paymentstatus?.value=='Due Pending')
    {
      this.status=0
    }
    else if(this.paymentstatus?.value=='Due Cancelled')
    {
      this.status=2
    }
    let submitModel: transactionreturndues = {
      paymentStatus: this.paymentstatus.value,
      dueStatus: this.status,
      commentsBy: this.getadminname,
      comments: this.commentsBy.value
    };
 
 
    this.service.Additionalreturndue(this.customerPayId,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage)
        this.dialog.closeAll()
      }
      else {
        this.toastr.error(res.responseMessage);
        this.dialog.closeAll()

      }
    });
 
  }
 

}
