import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarginServiceService } from '../../../service/fargin-service.service';
import { SmsApproval } from '../../../fargin-model/fargin-model.module';

@Component({
  selector: 'app-smsapproval',
  templateUrl: './smsapproval.component.html',
  styleUrl: './smsapproval.component.css'
})
export class SmsapprovalComponent {
  id: any;
  myForm!: FormGroup;
  fullname: any = localStorage.getItem('fullname')
  constructor(private router: Router, private Approval: FarginServiceService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.id = this.data.value
    
 
    this.myForm = new FormGroup({
      approvalStatus: new FormControl('', [Validators.required,]),

 
    });
  }
 
  get approvalStatus() {
    return this.myForm.get('approvalStatus')
 
  }

  submit() {
    let submitModel: SmsApproval = {
      smsApprovalStatus: this.approvalStatus?.value,
      smsApprovedBy: this.fullname
    }
    this.Approval.updatemerchantsms(this.id,submitModel).subscribe((res: any) => {
      if (res.flag == 1) {
        this.toastr.success(res.responseMessage);
        this.dialog.closeAll();
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);
           }
      else {
        this.toastr.error(res.responseMessage)
      }
    })
  }
 
}
