import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../service/fargin-service.service';
import { Transactiondues } from '../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-return-dues',
  templateUrl: './return-dues.component.html',
  styleUrl: './return-dues.component.css'
})
export class ReturnDuesComponent {
  addreturn: any = FormGroup;
  customerPayId: any;
 
  getadminname = localStorage.getItem('fullname');
  status:any;
 
 
  constructor(private dialog: MatDialog, private service: FarginServiceService, private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any ) {
    this.customerPayId=data.value.customerPayId;
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
    let submitModel: Transactiondues = {
     
      paymentStatus:this.paymentstatus?.value,
      dueStatus: this.status,
      commentsBy:this.getadminname,
      comments: this.commentsBy.value
    };
 
 
    this.service.transactiondue(this.customerPayId,submitModel).subscribe((res: any) => {
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
